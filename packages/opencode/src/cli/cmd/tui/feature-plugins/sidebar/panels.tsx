import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@mimo-ai/plugin/tui"
import { createMemo, For, Show, createSignal } from "solid-js"

const id = "mimocode-sidebar-panels"

interface PanelDef {
  id: string
  icon: string
  label: string
}

const PANELS: PanelDef[] = [
  { id: "files", icon: " ", label: "File Explorer" },
  { id: "skills", icon: "⚡", label: "Skills" },
  { id: "plugins", icon: " ", label: "Plugins" },
  { id: "sessions", icon: " ", label: "Sessions" },
  { id: "model", icon: " ", label: "Model" },
]

function PanelSection(props: {
  api: TuiPluginApi
  panel: PanelDef
  session_id: string
}) {
  const [open, setOpen] = createSignal(true)
  const theme = () => props.api.theme.current

  const content = createMemo(() => {
    switch (props.panel.id) {
      case "files":
        return props.api.state.session.diff(props.session_id)
      case "skills":
        return props.api.state.session.skill?.() ?? []
      case "plugins":
        return props.api.state.session.plugin?.() ?? []
      case "sessions":
        return Object.values(props.api.state.session ?? {})
      case "model":
        return props.api.state.session.model?.() ?? []
      default:
        return []
    }
  })

  const hasContent = createMemo(() => {
    const c = content()
    return Array.isArray(c) ? c.length > 0 : !!c
  })

  return (
    <Show when={hasContent()}>
      <box flexDirection="column" gap={1} paddingBottom={1}>
        <box
          flexDirection="row"
          gap={1}
          onMouseDown={() => setOpen((x) => !x)}
        >
          <text fg={theme().text}>{open() ? "▼" : "▶"}</text>
          <text fg={theme().text}>
            <b>{props.panel.icon} {props.panel.label}</b>
          </text>
        </box>
        <Show when={open()}>
          <box paddingLeft={2}>
            {props.panel.id === "files" && (
              <For each={content() as Array<{ file: string; additions: number; deletions: number }>>}>
                {(item) => (
                  <box flexDirection="row" gap={1}>
                    <text fg={theme().textMuted}>{item.file}</text>
                    <Show when={item.additions}>
                      <text fg={theme().diffAdded}>+{item.additions}</text>
                    </Show>
                    <Show when={item.deletions}>
                      <text fg={theme().diffRemoved}>-{item.deletions}</text>
                    </Show>
                  </box>
                )}
              </For>
            )}
            {props.panel.id === "sessions" && (
              <For each={Object.values(content() as Record<string, { title?: string; id: string }>)}>
                {(session) => (
                  <box flexDirection="column">
                    <text fg={theme().text}>{session.title || "Untitled"}</text>
                    <text fg={theme().textMuted}>  {session.id.slice(0, 8)}</text>
                  </box>
                )}
              </For>
            )}
            {props.panel.id === "model" && (
              <text fg={theme().text}>
                {(content() as { name?: string })?.name || "No model"}
              </text>
            )}
          </box>
        </Show>
      </box>
    </Show>
  )
}

function View(props: { api: TuiPluginApi; session_id: string }) {
  const theme = () => props.api.theme.current

  return (
    <box flexDirection="column" gap={1}>
      <For each={PANELS}>
        {(panel) => (
          <PanelSection api={props.api} panel={panel} session_id={props.session_id} />
        )}
      </For>
    </box>
  )
}

const tui: TuiPlugin = async (api) => {
  api.slots.register({
    order: 100,
    slots: {
      sidebar_content(_ctx, props) {
        return <View api={api} session_id={props.session_id} />
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
