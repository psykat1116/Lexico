import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/image/unlimited.svg" alt="Pro" height={26} width={26} />
          <h3 className="font-bold text-lg">Upgrade To Pro</h3>
        </div>
        <p className="text-muted-foreground">Get Unlimited Hearts and More!</p>
      </div>
      <Button asChild variant="super" className="w-full" size="lg">
        <Link href="shop">Upgrade Today</Link>
      </Button>
    </div>
  );
};

export default Promo;
