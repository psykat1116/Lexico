import { redirect } from "next/navigation";

import Quiz from "@/components/quiz/Quiz";
import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

const LessonPage = async () => {
  const lessonData = await getLesson();
  const userProgressData = await getUserProgress();
  const userSubscription = await getUserSubscription();

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
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;
