import { type RefObject, useEffect, useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { TocItem } from '@/utils/extract-toc';

type TOCThumb = [top: number, height: number]

function useAnchorObserver(watch: string[]): string[] {
  const [activeAnchor, setActiveAnchor] = useState<string[]>(() => [])
  const observerRef = useRef<IntersectionObserver>(null)
  const stateRef = useRef<{ visible: Set<string> }>(null)

  const onChange = useEffectEvent((entries: IntersectionObserverEntry[]) => {
    stateRef.current ??= { visible: new Set() }
    const state = stateRef.current

    for (const entry of entries) {
      if (entry.isIntersecting) {
        state.visible.add(entry.target.id)
      } else {
        state.visible.delete(entry.target.id)
      }
    }

    const items = watch.filter((item) => state.visible.has(item))
    setActiveAnchor(items)
  })

  useEffect(() => {
    if (observerRef.current) return
    observerRef.current = new IntersectionObserver(onChange, {
      rootMargin: '0px',
      threshold: 0.98,
    })

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [])

  useEffect(() => {
    const observer = observerRef.current
    if (!observer) return
    const elements = watch.flatMap(id => document.getElementById(id) ?? [])

    for (const element of elements) observer.observe(element)
    return () => {
      for (const element of elements) observer.unobserve(element)
    }
  }, [watch])

  return activeAnchor
}

export function useTocThumb(containerRef: RefObject<HTMLElement>, toc: TocItem[]) {
  const headings = useMemo(() => toc.map((item) => item.id), [toc])
  const active = useAnchorObserver(headings)

  const [pos, setPos] = useState<TOCThumb>([0, 0])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (active.length === 0 || !container || container.clientHeight === 0) {
      setPos([0, 0])
      return
    }

    let upper = Number.MAX_VALUE, lower = 0

    for (const item of active) {
      const element = container.querySelector<HTMLElement>(`a[href="#${item}"]`)
      if (!element) continue

      const styles = getComputedStyle(element)
      upper = Math.min(
        upper,
        element.offsetTop + parseFloat(styles.paddingTop),
      )
      lower = Math.max(
        lower,
        element.offsetTop +
        element.clientHeight -
        parseFloat(styles.paddingBottom),
      )
    }

    setPos([upper, lower - upper])
  }, [active, containerRef])

  return { pos, active }
}