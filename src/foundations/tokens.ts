// Helpers that read tokens/tokens.json so the Foundations pages always match the exported tokens.
import tokens from '../../tokens/tokens.json'

type Token = { $type: string; $value: unknown; $extensions?: { modes?: { dark?: string } } }
type Group = { [key: string]: Group | Token | string }

export { tokens }

export function leaves(group: Group, trail: string[] = []): [string[], Token][] {
  return Object.entries(group).flatMap(([key, node]) => {
    if (key.startsWith('$') || typeof node !== 'object') return []
    if ('$value' in node) return [[[...trail, key], node as Token]]
    return leaves(node as Group, [...trail, key])
  })
}

export const cssVar = (segments: string[]) => `--${segments.join('-')}`

// "{palette.neutral.50}" -> "#f8fafb"
export function resolveHex(value: string): string {
  const match = value.match(/^\{palette\.(.+)\.(.+)\}$/)
  if (!match) return value
  const [, family, step] = match
  const palette = tokens.palette as unknown as Record<string, Record<string, Token>>
  return String(palette[family][step].$value)
}
