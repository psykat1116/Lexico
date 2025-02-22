import React from "react";
import StrickyWrapper from "@/components/StickyWrapper";
import FeedWrapper from "@/components/FeedWrapper";
import FeedHeader from "@/components/FeedHeader";
import UserProgress from "@/components/UserProgress";
import {
  getCoursesProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "@/components/Unit";

const LearnPage = async () => {
  const userProgress = await getUserProgress();
  const courseProgressData = await getCoursesProgress();
  const lessonPercentage = await getLessonPercentage();
  const units = await getUnits();

  if (!userProgress || !userProgress?.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgressData) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StrickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSuscription={false}
        />
      </StrickyWrapper>
      <FeedWrapper>
        <FeedHeader title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgressData.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
