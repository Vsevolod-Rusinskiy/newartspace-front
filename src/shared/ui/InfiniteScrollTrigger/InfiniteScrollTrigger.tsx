import { useEffect, useRef } from 'react'
import { Spinner } from '../Spinner/Spinner'
import styles from './InfiniteScrollTrigger.module.scss'

interface InfiniteScrollTriggerProps {
  onTrigger: () => void
  isLoading?: boolean
  hasMore?: boolean
}

export const InfiniteScrollTrigger = ({
  onTrigger,
  isLoading = false,
  hasMore = true,
}: InfiniteScrollTriggerProps) => {
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && !isLoading && hasMore) {
          console.log('Triggered infinite scroll')
          onTrigger()
        }
      },
      { threshold: 0.1 }
    )

    const currentTrigger = triggerRef.current
    if (currentTrigger) {
      observer.observe(currentTrigger)
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger)
      }
    }
  }, [onTrigger, isLoading, hasMore])

  if (!hasMore) return null

  return (
    <div ref={triggerRef} className={styles.trigger}>
      {isLoading && <Spinner />}
    </div>
  )
}
