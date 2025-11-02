"use client";

import { Check, Copy } from "lucide-react";

import { useClipboardCopy } from "@/hooks/use-clipboard-copy";
import { Button } from "./button";

type props = {
  content: string
}

function CopyCode({ content }: props) {
  const { copied, onCopyClk } = useClipboardCopy()

  return (
    <div className="sticky top-1 right-1 z-1">
      <Button
        size="icon"
        onClick={() => onCopyClk(content)}
        disabled={copied}
        className="hidden group-hover:flex size-7 absolute top-1 right-1 p-0 cursor-pointer [&_svg]:size-3.5 bg-primary/80"
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  )
}

export default CopyCode
