import { computed, onBeforeUnmount, ref } from 'vue'

export function useInterval(callback: () => void, delay: number, immediately = true) {
  const timerId = ref<number | null>(null)

  const start = () => {
    if (timerId.value === null) {
      if (immediately) callback()
      timerId.value = window.setInterval(callback, delay)
    }
  }

  const stop = () => {
    if (timerId.value !== null) {
      clearInterval(timerId.value)
      timerId.value = null
    }
  }

  onBeforeUnmount(() => {
    stop()
  })

  return {
    start,
    stop,
    active: computed(() => timerId.value !== null),
  }
}
