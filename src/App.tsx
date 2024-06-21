import { useCallback, useEffect, useState, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import Handlebars from 'handlebars'
import { utils, read as readXlsx } from 'xlsx'
import { toast } from 'react-toastify'
import {
  LowPerformanceToggler,
  SheetHelper,
  TemplateEditor,
  UploadOverlay,
} from '@/components'
import {
  IconCopy,
  IconBolt,
  IconDownload,
  IconUpload,
  IconRestore,
  IconExclamationCircle,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import helpers from './helpers'
import { getTemplate } from './lib'
import { useMyCopy, useResult, useCustomHelper } from '@/hooks'
import { saveAs } from 'file-saver'
import '@/styles/app.css'
import { CustomHelper, Result } from './modules'

const defaultTemplate = `{{! Your code here}}`

Handlebars.registerHelper(helpers)

const App = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xls',
        '.xlsx',
      ],
    },
  })

  const [template, setTemplate] = useState(defaultTemplate)
  const { result, setResult } = useResult()
  const {
    customHelper,
    setCustomHelper,
    reset: resetCustomHelper,
  } = useCustomHelper()
  const [sheets, setSheets] = useState<string[] | null>(null)
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cols, setCols] = useState<string[] | null>(null)
  const myCopy = useMyCopy()
  const [err, setErr] = useState<{ title: string; msg: string } | null>(null)

  const handleReset = () => {
    setResult('')
    setTemplate(defaultTemplate)
    setSelectedSheet(null)
    setSheets(null)
    setSelectedFile(null)
    setCols(null)
    resetCustomHelper()
  }

  useEffect(() => {
    if (!selectedFile) {
      setSheets([])
      setSelectedSheet(null)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const res = e.target?.result
      if (!res) return
      setSheets(readXlsx(res).SheetNames)
    }
    reader.readAsArrayBuffer(selectedFile)
  }, [selectedFile])

  useEffect(() => {
    if (!selectedSheet || !selectedFile) {
      setCols(null)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const res = e.target?.result
      if (!res) return
      const set = new Set(
        Object.keys(
          utils.sheet_to_json<Record<string, unknown>>(
            readXlsx(res).Sheets[selectedSheet]
          )[0]
        )
      )
      if (set.size > 0) {
        setCols(Array.from(set))
      }
    }
    reader.readAsArrayBuffer(selectedFile)
  }, [selectedSheet, selectedFile])

  const handleGenerate = () => {
    if (!selectedFile) {
      toast.error('Select a file first')
      return
    }
    if (!selectedSheet) {
      toast.error('Select a sheet')
      return
    }

    try {
      const t = Handlebars.compile(getTemplate(template), { noEscape: true })
      const reader = new FileReader()
      reader.onload = (e) => {
        const res = e.target?.result
        if (!res) return
        const data = utils.sheet_to_json<Record<string, string>>(
          readXlsx(res).Sheets[selectedSheet]
        )
        let userHelpers: { [name: string]: Function } = {}
        if (customHelper) {
          type HelperFunc = (helpers: { [name: string]: Function }) => void
          try {
            const helperFunc = new Function(
              'helpers',
              customHelper
            ) as HelperFunc
            helperFunc(userHelpers)
          } catch (e) {
            if (e instanceof Error) {
              setErr({ title: 'Custom helper error', msg: e.message })
            } else {
              setErr({ title: 'Custom helper error', msg: 'Unknown error' })
            }
            return
          }
        }
        try {
          setErr(null)
          setResult(t({ data }, { helpers: userHelpers }))
        } catch (e) {
          if (e instanceof Error) {
            setErr({ title: 'Generate error', msg: e.message })
          } else {
            setErr({ title: 'Generate error', msg: 'Unknown error' })
          }
        }
      }
      reader.readAsArrayBuffer(selectedFile)
    } catch (e) {
      toast.error('Template error')
    }
  }

  const handleDownloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/plain;charset=utf-8' })
    saveAs(
      blob,
      `template_${dayjs().format('template_YYYY_MM_DD_HH_mm_ss')}.txt`
    )
  }
  return (
    <>
      <div>
        <div className="sticky top-0 navbar px-8 border-b z-30 glass">
          <div className="flex-1 font-semibold text-2xl">RXOFCLOCK</div>
          <LowPerformanceToggler />
        </div>

        <div className="container mx-auto mt-20 px-8 2xl:px-4">
          <SheetHelper cols={cols} />
          <div className="section">
            <div className="form-control">
              <label htmlFor="file-select">
                <span className="label-text uppercase text-xl font-semibold">
                  file
                </span>
              </label>
              {selectedFile ? (
                <>
                  <div
                    className={[
                      'h-20 w-full bg-gray-200 text-gray-900 rounded-lg mt-2 font-mono text-lg p-4',
                      'flex justify-center items-center transition',
                    ].join(' ')}
                  >
                    <span>{selectedFile.name}</span>
                    <button
                      className="btn btn-ghost ml-4"
                      onClick={() => {
                        setSelectedFile(null)
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    {...getRootProps({
                      className: [
                        'h-20 w-full bg-base-100 rounded-lg mt-2 text-xl font-semibold p-4',
                        'flex justify-center items-center transition hover:bg-base-200 active:bg-base-300',
                        'focus:ring-2 focus:ring-offset-2 focus:ring-base-200 cursor-pointer',
                        'border-2 border-base-300 border-dotted',
                      ].join(' '),
                    })}
                  >
                    <input {...getInputProps({ id: 'file-select' })} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag a xlsx or xls file here, or click to select file
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="section">
            <div className="form-control">
              <label htmlFor="sheet">
                <span className="label-text uppercase text-xl font-semibold">
                  sheet
                </span>
              </label>
              <select
                id="sheet"
                className="select select-bordered w-full mt-2 text-lg"
                onChange={(e) => {
                  setSelectedSheet(e.target.value)
                }}
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a sheet
                </option>
                {sheets?.map((s, idx) => (
                  <option key={idx}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="section">
            <div className="form-control">
              <label htmlFor="template">
                <span className="label-text uppercase text-xl font-semibold">
                  template
                </span>
              </label>
              <div className="w-full h-100 mt-2 relative border border-black border-opacity-20 rounded-lg">
                <UploadOverlay setTemplate={setTemplate} />
                <div className="absolute right-1 top-1 flex flex-row z-10">
                  <div
                    data-tip="Download current template"
                    className="tooltip tooltip-left"
                  >
                    <button
                      onClick={handleDownloadTemplate}
                      className="btn btn-square btn-ghost btn-sm"
                    >
                      <IconDownload size={16} />
                    </button>
                  </div>
                  <div
                    data-tip="Copy template to clipboard"
                    className="tooltip tooltip-left ml-2"
                  >
                    <button
                      onClick={() => myCopy(template)}
                      className="btn btn-square btn-ghost btn-sm"
                    >
                      <IconCopy size={16} />
                    </button>
                  </div>
                </div>
                <div className="h-10 bg-base-200 select-none pl-4 rounded-t-lg flex items-center">
                  <div className="font-mono text-md">{'{{#each data}}'}</div>
                </div>
                <TemplateEditor value={template} onChange={setTemplate} />
                <div className="h-10 bg-base-200 select-none pl-4 rounded-b-lg flex items-center">
                  <div className="font-mono text-md">{'{{/each}}'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div
              className="tooltip tooltip-right"
              data-tip="Convert data to text"
            >
              <button className="btn btn-wide gap-2" onClick={handleGenerate}>
                <IconBolt size={16} />
                Generate
              </button>
            </div>
            <div
              className="tooltip tooltip-right"
              data-tip="Select a local file as template content"
            >
              <button
                className="btn btn-wide btn-secondary gap-2 ml-4"
                onClick={() => {
                  document.getElementById('template-select-root')?.click()
                }}
              >
                <IconUpload size={16} />
                Select
              </button>
            </div>
            <div className="tooltip tooltip-right" data-tip="Reset all states">
              <button
                className="btn btn-wide btn-primary gap-2 ml-4"
                onClick={handleReset}
              >
                <IconRestore size={16} />
                Reset All
              </button>
            </div>
          </div>

          {err && (
            <>
              <div className="section">
                <div role="alert" className="alert alert-error">
                  <IconExclamationCircle />
                  <div>
                    <h3 className="font-bold">{err.title}</h3>
                    <div className="text-xs font-mono">{err.msg}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          <Result output={result} />

          <CustomHelper helper={customHelper} setHelper={setCustomHelper} />
        </div>
      </div>
    </>
  )
}

export default App
