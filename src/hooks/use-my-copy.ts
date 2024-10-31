import toast from '@/toast'
import { useClipboard } from '@mantine/hooks'

export const useMyCopy = () => {
  const { copy } = useClipboard()
  return (val: string) => {
    copy(val)
    toast.success('copied!')
  }
}
