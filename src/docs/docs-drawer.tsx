import { FC } from 'react'
import { Drawer, ScrollArea, TypographyStylesProvider } from '@mantine/core'

import Intro from './intro.md'
import Helpers from './helpers.mdx'

export interface DocsDrawerProps {
  tab: 'intro' | 'helpers'
  opened: boolean
  onClose: () => void
}

export const DocsDrawer: FC<DocsDrawerProps> = ({ tab, opened, onClose }) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={tab}
      scrollAreaComponent={ScrollArea.Autosize}
      size="xl"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <TypographyStylesProvider>
        {tab === 'intro' && <Intro />}
        {tab === 'helpers' && <Helpers />}
      </TypographyStylesProvider>
    </Drawer>
  )
}
