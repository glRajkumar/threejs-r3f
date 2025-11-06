import { persist } from "zustand/middleware";
import { create } from "zustand";

type state = {
  canvases: string[]
  canvasContextCount: number
}

type actions = {
  setCanvasContextCount: (value: number) => void
  addCanvas: (id: string) => void
  update: (v: Partial<state>) => void
}

export const useSettingsStore = create<state & actions>()(persist(set => ({
  canvases: [],
  canvasContextCount: 1,

  setCanvasContextCount: value => set(state => {
    const newCount = Math.max(1, Math.min(10, Math.floor(value)))
    let newCanvases = [...state.canvases]

    if (newCanvases.length > newCount) {
      newCanvases = newCanvases.slice(newCanvases.length - newCount)
    }

    return { canvasContextCount: newCount, canvases: newCanvases }
  }),

  addCanvas: (id: string) => set(state => {
    const max = state.canvasContextCount

    let next = state.canvases.filter(c => c !== id)
    next.push(id)

    if (next.length > max) {
      next = next.slice(next.length - max)
    }

    return { canvases: next }
  }),

  update: v => set({ ...v }),
}),
  {
    name: "settings",
  }
))