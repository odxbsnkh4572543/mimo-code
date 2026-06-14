import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@mimo-ai/plugin/tui"
import { For, Show, createMemo } from "solid-js"
import { PANELS, getPanelComponent } from "./panels"

const id = "activity-bar-panels"

function ActivityBarIcons(props: {
  api: TuiPluginApi
  session_id: string
  active_panels: string[]
  on_toggle: (panel_id: string) => void
}) {
  const theme = () => props.api.theme.current
  const isActive = (id: string) => props.active_panels.includes(id)

  return (
    <For each={PANELS}>
      {(panel) => (
        <box
          width={3}
          height={1}
          alignItems="center"
          justifyContent="center"
          onMouseDown={() => props.on_toggle(panel.id)}
        >
          <text
            fg={isActive(panel.id) ? theme().primary : theme().textMuted}
          >
            {panel.icon}
          </text>
        </box>
      )}
    </For>
  )
}

function SidebarPanelContent(props: {
  api: TuiPluginApi
  session_id: string
  panel_id: string
}) {
  const panelDef = getPanelComponent(props.panel_id)
  if (!panelDef) return null

  return (
    <box flexDirection="column" gap={1} paddingBottom={1}>
      {panelDef.component(props.api, props.session_id)}
    </box>
  )
}

const tui: TuiPlugin = async (api) => {
  api.slots.register({
    order: 100,
    slots: {
      activity_bar(_ctx, props) {
        return (
          <ActivityBarIcons
            api={api}
            session_id={props.session_id}
            active_panels={props.active_panels}
            on_toggle={props.on_toggle}
          />
        )
      },
      sidebar_panel(_ctx, props) {
        return (
          <SidebarPanelContent
            api={api}
            session_id={props.session_id}
            panel_id={props.panel_id}
          />
        )
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
