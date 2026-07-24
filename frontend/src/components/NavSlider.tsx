import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRef, useEffect, useCallback } from 'react'
import {
  LuHouse,
  LuFolderCode,
  LuBriefcase,
  LuGraduationCap,
  LuPhone,
} from 'react-icons/lu'

const navLinks = [
  { path: '/', icon: LuHouse, label: 'Home' },
  { path: '/work', icon: LuBriefcase, label: 'Work' },
  { path: '/projects', icon: LuFolderCode, label: 'Projects' },
  { path: '/education', icon: LuGraduationCap, label: 'Education' },
  { path: '/contact', icon: LuPhone, label: 'Contact' },
]

// ─── PILL TUNING ──────────────────────────────────────────────────────────────
const PILL_PADDING_X = 6
const PILL_PADDING_Y = 4
const PILL_GROW_X = 10
const PILL_GROW_Y = 6
const SPRING = { stiffness: 380, damping: 32, mass: 0.9 }
// ─────────────────────────────────────────────────────────────────────────────

type NavSliderProps = {
  hintVisible: boolean
  onHideHint: () => void
}

export default function NavSlider({
  hintVisible,
  onHideHint,
}: NavSliderProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const isDragging = useRef(false)
  const dragStartX = useRef(0)

  const activeIndex = navLinks.findIndex(
    (item) => item.path === location.pathname
  )
  const selectedIndex = activeIndex === -1 ? 0 : activeIndex

  const pillX = useMotionValue(0)
  const pillY = useMotionValue(0)
  const pillW = useMotionValue(0)
  const pillH = useMotionValue(0)

  const springX = useSpring(pillX, SPRING)
  const springY = useSpring(pillY, SPRING)
  const springW = useSpring(pillW, SPRING)
  const springH = useSpring(pillH, SPRING)

  const getPillRect = useCallback((index: number) => {
    const container = containerRef.current
    const btn = buttonRefs.current[index]
    if (!container || !btn) return null

    const cRect = container.getBoundingClientRect()
    const bRect = btn.getBoundingClientRect()

    return {
      x: bRect.left - cRect.left - PILL_PADDING_X,
      y: bRect.top - cRect.top - PILL_PADDING_Y,
      w: bRect.width + PILL_PADDING_X * 2,
      h: bRect.height + PILL_PADDING_Y * 2,
    }
  }, [])

  const applyRect = useCallback(
    (
      r: {
        x: number
        y: number
        w: number
        h: number
      },
      grow = false
    ) => {
      const gx = grow ? PILL_GROW_X : 0
      const gy = grow ? PILL_GROW_Y : 0

      pillX.set(r.x - gx / 2)
      pillY.set(r.y - gy / 2)
      pillW.set(r.w + gx)
      pillH.set(r.h + gy)
    },
    [pillX, pillY, pillW, pillH]
  )

  const jumpToIndex = useCallback(
    (index: number, grow = false) => {
      const r = getPillRect(index)
      if (r) applyRect(r, grow)
    },
    [getPillRect, applyRect]
  )

  useEffect(() => {
    requestAnimationFrame(() => jumpToIndex(selectedIndex))
  }, [selectedIndex, jumpToIndex])

  useEffect(() => {
    const onResize = () =>
      jumpToIndex(
        isDragging.current
          ? getNearestIndex(dragStartX.current)
          : selectedIndex
      )

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, jumpToIndex])

  function getNearestIndex(clientX: number) {
    const container = containerRef.current
    if (!container) return selectedIndex

    const cRect = container.getBoundingClientRect()
    const relX = clientX - cRect.left

    let nearestIndex = 0
    let nearestDist = Infinity

    buttonRefs.current.forEach((btn, i) => {
      if (!btn) return

      const bRect = btn.getBoundingClientRect()
      const center = bRect.left - cRect.left + bRect.width / 2
      const dist = Math.abs(relX - center)

      if (dist < nearestDist) {
        nearestDist = dist
        nearestIndex = i
      }
    })

    return nearestIndex
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return

    onHideHint()

    isDragging.current = false
    dragStartX.current = e.clientX
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!(e.buttons & 1)) return

    if (!isDragging.current && Math.abs(e.clientX - dragStartX.current) > 4) {
      isDragging.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }

    if (!isDragging.current) return

    dragStartX.current = e.clientX
    jumpToIndex(getNearestIndex(e.clientX), true)
  }

  function endDrag(e: React.PointerEvent) {
    const nearestIndex = getNearestIndex(e.clientX)

    jumpToIndex(nearestIndex, false)

    if (isDragging.current) {
      navigate(navLinks[nearestIndex].path)
    }

    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }

    isDragging.current = false
  }

  return (
    <div className="fixed bottom-4 left-4 z-30 sm:bottom-6 sm:left-6">
      <motion.p
        className="mb-0 select-none text-center text-xs text-gray-500/70"
        animate={{ opacity: hintVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        Drag/click to navigate
      </motion.p>

      <div
        ref={containerRef}
        className="relative inline-flex items-center space-x-1.5 rounded-2xl border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur-sm touch-none md:space-x-5"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <motion.div
          className="pointer-events-none absolute left-0 top-0 rounded-xl border border-white/50 bg-white shadow-md backdrop-blur-xl"
          style={{
            x: springX,
            y: springY,
            width: springW,
            height: springH,
          }}
        />

        {navLinks.map((item, index) => {
          const Icon = item.icon
          const isActive = index === selectedIndex

          return (
            <button
              key={item.path}
              ref={(el) => {
                buttonRefs.current[index] = el
              }}
              type="button"
              onClick={() => {
                onHideHint()
                navigate(item.path)
              }}
              className={`relative z-10 inline-flex items-center justify-center text-2xl transition-all duration-200 ${
                isActive
                  ? 'scale-110 text-gray-900'
                  : 'text-gray-500 hover:scale-105 hover:text-gray-800'
              }`}
              aria-label={item.label}
            >
              <Icon />
            </button>
          )
        })}
      </div>
    </div>
  )
}