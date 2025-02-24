"use client";
import { challengeOptions, challengeProgress, challenges } from "@/db/schema";
import React, { useState } from "react";
import QuizHeader from "./QuizHeader";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";
import QuizFooter from "./QuizFooter";
import { useTransition } from "react";
import { upsertChallengeProgress } from "@/actions/challengeProgress";
import { toast } from "sonner";
import { reduceHeart } from "@/actions/userProgress";

interface QuizProps {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
  } & { challengeOptions: (typeof challengeOptions.$inferSelect)[] } & {
    challengeProgress: (typeof challengeProgress.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: null;
}

const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: QuizProps) => {
  const [isPending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = challenges.findIndex((challenge) => !challenge.completed);
    return index === -1 ? 0 : index;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

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
              console.log("Missing Hearts");
            }

            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch((error) => {
            toast.error("Something went wrong. Please try again");
          });
      });
    } else {
      startTransition(() => {
        reduceHeart(challenge.id)
          .then((res) => {
            if (res?.error === "heart") {
              console.log("Missing Hearts");
              return;
            }

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

  const title =
    challenge.type === "ASSIST"
      ? "Select The Correct Meaning"
      : challenge.question;

  return (
    <>
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
