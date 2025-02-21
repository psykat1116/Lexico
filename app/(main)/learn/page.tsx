import React from "react";
import StrickyWrapper from "@/components/StickyWrapper";
import FeedWrapper from "@/components/FeedWrapper";
import FeedHeader from "@/components/FeedHeader";
import UserProgress from "@/components/UserProgress";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgress = await getUserProgress();
  const units = await getUnits();

  if (!userProgress || !userProgress?.activeCourse) {
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
          <div key={unit.id}>{JSON.stringify(unit)}</div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
