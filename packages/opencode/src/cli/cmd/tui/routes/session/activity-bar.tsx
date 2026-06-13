import { For, Show } from "solid-js"
import { useTheme } from "../../context/theme"

export type PanelID = "files" | "skills" | "plugins" | "sessions" | "model"

interface PanelDef {
  id: PanelID
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

export function ActivityBar(props: {
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
          <For each={PANELS}>
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

export { PANELS }
export type { PanelDef }
