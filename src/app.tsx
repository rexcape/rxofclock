import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Handlebars from 'handlebars'
import { utils, read as readXlsx } from 'xlsx'
import Swal from 'sweetalert2'
import { SheetHelper, TemplateEditor, UploadOverlay } from '@/components'
import {
  IconCopy,
  IconBolt,
  IconBraces,
  IconDownload,
  IconBrandGithub,
  IconUpload,
  IconLink,
} from '@tabler/icons'
import moment from 'moment'
import helpers from './helpers'
import { useMyCopy } from '@/hooks'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { saveAs } from 'file-saver'
import '@/styles/app.css'

const defaultTemplate = `{{#each data}}
{{! Your code here}}
{{/each}}`

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
  const [output, setOutput] = useState('')
  const [sheets, setSheets] = useState<string[] | null>(null)
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cols, setCols] = useState<string[] | null>(null)
  const myCopy = useMyCopy()

  const handleReset = () => {
    setOutput('')
    setTemplate(defaultTemplate)
    setSelectedSheet(null)
    setSheets(null)
    setSelectedFile(null)
    setCols(null)
    location.reload()
  }

  const handleCopy = () => {
    myCopy(output)
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
      Swal.fire({ icon: 'error', text: 'Select a file first' })
      return
    }
    if (!selectedSheet) {
      Swal.fire({ icon: 'error', text: 'Select a sheet' })
      return
    }

    try {
      const t = Handlebars.compile(template)
      const reader = new FileReader()
      reader.onload = (e) => {
        const res = e.target?.result
        if (!res) return
        const data = utils.sheet_to_json<Record<string, string>>(
          readXlsx(res).Sheets[selectedSheet]
        )
        setOutput(t({ data }))
      }
      reader.readAsArrayBuffer(selectedFile)
    } catch (e) {
      Swal.fire({ title: 'Error', text: 'Template error' })
    }
  }

  const handleDownloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `template_${moment().format('YYYY_MM_DD_HH:mm:ss')}.txt`)
  }

  const handleDownloadResult = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `result_${moment().format('YYYY_MM_DD_HH:mm:ss')}.txt`)
  }

  return (
    <>
      <Scrollbars
        autoHide
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100vh',
        }}
      >
        <div className={'navbar px-8'}>
          <div className={'flex-1 font-semibold text-2xl'}>RXOFCLOCK</div>
          <div className={'flex-none'}>
            <a
              href={'https://rxofclock-docs.vercel.app'}
              target={'_blank'}
              className={'link flex justify-center items-center'}
            >
              <span className={'text-lg'}>doc</span>
            </a>
            <a
              href={'https://github.com/rexcape/rxofclock'}
              target={'_blank'}
              className={'btn btn-ghost btn-square ml-4'}
            >
              <IconBrandGithub />
            </a>
          </div>
        </div>
        <div className={'container mx-auto w-[92%]'}>
          <SheetHelper cols={cols} />
          <div className={'section'}>
            <div className={'form-control'}>
              <label htmlFor={'file-select'}>
                <span className={'label-text uppercase text-xl font-semibold'}>
                  file
                </span>
              </label>
              {selectedFile ? (
                <>
                  <div
                    className={[
                      'h-20 w-full bg-gray-200 dark:bg-slate-800 rounded-lg mt-2 font-code p-4',
                      'flex justify-center items-center transition',
                    ].join(' ')}
                  >
                    <span>{selectedFile.name}</span>
                    <button
                      className={'btn btn-outline ml-4'}
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
                        'h-20 w-full bg-base-100 dark:bg-slate-800 rounded-lg mt-2 text-xl font-semibold p-4',
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

          <div className={'section'}>
            <div className={'form-control'}>
              <label htmlFor={'sheet'}>
                <span className={'label-text uppercase text-xl font-semibold'}>
                  sheet
                </span>
              </label>
              <select
                id={'sheet'}
                className={'select select-bordered w-full mt-2 text-lg'}
                onChange={(e) => {
                  setSelectedSheet(e.target.value)
                }}
                defaultValue={'default'}
              >
                <option disabled value={'default'}>
                  Select a sheet
                </option>
                {sheets?.map((s, idx) => (
                  <option key={idx}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={'section'}>
            <div className={'form-control'}>
              <label htmlFor={'template'}>
                <span className={'label-text uppercase text-xl font-semibold'}>
                  template
                </span>
              </label>
              <div className={'w-full h-80 mt-2 relative'}>
                <UploadOverlay setTemplate={setTemplate} />
                <div className={'absolute right-12 top-4 flex flex-row z-20'}>
                  <div
                    data-tip={'Download current template'}
                    className={'tooltip'}
                  >
                    <button
                      onClick={handleDownloadTemplate}
                      className={'btn btn-square btn-ghost btn-sm '}
                    >
                      <IconDownload size={20} />
                    </button>
                  </div>
                  <div
                    data-tip={'Copy template to clipboard'}
                    className={'tooltip ml-2'}
                  >
                    <button
                      onClick={() => myCopy(template)}
                      className={'btn btn-square btn-ghost btn-sm '}
                    >
                      <IconCopy size={20} />
                    </button>
                  </div>
                </div>
                <TemplateEditor value={template} onChange={setTemplate} />
              </div>
            </div>
          </div>

          <div className={'section'}>
            <button className={'btn gap-2'} onClick={handleGenerate}>
              <IconBolt size={20} />
              Generate
            </button>
            <button
              className={'btn btn-secondary gap-2 ml-4'}
              onClick={() => {
                document.getElementById('template-select-root')?.click()
              }}
            >
              <IconUpload size={20} />
              Upload
            </button>
            <button
              className={'btn btn-primary gap-2 ml-4'}
              onClick={handleReset}
            >
              <IconBraces size={20} />
              Reset All
            </button>
          </div>

          <div className={'section mb-10'}>
            <div className={'form-control'}>
              <label htmlFor={'result'}>
                <span className={'label-text uppercase text-xl font-semibold'}>
                  result
                </span>
              </label>
              <div className={'result-container w-full h-80 mt-2 relative'}>
                <div className={'absolute right-12 top-4'}>
                  <div data-tip={'Download result'} className={'tooltip'}>
                    <button
                      onClick={handleDownloadResult}
                      className={'btn btn-square btn-ghost btn-sm '}
                    >
                      <IconDownload size={20} />
                    </button>
                  </div>
                  <div
                    data-tip={'Copy result to clipboard'}
                    className={'tooltip ml-2'}
                  >
                    <button
                      onClick={handleCopy}
                      className={'btn btn-square btn-ghost btn-sm'}
                    >
                      <IconCopy size={20} />
                    </button>
                  </div>
                </div>
                <textarea
                  id={'result'}
                  className={
                    'textarea textarea-bordered w-full h-80 font-code resize-none'
                  }
                  value={output}
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
    </>
  )
}

export default App
