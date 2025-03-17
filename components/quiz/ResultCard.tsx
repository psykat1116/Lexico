import Image from "next/image";

import { cn } from "@/lib/utils";

interface ResultCardProps {
  value: number;
  variants: "points" | "hearts";
}

const ResultCard = ({ value, variants }: ResultCardProps) => {
  const imageSrc =
    variants === "hearts" ? "/image/heart.svg" : "/image/points.svg";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variants === "points" && "bg-orange-400 border-orange-400",
        variants === "hearts" && "bg-rose-500 border-rose-500"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variants === "hearts" && "bg-rose-500",
          variants === "points" && "bg-orange-400"
        )}
      >
        {variants === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
          variants === "points" && "text-orange-500",
          variants === "hearts" && "text-rose-400"
        )}
      >
        <Image
          src={imageSrc}
          alt="Icon"
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
};

export default ResultCard;
