import { useOnline } from '@vueuse/core'
import { computed } from 'vue'

const onlineStatus = useOnline()

export const online = computed(() => onlineStatus.value)