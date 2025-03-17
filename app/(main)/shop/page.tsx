import Image from "next/image";
import { redirect } from "next/navigation";

import Items from "@/components/Items";
import Quest from "@/components/Quest";
import FeedWrapper from "@/components/FeedWrapper";
import UserProgress from "@/components/UserProgress";
import StickyWrapper from "@/components/StickyWrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";

const ShopPage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

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
        <Quest points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/image/shop.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend Your Points On Cool Stuff
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSuscription={!!userSubscription?.isActive}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
