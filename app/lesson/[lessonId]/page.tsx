import Quiz from "@/components/quiz/Quiz";
import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";

const LessonIDPage = async ({
  params,
}: {
  params: Promise<{ lessonId: number }>;
}) => {
  const lessonId = (await params).lessonId;
  const lessonData = await getLesson(lessonId);
  const userProgressData = await getUserProgress();

  if (!lessonData || !userProgressData) {
    redirect("/learn");
  }

  const initialPercentage =
    (lessonData.challenges.filter((challenge) => challenge.completed).length /
      lessonData.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lessonData.id}
      initialLessonChallenges={lessonData.challenges}
      initialHearts={userProgressData.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null} // TODO: Implement user subscription
    />
  );
};

export default LessonIDPage;
