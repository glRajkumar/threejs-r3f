"use client";

import { Plus, Minus, Settings, Info } from "lucide-react";

import { useSettingsStore } from "@/store/settings";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function SettingsFloater() {
  const setContextCount = useSettingsStore(s => s.setCanvasContextCount)
  const updateSetting = useSettingsStore(s => s.update)
  const contextCount = useSettingsStore(s => s.canvasContextCount)

  const handleIncrement = () => setContextCount(contextCount + 1)
  const handleDecrement = () => setContextCount(contextCount - 1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value)) setContextCount(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="df fixed bottom-4 right-4 opacity-60 hover:opacity-100 cursor-pointer"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-68 px-0 pt-2 pb-4" align="end">
        <div className="pb-2 px-3 border-b text-base font-medium">Settings</div>

        <div className="df p-4">
          <Label htmlFor="contextCount" className="text-sm font-medium">
            Canvas Contexts
          </Label>

          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4" />
            </TooltipTrigger>

            <TooltipContent className="max-w-sm">
              GPU can't keep more than a handful of WebGL contexts alive at once. So set No. of canvas can be loaded in a page.
            </TooltipContent>
          </Tooltip>

          <InputGroup className="w-24">
            <InputGroupAddon align="inline-start">
              <InputGroupButton
                size="icon-xs"
                title="Decrease"
                onClick={handleDecrement}
                disabled={contextCount <= 1}
              >
                <Minus className="h-4 w-4" />
              </InputGroupButton>
            </InputGroupAddon>

            <InputGroupInput
              id="contextCount"
              min={1}
              max={10}
              type="number"
              value={contextCount}
              onChange={handleInputChange}
              className="no-number-arrows text-center w-16"
            />

            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                title="Increase"
                onClick={handleIncrement}
                disabled={contextCount >= 10}
              >
                <Plus className="h-4 w-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="df justify-between px-4">
          <Label>Clear All Canvases</Label>

          <Button
            size="sm"
            onClick={() => updateSetting({ canvases: [] })}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SettingsFloater
