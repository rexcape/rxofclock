import { useContext } from 'react'
import { LowPerformanceMode } from '@/contexts'

export const LowPerformanceToggler = () => {
  const { active, toggle } = useContext(LowPerformanceMode)

  return (
    <div className="form-control">
      <label className="cursor-pointer flex justify-center items-center h-10 select-none">
        <div
          className="tooltip tooltip-left"
          data-tip="Use textarea instead of monaco editor"
        >
          <span className="label-text font-bold">Low Performance</span>
        </div>
        <input
          type="checkbox"
          className="toggle ml-2"
          checked={active}
          onChange={toggle}
        />
      </label>
    </div>
  )
}
