"use client";
import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { useAudio, useWindowSize, useMount } from "react-use";

import {
  challengeOptions,
  challengeProgress,
  challenges,
  userSubscription,
} from "@/db/schema";
import Challenge from "@/components/quiz/Challenge";
import { reduceHeart } from "@/actions/userProgress";
import ResultCard from "@/components/quiz/ResultCard";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizFooter from "@/components/quiz/QuizFooter";
import { useHeartsModal } from "@/store/useHeartsModal";
import { usePracticeModal } from "@/store/usePracticeModal";
import QuestionBubble from "@/components/quiz/QuestionBubble";
import { upsertChallengeProgress } from "@/actions/challengeProgress";

interface QuizProps {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
  } & { challengeOptions: (typeof challengeOptions.$inferSelect)[] } & {
    challengeProgress: (typeof challengeProgress.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
}

const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: QuizProps) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();
  const [finishAudio] = useAudio({ src: "/sound/finish.mp3", autoPlay: true });
  const [correctAudio, _c, correctControls] = useAudio({
    src: "/sound/correct.wav",
  });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/sound/incorrect.wav",
  });

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [isPending, startTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<number>();
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage
  );
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = challenges.findIndex((challenge) => !challenge.completed);
    return index === -1 ? 0 : index;
  });

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onSelect = (optionId: number) => {
    if (status !== "none") return;
    setSelectedOption(optionId);
  };

  const onNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => {
            toast.error("Something went wrong. Please try again");
          });
      });
    } else {
      startTransition(() => {
        reduceHeart(challenge.id)
          .then((res) => {
            if (res?.error === "heart") {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => {
            toast.error("Something went wrong. Please try again");
          });
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/image/finish.svg"
            alt="Finish"
            className="hidden md:block"
            height={100}
            width={100}
          />
          <Image
            src="/image/finish.svg"
            alt="Finish"
            className="block md:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great Job! <br /> You&apos;ve Completed The Lesson
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variants="points" value={challenges.length * 10} />
            <ResultCard variants="hearts" value={hearts} />
          </div>
        </div>
        <QuizFooter
          lessonId={lessonId}
          status="completed"
          onCheck={() => {
            router.push("/learn");
          }}
        />
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select The Correct Meaning"
      : challenge.question;

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <QuizHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={false && !!userSubscription}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                type={challenge.type}
                disabled={isPending}
              />
            </div>
          </div>
        </div>
      </div>
      <QuizFooter
        disabled={isPending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
