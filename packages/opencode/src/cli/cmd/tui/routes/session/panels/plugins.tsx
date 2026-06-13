import { createMemo, For } from "solid-js"
import { useTheme } from "@tui/context/theme"

interface Plugin {
  name: string
  version: string
  enabled: boolean
}

export function PluginsPanel() {
  const { theme } = useTheme()

  const plugins = createMemo<Plugin[]>(() => {
    return [
      { name: "opencode-puter-auth", version: "1.0.0", enabled: true },
      { name: "@zenobius/opencode-skillful", version: "1.2.0", enabled: true },
      { name: "@opencode-manager/memory", version: "0.9.0", enabled: true },
      { name: "work-checkpoints", version: "1.0.0", enabled: false },
    ]
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>Plugins</b>
      </text>
      <For each={plugins()}>
        {(plugin) => (
          <box flexDirection="column" gap={0}>
            <box flexDirection="row" gap={1} justifyContent="space-between">
              <text fg={theme.text}>{plugin.name}</text>
              <text fg={plugin.enabled ? theme.success : theme.textMuted}>
                {plugin.enabled ? "●" : "○"}
              </text>
            </box>
            <text fg={theme.textMuted}>  v{plugin.version}</text>
          </box>
        )}
      </For>
    </box>
  )
}
