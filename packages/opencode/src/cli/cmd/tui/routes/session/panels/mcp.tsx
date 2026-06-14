import { createMemo, For, Show } from "solid-js"
import { useTheme } from "../../../context/theme"
import { useSync } from "@tui/context/sync"

interface McpServer {
  name: string
  status: string
  error?: string
}

export function McpPanel() {
  const { theme } = useTheme()
  const sync = useSync()

  const servers = createMemo(() => {
    return Object.entries(sync.data.mcp)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, item]) => ({
        name,
        status: item.status,
        error: item.status === "failed" ? item.error : undefined,
      }))
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>MCP Servers</b>
      </text>
      <Show when={servers().length > 0}>
        <For each={servers()}>
          {(server) => (
            <text fg={theme.text}>
              {server.status === "connected" ? "●" : "○"} {server.name}
            </text>
          )}
        </For>
      </Show>
    </box>
  )
}
