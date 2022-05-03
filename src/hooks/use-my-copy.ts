import { toast } from 'react-toastify'
import useClipboardApi from 'use-clipboard-api'

export const useMyCopy = () => {
  const [_, copy] = useClipboardApi()
  return (val: string) => {
    copy(val)
    toast.success('copied!', {
      position: 'top-center',
      autoClose: 1000,
    })
  }
}
