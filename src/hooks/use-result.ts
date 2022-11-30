import { useState } from 'react'

export const useResult = () => {
  const [result, setResult] = useState('')
  return { result, setResult }
}
