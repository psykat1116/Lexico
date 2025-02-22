import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { NotebookText } from "lucide-react";

interface UnitBannerProps {
  title: string;
  description: string;
}

const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="w-full rounded-xl bg-green-500 p-5 items-center flex justify-between text-white">
      <div className="space-y-2.5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          variant="secondary"
          size="lg"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
