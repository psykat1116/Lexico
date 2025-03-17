"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  iconSrc: string;
  href: string;
}

const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
  const pathName = usePathname();
  const active = pathName === href;
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className={cn("justify-start h-[52px]", !active && "hover:text-white")}
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt="label"
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
