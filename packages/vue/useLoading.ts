import { ref } from 'vue'

export function useLoading<T extends (...args: any[]) => Promise<any>>(callback: T) {
  const loading = ref(false)

  const handler = async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    loading.value = true
    try {
      await new Promise((rs) => setTimeout(rs, 3e3))
      return await callback(...args)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    handler,
  }
}
