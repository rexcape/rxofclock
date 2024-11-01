import { useDisclosure } from '@mantine/hooks'
import { useCallback, useState } from 'react'

export type DocsDrawerTab = 'intro' | 'helpers'

export const useDocsDrawer = () => {
  const [tab, setTab] = useState<DocsDrawerTab>('intro')
  const [docsDrawerOpened, { open, close: closeDocsDrawer }] =
    useDisclosure(false)

  const openDocsDrawer = useCallback(
    (tab: DocsDrawerTab) => {
      setTab(tab)
      open()
    },
    [setTab, open]
  )

  return { tab, docsDrawerOpened, openDocsDrawer, closeDocsDrawer }
}
