"use client";
import Image from "next/image";
import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "./ui/button";
import { refillHearts } from "@/actions/userProgress";
import { createStripeURL } from "@/actions/userSubscription";
import { POINTS_TO_REFILL } from "@/Constant";

interface ItemsProps {
  hearts: number;
  points: number;
  hasActiveSuscription: boolean;
}

const Items = ({ hearts, points, hasActiveSuscription }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch((error) => toast.error(error));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeURL()
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch((error) => toast.error(error));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image alt="Heart" src="/image/heart.svg" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill Hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "Full"
          ) : (
            <div className="flex items-center">
              <Image
                src="/image/points.svg"
                alt="Points"
                height={20}
                width={20}
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src="/image/unlimited.svg"
          alt="Unlimited"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited Hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSuscription ? "Settings" : "Upgrade"}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
