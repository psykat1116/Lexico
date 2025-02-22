"use client";
import { challengeOptions, challengeProgress, challenges } from "@/db/schema";
import React, { useState } from "react";
import QuizHeader from "./QuizHeader";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";

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
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = challenges.findIndex((challenge) => !challenge.completed);
    return index === -1 ? 0 : index;
  });

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

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
                onSelect={() => {}}
                status="correct"
                selectedOption={undefined}
                type={challenge.type}
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
