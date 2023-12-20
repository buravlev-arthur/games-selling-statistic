import { useQuasar } from 'quasar'
import type { UseScreenReturn } from '~/types'

export const useScreen = (): UseScreenReturn => {
  const $q = useQuasar()
  const isMobile = computed<boolean>(() => $q.screen.lt.md)
  const isDesktop = computed<boolean>(() => $q.screen.gt.sm)
  return { isMobile, isDesktop }
}
