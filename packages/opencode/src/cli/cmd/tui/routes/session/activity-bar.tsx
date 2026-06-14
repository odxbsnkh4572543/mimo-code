import { For, Show, createMemo } from "solid-js"
import { useTheme } from "../../context/theme"
import { TuiPluginRuntime } from "../../plugin"

export type PanelID = string

interface PanelDef {
  id: PanelID
  icon: string
  label: string
}

const BUILTIN_PANELS: PanelDef[] = [
  { id: "files", icon: " ", label: "File Explorer" },
  { id: "tasks", icon: " ", label: "Tasks" },
  { id: "todo", icon: "✓", label: "Todo" },
  { id: "mcp", icon: " ", label: "MCP Servers" },
  { id: "lsp", icon: " ", label: "LSP Servers" },
]

export function ActivityBar(props: {
  sessionID: string
  activePanels: PanelID[]
  onTogglePanel: (panel: PanelID) => void
  visible: boolean
  onToggle: () => void
}) {
  const { theme } = useTheme()

  const isActive = (id: PanelID) => props.activePanels.includes(id)

  return (
    <Show when={props.visible}>
      <box
        width={3}
        height="100%"
        backgroundColor={theme.backgroundPanel}
        flexDirection="column"
        justifyContent="space-between"
        paddingTop={1}
        paddingBottom={1}
      >
        <box gap={1} alignItems="center">
          <TuiPluginRuntime.Slot
            name="activity_bar"
            session_id={props.sessionID}
            active_panels={props.activePanels}
            on_toggle={props.onTogglePanel}
          >
            <For each={BUILTIN_PANELS}>
              {(panel) => (
                <box
                  width={3}
                  height={1}
                  alignItems="center"
                  justifyContent="center"
                  onMouseDown={() => props.onTogglePanel(panel.id)}
                >
                  <text
                    fg={isActive(panel.id) ? theme.primary : theme.textMuted}
                  >
                    {panel.icon}
                  </text>
                </box>
              )}
            </For>
          </TuiPluginRuntime.Slot>
        </box>

        <box alignItems="center" onMouseDown={props.onToggle}>
          <text fg={theme.textMuted}>
            {props.visible ? "◁" : "▷"}
          </text>
        </box>
      </box>
    </Show>
  )
}

export { BUILTIN_PANELS }
export type { PanelDef }
