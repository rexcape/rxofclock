import { useState } from 'react'

import { useMyCopy } from '@/hooks'
import { IconTool } from '@tabler/icons-react'

export const SheetHelper = ({ cols }: { cols: string[] | null }) => {
  const [show, setShow] = useState(false)
  const myCopy = useMyCopy()

  return (
    <>
      <button
        className={
          'btn btn-sm btn-square btn-ghost fixed bottom-4 right-8 z-20'
        }
        onClick={() => setShow(!show)}
      >
        <IconTool color="black" size={16} />
      </button>
      {show && (
        <div
          className={
            'card card-bordered glass w-1/3 h-80 fixed bottom-16 right-8 z-20'
          }
        >
          <div className="card-body">
            <h2 className="card-title uppercase">helper</h2>
            <div className="max-h-60 grid grid-cols-1 gap-y-2 overflow-y-auto">
              {cols ? (
                <>
                  <ul className="menu menu-compact rounded-box p-2 mr-2">
                    <li className="menu-title uppercase">cols</li>
                    {cols.map((c, idx) => (
                      <li key={idx}>
                        <button
                          className="tooltip font-bold text-lg"
                          data-tip="Click to copy"
                          onClick={() => myCopy(`{{[${c}]}}`)}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xl text-center font-bold">
                      NO COLS
                      <br />
                      SELECT A SHEET FIRST
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
