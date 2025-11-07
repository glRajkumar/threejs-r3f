"use client";

import { useState } from "react";

import type { tocProps } from "./toc";

import { removeLeadingNumber } from "./utils";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Mobile({ list }: tocProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="p-4 w-full text-left md:hidden">
        On this page
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>On this page</SheetTitle>

          <SheetDescription className="dfc pb-8">
            {
              list.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn("text-primary/70 hover:text-primary", {
                    "pl-2": item.level === 2,
                    "pl-4": item.level === 3,
                  })}
                  onClick={() => setOpen(false)}
                >
                  {removeLeadingNumber(item.title)}
                </a>
              ))
            }
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default Mobile
