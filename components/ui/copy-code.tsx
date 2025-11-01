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
    <Button
      size="icon"
      variant='secondary'
      onClick={() => onCopyClk(content)}
      disabled={copied}
      className="hidden group-hover:flex size-7 p-0 absolute top-1 right-1 z-1 cursor-pointer [&_svg]:size-3.5 bg-muted/80 hover:bg-muted"
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  )
}

export default CopyCode
