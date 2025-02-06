import React from "react";
import StrickyWrapper from "@/components/StickyWrapper";
import FeedWrapper from "@/components/FeedWrapper";
import FeedHeader from "@/components/FeedHeader";
import UserProgress from "@/components/UserProgress";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StrickyWrapper>
        <UserProgress
          activeCourse={{ title: "Spanish", imageSrc: "/image/es.svg" }}
          hearts={5}
          points={100}
          hasActiveSuscription={false}
        />
      </StrickyWrapper>
      <FeedWrapper>
        <FeedHeader title="Spanish" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
