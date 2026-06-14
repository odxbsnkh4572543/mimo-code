import { createMemo, For, Show } from "solid-js"
import { useTheme } from "../../../context/theme"
import { useSync } from "@tui/context/sync"

interface TodoItem {
  content: string
  status: string
}

export function TodoPanel() {
  const { theme } = useTheme()
  const sync = useSync()

  const todos = createMemo(() => {
    const sessionData = sync.data.session
    if (!sessionData) return []
    return Object.values(sessionData).flatMap((session: any) => 
      sync.data.todo[session.id] ?? []
    )
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>Todo</b>
      </text>
      <Show when={todos().length > 0}>
        <For each={todos()}>
          {(todo) => (
            <text fg={theme.text}>
              {todo.status === "completed" ? "✓" : "○"} {todo.content}
            </text>
          )}
        </For>
      </Show>
    </box>
  )
}
