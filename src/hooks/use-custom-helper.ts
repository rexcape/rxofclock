import { useState } from 'react'

const defaultHelper = `/* Enter the code:
helpers['hello'] = (val) => 'Hello ' + val
Use it in template section
{{hello [fruit]}}
You will get the output
Hello apple
Hello banana
Hello orange */
`

export const useCustomHelper = () => {
  const [customHelper, setCustomHelper] = useState(defaultHelper)
  return {
    customHelper,
    setCustomHelper,
    reset: () => setCustomHelper(defaultHelper),
  }
}
