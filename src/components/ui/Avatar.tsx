"use client";

import Image from "next/image";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import type { AvatarTint } from "@/types";
import { cn } from "@/lib/cn";

interface AvatarProps {
  src: string;
  name: string;
  tint: AvatarTint;
  size?: 64 | 72;
}

const TINTS: Record<AvatarTint, string> = {
  sky: "bg-avatar-sky",
  lavender: "bg-avatar-lavender",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function Avatar({ src, name, tint, size = 64 }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <span
      className={cn("relative block shrink-0 overflow-visible rounded-[20px]", TINTS[tint])}
      style={{ width: size, height: size }}
    >
      <span className="block h-full w-full overflow-hidden rounded-[20px]">
        {hasError ? (
          <span className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
            {getInitials(name)}
          </span>
        ) : (
          <Image
            src={src}
            alt={name}
            width={size}
            height={size}
            unoptimized
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        )}
      </span>
      <span className="absolute -bottom-1 -right-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white ring-2 ring-bg">
        <ShieldCheck size={14} aria-hidden="true" className="text-phonepe" />
      </span>
    </span>
  );
}
