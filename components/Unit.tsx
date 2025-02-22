import { challengeProgress, challenges, lessons, units } from "@/db/schema";
import React from "react";
import UnitBanner from "./UnitBanner";
import LessonButton from "./LessonButton";

interface UnitProps {
  id: number;
  order: number;
  description: string;
  title: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        challenges: (typeof challenges.$inferSelect & {
          challengeProgress: (typeof challengeProgress.$inferSelect & {
            completed: boolean;
          })[];
        })[];
      })
    | undefined;
  activeLessonPercentage: number;
}

const Unit = ({
  id,
  order,
  description,
  title,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, ind) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={ind}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

export default Unit;
