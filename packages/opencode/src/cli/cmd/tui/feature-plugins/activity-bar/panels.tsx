import type { TuiPluginApi } from "@mimo-ai/plugin/tui"
import { createMemo, For, Show } from "solid-js"

interface PanelDef {
  id: string
  icon: string
  label: string
  component: (api: TuiPluginApi, session_id: string) => any
}

function FileExplorerPanel(api: TuiPluginApi, session_id: string) {
  const theme = () => api.theme.current
  const files = createMemo(() => api.state.session.diff(session_id))

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme().text}><b>  File Explorer</b></text>
      <Show when={files().length > 0}>
        <For each={files()}>
          {(file) => (
            <box flexDirection="row" gap={1}>
              <text fg={theme().textMuted}>{file.file}</text>
              <Show when={file.additions}>
                <text fg={theme().diffAdded}>+{file.additions}</text>
              </Show>
              <Show when={file.deletions}>
                <text fg={theme().diffRemoved}>-{file.deletions}</text>
              </Show>
            </box>
          )}
        </For>
      </Show>
    </box>
  )
}

function TasksPanel(api: TuiPluginApi, session_id: string) {
  const theme = () => api.theme.current
  const tasks = createMemo(() => api.state.session.task(session_id))

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme().text}><b>  Tasks</b></text>
      <Show when={tasks().length > 0}>
        <For each={tasks()}>
          {(task) => (
            <box flexDirection="column">
              <text fg={theme().text}>{task.summary || "Untitled"}</text>
              <text fg={theme().textMuted}>  {task.status} {task.id}</text>
            </box>
          )}
        </For>
      </Show>
    </box>
  )
}

function TodoPanel(api: TuiPluginApi, session_id: string) {
  const theme = () => api.theme.current
  const todos = createMemo(() => api.state.session.todo(session_id))

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme().text}><b>  Todo</b></text>
      <Show when={todos().length > 0}>
        <For each={todos()}>
          {(todo) => (
            <text fg={theme().text}>
              {todo.status === "completed" ? "✓" : "○"} {todo.content}
            </text>
          )}
        </For>
      </Show>
    </box>
  )
}

function McpPanel(api: TuiPluginApi, session_id: string) {
  const theme = () => api.theme.current
  const mcp = createMemo(() => api.state.mcp())

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme().text}><b>  MCP Servers</b></text>
      <Show when={mcp().length > 0}>
        <For each={mcp()}>
          {(server) => (
            <text fg={theme().text}>
              {server.status === "connected" ? "●" : "○"} {server.name}
            </text>
          )}
        </For>
      </Show>
    </box>
  )
}

function LspPanel(api: TuiPluginApi, session_id: string) {
  const theme = () => api.theme.current
  const lsp = createMemo(() => api.state.lsp())

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme().text}><b>  LSP Servers</b></text>
      <Show when={lsp().length > 0}>
        <For each={lsp()}>
          {(server) => (
            <text fg={theme().text}>
              {server.status === "connected" ? "●" : "○"} {server.id}
            </text>
          )}
        </For>
      </Show>
    </box>
  )
}

export const PANELS: PanelDef[] = [
  { id: "files", icon: " ", label: "File Explorer", component: FileExplorerPanel },
  { id: "tasks", icon: " ", label: "Tasks", component: TasksPanel },
  { id: "todo", icon: "✓", label: "Todo", component: TodoPanel },
  { id: "mcp", icon: " ", label: "MCP Servers", component: McpPanel },
  { id: "lsp", icon: " ", label: "LSP Servers", component: LspPanel },
]

export function getPanelComponent(id: string): PanelDef | undefined {
  return PANELS.find(p => p.id === id)
}
