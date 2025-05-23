import { useEffect, useState } from 'react'
import Handlebars from 'handlebars'
import { utils, read as readXlsx } from 'xlsx'

import { HelperEditor, LowPerformanceToggler, SheetHelper } from '@/components'
import {
  IconBolt,
  IconArrowBackUp,
  IconExclamationCircle,
  IconHelpHexagon,
} from '@tabler/icons-react'
import helpers from './helpers'
import { getTemplate } from './lib'
import { useResult, useCustomHelper, useDocsDrawer } from '@/hooks'
import { FileSelect, Result, TemplateInput } from './modules'
import toast from '@/toast'

import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Select,
  Stack,
  Title,
} from '@mantine/core'
import { DocsDrawer } from './docs/docs-drawer'

const defaultTemplate = `{{! Your code here}}`

Handlebars.registerHelper(helpers)

const links = [{ name: 'GitHub', href: 'https://github.com/rexcape/rxofclock' }]

const App = () => {
  const [template, setTemplate] = useState(defaultTemplate)
  const { result, setResult } = useResult()
  const {
    customHelper,
    setCustomHelper,
    reset: resetCustomHelper,
  } = useCustomHelper()
  const [sheets, setSheets] = useState<string[] | undefined>()
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [cols, setCols] = useState<string[] | null>(null)
  const [err, setErr] = useState<{ title: string; msg: string } | null>(null)

  const { tab, docsDrawerOpened, openDocsDrawer, closeDocsDrawer } =
    useDocsDrawer()

  const handleReset = () => {
    setResult('')
    setTemplate(defaultTemplate)
    setSelectedSheet(null)
    setSheets(undefined)
    setSelectedFile(undefined)
    setCols(null)
    resetCustomHelper()
  }

  useEffect(() => {
    if (!selectedFile) {
      setSheets(undefined)
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

  return (
    <>
      <DocsDrawer
        opened={docsDrawerOpened}
        onClose={closeDocsDrawer}
        tab={tab}
      />
      <Flex className="header" align="center" px="xl" component="nav">
        <Title order={2} style={{ flex: '1' }}>
          rxofclock
          <ActionIcon
            ml={8}
            size="lg"
            variant="subtle"
            color="gray"
            aria-label="introduction"
            onClick={() => {
              openDocsDrawer('intro')
            }}
          >
            <IconHelpHexagon size={20} />
          </ActionIcon>
        </Title>
        <Group mx="lg">
          {links.map((item, idx) => (
            <Box
              key={idx}
              className="header-link"
              component="a"
              href={item.href}
              target="_blank"
            >
              {item.name}
            </Box>
          ))}
        </Group>
      </Flex>

      <main>
        <Container size="xl" py="md">
          <Stack>
            <SheetHelper cols={cols} />
            <Title order={3}>File</Title>
            <FileSelect file={selectedFile} onSelect={setSelectedFile} />
            <Title order={3}>Sheet</Title>
            <Select
              onChange={(e) => {
                setSelectedSheet(e)
              }}
              placeholder="Select a sheet"
              data={sheets}
              disabled={!selectedFile}
            />
            <Title order={3}>
              Template
              <ActionIcon
                ml={8}
                size="lg"
                variant="subtle"
                color="gray"
                aria-label="handlebars helpers doc"
                onClick={() => {
                  openDocsDrawer('helpers')
                }}
              >
                <IconHelpHexagon size={20} />
              </ActionIcon>
            </Title>
            <TemplateInput template={template} setTemplate={setTemplate} />
            <Group grow>
              <Button
                onClick={handleGenerate}
                leftSection={<IconBolt size={20} />}
                size="lg"
              >
                Generate
              </Button>
              <Button
                onClick={handleReset}
                color="orange"
                variant="light"
                leftSection={<IconArrowBackUp size={20} />}
                size="lg"
              >
                Reset All
              </Button>
            </Group>
            {err && (
              <>
                <Alert
                  title={err.title}
                  icon={<IconExclamationCircle />}
                  color="red"
                >
                  {err.msg}
                </Alert>
              </>
            )}
            <Title order={3}>
              <label htmlFor="result-textarea">Result</label>
            </Title>
            <Result output={result} />
            <Title order={3}>
              Custom Helpers (JavaScript)
              <ActionIcon
                ml={8}
                size="lg"
                variant="subtle"
                color="gray"
                aria-label="custom helpers docs"
                onClick={() => {
                  openDocsDrawer('custom-helpers')
                }}
              >
                <IconHelpHexagon size={20} />
              </ActionIcon>
            </Title>
            <HelperEditor value={customHelper} onChange={setCustomHelper} />
          </Stack>
        </Container>
      </main>
    </>
  )
}

export default App
