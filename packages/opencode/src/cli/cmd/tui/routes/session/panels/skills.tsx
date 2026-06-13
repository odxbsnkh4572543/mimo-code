import { createMemo, For, Show } from "solid-js"
import { useTheme } from "@tui/context/theme"

interface Skill {
  name: string
  description: string
  enabled: boolean
}

export function SkillsPanel() {
  const { theme } = useTheme()

  const skills = createMemo<Skill[]>(() => {
    return [
      { name: "brainstorming", description: "Creative work planning", enabled: true },
      { name: "systematic-debugging", description: "Bug investigation", enabled: true },
      { name: "test-driven-development", description: "TDD workflow", enabled: false },
      { name: "writing-plans", description: "Implementation planning", enabled: true },
    ]
  })

  return (
    <box flexDirection="column" gap={1}>
      <text fg={theme.text}>
        <b>Skills</b>
      </text>
      <For each={skills()}>
        {(skill) => (
          <box flexDirection="row" gap={1} justifyContent="space-between">
            <text fg={theme.text}>{skill.name}</text>
            <text fg={skill.enabled ? theme.success : theme.textMuted}>
              {skill.enabled ? "●" : "○"}
            </text>
          </box>
        )}
      </For>
    </box>
  )
}
