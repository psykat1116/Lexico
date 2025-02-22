import Quiz from "@/components/Quiz";
import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";

const LessonPage = async () => {
  const lessonData = await getLesson();
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
      userSubscription={null}
    />
  );
};

export default LessonPage;
