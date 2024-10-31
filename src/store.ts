import { atomWithStorage } from 'jotai/utils'

export const lowPerformanceModeAtom = atomWithStorage(
  'lowPerformanceMode',
  false
)
