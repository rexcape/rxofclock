import { FC } from 'react'
import { Drawer, ScrollArea, TypographyStylesProvider } from '@mantine/core'
import { DocsDrawerTab } from '@/hooks'

import Intro from './intro.md'
import Helpers from './helpers.mdx'
import CustomHelpers from './custom-helpers.mdx'

export interface DocsDrawerProps {
  tab: DocsDrawerTab
  opened: boolean
  onClose: () => void
}

export const DocsDrawer: FC<DocsDrawerProps> = ({ tab, opened, onClose }) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
      size="xl"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      radius="md"
      offset={8}
    >
      <TypographyStylesProvider>
        {tab === 'intro' && <Intro />}
        {tab === 'helpers' && <Helpers />}
        {tab === 'custom-helpers' && <CustomHelpers />}
      </TypographyStylesProvider>
    </Drawer>
  )
}
