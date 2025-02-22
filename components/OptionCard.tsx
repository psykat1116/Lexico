import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface OptionCardProps {
  id: number;
  text: string;
  imageSrc: string | null;
  shortCut: string;
  selected?: boolean;
  onClick: () => void;
  audioSrc: string | null;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
  status: "correct" | "wrong" | "none";
}

const OptionCard = ({
  id,
  text,
  imageSrc,
  shortCut,
  selected,
  onClick,
  audioSrc,
  disabled,
  status,
  type,
}: OptionCardProps) => {
  return (
    <div
      onClick={() => {}}
      className={cn(
        "h-full border-2 rounded-xl borde-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} alt={text} fill />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-neutral-600 text-sm lg:text-base",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "wrong" && "text-rose-500"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] h-[20px] w-[20px] flex items-center border-2 justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
            selected && "border-sky-300 text-sky-500",
            selected &&
              status === "correct" &&
              "border-green-500 text-green-500",
            selected && status === "wrong" && "text-rose-500 border-rose-500"
          )}
        >
          {shortCut}
        </div>
      </div>
    </div>
  );
};

export default OptionCard;
