import { createMemo, For, Show } from "solid-js"
import { useTheme } from "../../../context/theme"
import { useSync } from "@tui/context/sync"

interface Task {
  id: string
  status: string
  summary: string
  owner?: string
  ended_at?: string
}

export function TasksPanel() {
  const { theme } = useTheme()
  const sync = useSync()

  const tasks = createMemo(() => {
    const sessionData = sync.data.session
    if (!sessionData) return []
    return Object.values(sessionData).flatMap((session: any) => 
      sync.data.task[session.id] ?? []
    )
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>Tasks</b>
      </text>
      <Show when={tasks().length > 0}>
        <For each={tasks()}>
          {(task) => (
            <box flexDirection="column">
              <text fg={theme.text}>{task.summary || "Untitled"}</text>
              <text fg={theme.textMuted}>  {task.status} {task.id}</text>
            </box>
          )}
        </For>
      </Show>
    </box>
  )
}
