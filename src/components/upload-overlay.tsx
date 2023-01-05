import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export interface UploadOverlayProps {
  setTemplate: (s: string) => void
}

export const UploadOverlay = ({ setTemplate }: UploadOverlayProps) => {
  const readFile = (f: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const res = e.target?.result
      if (!res) return
      setTemplate(res as string)
    }
    reader.readAsText(f, 'utf-8')
  }
  const onDrop = useCallback((acceptedFiles: File[]) => {
    readFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/plain': ['.txt'],
    },
  })

  return (
    <>
      <div
        {...getRootProps({
          className: 'absolute opacity-60 right-16 top-20 z-10 bg-base-200 hover:bg-base-300 transition w-1/4 h-1/2 rounded-lg cursor-pointer',
          id: 'template-select-root'
        })}
      >
        <input {...getInputProps({ id: 'template-select' })} />
        <div className="flex w-full h-full p-2 justify-center items-center font-semibold font-lg select-none">
          {isDragActive ? (<p>Drop the template file here ...</p>):(<p>
            Drag template here or click to select
          </p>)}
        </div>
      </div>
    </>
  )
}
