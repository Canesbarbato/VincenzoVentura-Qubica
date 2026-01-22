import { registerSW } from 'virtual:pwa-register'

export const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('New version available')
  },
  onOfflineReady() {
    console.log('App ready for offline use')
  },
})
