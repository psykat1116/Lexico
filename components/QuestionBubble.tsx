import Image from "next/image";
import React from "react";

const QuestionBubble = ({ question }: { question: string }) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/image/mascot.svg"
        alt="Mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src="/image/mascot.svg"
        alt="Mascot"
        height={40}
        width={40}
        className="block lg:hidden"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};

export default QuestionBubble;
