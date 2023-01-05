import { useState, useEffect } from 'react'

const defaultHelper = `/* Enter the code:
helpers['testHelper'] = () => 'Test helper!'
Use it in template section
{{testHelper}}
You will get the output
Test helper! */
`

export const useCustomHelper = () => {
  const [customHelper, setCustomHelper] = useState(defaultHelper)
  return {
    customHelper,
    setCustomHelper,
    reset: () => setCustomHelper(defaultHelper),
  }
}
