"use client";

import { useState } from "react";

import { type tocProps } from "./toc";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import List from "./list";

function Mobile({ list, slug }: tocProps) {
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
            <List
              list={list}
              slug={slug}
              onClick={() => setOpen(false)}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default Mobile
