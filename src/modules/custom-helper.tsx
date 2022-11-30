import { useState, FC } from 'react'
import { HelperEditor } from '@/components'

export interface CustomHelperProps {
  helper: string
  setHelper: (val: string) => any
}

export const CustomHelper: FC<CustomHelperProps> = ({ helper, setHelper }) => {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="section mb-10">
      <div className="form-control">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="checkbox mr-2"
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <label htmlFor="userHelper">
            <span className="label-text uppercase text-xl font-semibold">
              custom helpers (JavaScript)
            </span>
          </label>
          <div className="badge uppercase ml-2">experimental</div>
        </div>
      </div>
      <div hidden={!enabled} className="w-full h-80 mt-2 relative">
        <HelperEditor value={helper} onChange={setHelper} />
      </div>
    </div>
  )
}
