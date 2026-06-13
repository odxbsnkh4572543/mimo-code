import { createMemo, createSignal, For, Show } from "solid-js"
import { useTheme } from "../../../context/theme"
import { useDirectory } from "@tui/context/directory"
import fs from "fs/promises"
import path from "path"

interface FileEntry {
  name: string
  isDirectory: boolean
  children?: FileEntry[]
  expanded?: boolean
}

export function FileExplorerPanel() {
  const { theme } = useTheme()
  const directory = useDirectory()
  const [files, setFiles] = createSignal<FileEntry[]>([])
  const [loading, setLoading] = createSignal(true)

  const loadDir = async (dirPath: string): Promise<FileEntry[]> => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true })
      const result: FileEntry[] = []
      for (const entry of entries) {
        if (entry.name.startsWith(".")) continue
        if (entry.name === "node_modules") continue
        result.push({
          name: entry.name,
          isDirectory: entry.isDirectory(),
        })
      }
      return result.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
        return a.name.localeCompare(b.name)
      })
    } catch {
      return []
    }
  }

  createMemo(async () => {
    const dir = directory().split(":")[0].replace("~", process.env.HOME || "")
    const entries = await loadDir(dir)
    setFiles(entries)
    setLoading(false)
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>File Explorer</b>
      </text>
      <text fg={theme.textMuted}>{directory()}</text>
      <Show when={!loading()}>
        <For each={files()}>
          {(entry) => (
            <box flexDirection="row" gap={1}>
              <text fg={theme.textMuted}>
                {entry.isDirectory ? " " : " "}
              </text>
              <text fg={entry.isDirectory ? theme.primary : theme.text}>
                {entry.name}
              </text>
            </box>
          )}
        </For>
      </Show>
      <Show when={loading()}>
        <text fg={theme.textMuted}>Loading...</text>
      </Show>
    </box>
  )
}
