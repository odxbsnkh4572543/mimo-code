import { createMemo, For, Show } from "solid-js"
import { useTheme } from "@tui/context/theme"
import { useSync } from "@tui/context/sync"

export function SessionsPanel() {
  const { theme } = useTheme()
  const sync = useSync()

  const sessions = createMemo(() => {
    return Object.values(sync.data.session ?? {})
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>Sessions</b>
      </text>
      <Show when={sessions().length > 0}>
        <For each={sessions()}>
          {(session) => (
            <box flexDirection="column" gap={0}>
              <text fg={theme.text}>{session.title || "Untitled"}</text>
              <text fg={theme.textMuted}>  {session.id.slice(0, 8)}</text>
            </box>
          )}
        </For>
      </Show>
      <Show when={sessions().length === 0}>
        <text fg={theme.textMuted}>No sessions</text>
      </Show>
    </box>
  )
}
