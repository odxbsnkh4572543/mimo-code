import { createMemo, For, Show } from "solid-js"
import { useTheme } from "@tui/context/theme"
import { useSync } from "@tui/context/sync"

export function ModelPanel() {
  const { theme } = useTheme()
  const sync = useSync()

  const model = createMemo(() => sync.data.model)

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>Model</b>
      </text>
      <Show when={model()}>
        <box flexDirection="column" gap={0}>
          <text fg={theme.text}>{model()!.name || "Unknown"}</text>
          <text fg={theme.textMuted}>  {model()!.provider || ""}</text>
        </box>
      </Show>
      <Show when={!model()}>
        <text fg={theme.textMuted}>No model selected</text>
      </Show>
    </box>
  )
}
