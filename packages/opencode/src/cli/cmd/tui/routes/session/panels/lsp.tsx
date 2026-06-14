import { createMemo, For, Show } from "solid-js"
import { useTheme } from "../../../context/theme"
import { useSync } from "@tui/context/sync"

interface LspServer {
  id: string
  root: string
  status: string
}

export function LspPanel() {
  const { theme } = useTheme()
  const sync = useSync()

  const servers = createMemo(() => {
    return sync.data.lsp.map((item) => ({
      id: item.id,
      root: item.root,
      status: item.status,
    }))
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>LSP Servers</b>
      </text>
      <Show when={servers().length > 0}>
        <For each={servers()}>
          {(server) => (
            <text fg={theme.text}>
              {server.status === "connected" ? "●" : "○"} {server.id}
            </text>
          )}
        </For>
      </Show>
    </box>
  )
}
