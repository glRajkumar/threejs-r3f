"use client";

import { useState } from "react";
import { Code, Radio } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type props = {
  code: React.ReactNode
  preview: React.ReactNode
}

function View({ code, preview }: props) {
  const [isCodeView, setIsCodeView] = useState(false)

  return (
    <div className="p-6 pt-8 md:p-8">
      {
        isCodeView
          ? code
          : preview
      }

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsCodeView(p => !p)}
            className="fixed bottom-6 right-6 cursor-pointer"
          >
            {isCodeView ? <Radio /> : <Code />}
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          View {isCodeView ? "Preview" : "Code"}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export default View
