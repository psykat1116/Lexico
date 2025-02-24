import React from "react";

const LessonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full gap-10">{children}</div>
    </div>
  );
};

export default LessonLayout;
