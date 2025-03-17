import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getTopUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Promo from "@/components/Promo";
import Quest from "@/components/Quest";
import FeedWrapper from "@/components/FeedWrapper";
import UserProgress from "@/components/UserProgress";
import { Separator } from "@/components/ui/separator";
import StickyWrapper from "@/components/StickyWrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const LeaderBoardPage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();
  const topUsers = await getTopUsers();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSuscription={!!userSubscription?.isActive}
        />
        {!userSubscription?.isActive && <Promo />}
        <Quest points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/image/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {topUsers.map((user, index) => (
            <div
              key={user.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
              <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                <AvatarImage src={user.userImageSrc} className="object-cover" />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {user.userName}
              </p>
              <p className="text-muted-foreground">{user.points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderBoardPage;
