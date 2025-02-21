import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

interface UserProgressProps {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSuscription: boolean;
}

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSuscription,
}: UserProgressProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/image/points.svg"
            alt="Points"
            className="mr-1"
            width={28}
            height={28}
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/image/heart.svg"
            alt="Hearts"
            className="mr-1"
            width={22}
            height={22}
          />
          {hasActiveSuscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
