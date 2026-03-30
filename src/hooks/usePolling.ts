import { useEffect, useEffectEvent } from 'react'

type UsePollingOptions = {
  enabled?: boolean
  intervalMs: number
}

export function usePolling(callback: () => void | Promise<void>, options: UsePollingOptions) {
  const { enabled = true, intervalMs } = options
  const onTick = useEffectEvent(callback)

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      void onTick()
    }, intervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [enabled, intervalMs])
}
