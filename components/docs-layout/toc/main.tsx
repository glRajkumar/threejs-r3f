'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import type { TocItem } from '@/utils/extract-toc';

import { getItemOffset, getLineOffset, removeLeadingNumber } from './utils';
import { useTocThumb } from '@/hooks/use-toc';
import { cn } from '@/lib/utils';

type props1 = {
  item: TocItem
  upper?: number
  lower?: number
  isActive: boolean
}

type props = {
  items: TocItem[]
}

type svgT = {
  path: string
  width: number
  height: number
}

function TOCItem({ item, upper = item.level, lower = item.level, isActive }: props1) {
  const offset = getLineOffset(item.level)
  const upperOffset = getLineOffset(upper)
  const lowerOffset = getLineOffset(lower)

  return (
    <a
      href={"#" + item.id}
      style={{ paddingInlineStart: `${getItemOffset(item.level)}px` }}
      className={cn("relative py-2 transition-colors wrap-anywhere first:pt-0 last:pb-0", { "text-foreground": isActive })}
    >
      {
        offset !== upperOffset &&
        <svg
          viewBox="0 0 16 16"
          className="absolute -top-2 start-0 size-4 rtl:-scale-x-100"
        >
          <line
            x1={upperOffset}
            y1="0"
            x2={offset}
            y2="16"
            className="stroke-muted"
            strokeWidth="1"
          />
        </svg>
      }
      <div
        className={cn(
          'absolute inset-y-0 w-px bg-border',
          offset !== upperOffset && 'top-2',
          offset !== lowerOffset && 'bottom-2',
        )}
        style={{ insetInlineStart: offset }}
      />
      {removeLeadingNumber(item.title)}
    </a>
  )
}

function Main({ items }: props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { pos, active } = useTocThumb(containerRef as any, items)
  const [svg, setSvg] = useState<svgT>()

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    function onResize(): void {
      if (container.clientHeight === 0) return
      let w = 0, h = 0
      const d: string[] = []
      for (let i = 0; i < items.length; i++) {
        const element: HTMLElement | null = container.querySelector(`a[href="#${items[i].id}"]`)
        if (!element) continue

        const styles = getComputedStyle(element)
        const offset = getLineOffset(items[i].level) + 1,
          top = element.offsetTop + parseFloat(styles.paddingTop),
          bottom =
            element.offsetTop +
            element.clientHeight -
            parseFloat(styles.paddingBottom)

        w = Math.max(offset, w)
        h = Math.max(h, bottom)

        d.push(`${i === 0 ? 'M' : 'L'}${offset} ${top}`)
        d.push(`L${offset} ${bottom}`)
      }

      setSvg({
        path: d.join(' '),
        width: w + 1,
        height: h,
      })
    }

    const observer = new ResizeObserver(onResize)
    onResize()

    observer.observe(container)
    return () => {
      observer.disconnect()
    }
  }, [items])

  return (
    <div className='flex flex-col'>
      <div
        className="relative min-h-0"
        ref={containerRef}
      >
        {svg &&
          <div
            className="absolute start-0 top-0 rtl:-scale-x-100"
            style={{
              width: svg.width,
              height: svg.height,
              maskImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`)}")`,
            }}
          >
            <div
              className="bg-foreground transition-all"
              style={{
                marginTop: pos[0],
                height: pos[1],
              }}
            />
          </div>
        }

        <div className="flex flex-col text-sm text-muted-foreground">
          {items.map((item, i) => (
            <TOCItem
              key={item.id}
              item={item}
              upper={items[i - 1]?.level}
              lower={items[i + 1]?.level}
              isActive={active.includes(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main
