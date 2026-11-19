// Finds Tailwind spacing classes that are not on the Figma spacing scale (they would silently do nothing).
// Run with: npm run check:spacing
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tokens.json'), 'utf8'))
const allowed = new Set(Object.keys(tokens.spacing))
const prefixes = 'p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y|w|h|size|min-w|min-h|max-w|max-h|top|left|right|bottom|inset|inset-x|inset-y|translate-x|translate-y'
const pattern = new RegExp(`(?<![\\w-])-?(?:[a-z-]+:)*(${prefixes})-(\\d+(?:\\.\\d+)?)(?![\\w.\\[/])`, 'g')

const problems = []
const walk = dir => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(file)
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
        for (const match of line.matchAll(pattern)) {
          if (!allowed.has(match[2])) problems.push(`${path.relative(root, file)}:${i + 1}  ${match[0].trim()}`)
        }
      })
    }
  }
}
walk(path.join(root, 'src'))

if (problems.length) {
  console.error(`Spacing classes not on the Figma scale (${[...allowed].join(', ')}). Use an arbitrary value like h-[56px] instead:\n` + problems.join('\n'))
  process.exit(1)
}
console.log('Spacing check passed: every spacing class is on the Figma scale.')
