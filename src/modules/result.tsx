import { useMyCopy } from '@/hooks'
import { IconDownload, IconCopy } from '@tabler/icons-react'
import saveAs from 'file-saver'
import dayjs from 'dayjs'
import { FC } from 'react'

export interface ResultProps {
  output: string
}

export const Result: FC<ResultProps> = ({ output }) => {
  const myCopy = useMyCopy()
  const handleCopy = () => {
    myCopy(output)
  }
  const handleDownloadResult = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `result_${dayjs().format('result_YYYY_MM_DD_HH_mm_ss')}.txt`)
  }

  return (
    <div className="section mb-10">
      <div className="form-control">
        <label htmlFor="result">
          <span className="label-text uppercase text-xl font-semibold">
            result
          </span>
        </label>
        <div className="result-container w-full h-80 mt-2 relative">
          <div className="absolute right-1 top-1 z-10">
            <div data-tip="Download result" className="tooltip tooltip-left">
              <button
                onClick={handleDownloadResult}
                className="btn btn-square btn-ghost btn-sm"
              >
                <IconDownload size={16} />
              </button>
            </div>
            <div data-tip="Copy result to clipboard" className="tooltip tooltip-left ml-2">
              <button
                onClick={handleCopy}
                className="btn btn-square btn-ghost btn-sm"
              >
                <IconCopy size={16} />
              </button>
            </div>
          </div>
          <textarea
            id="result"
            className="textarea textarea-bordered w-full h-80 font-mono text-xs resize-none"
            value={output}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  )
}
