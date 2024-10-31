import { Switch, Tooltip } from '@mantine/core'
import { useAtom } from 'jotai'
import { lowPerformanceModeAtom } from '@/store'

export const LowPerformanceToggler = () => {
  const [active, setActive] = useAtom(lowPerformanceModeAtom)

  return (
    <Tooltip label="Use textarea instead of monaco" refProp="rootRef">
      <Switch
        label="Low performance"
        checked={active}
        onChange={(e) => {
          setActive(e.target.checked)
        }}
      />
    </Tooltip>
  )
}
