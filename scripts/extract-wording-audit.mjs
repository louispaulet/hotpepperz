import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const sourceRoots = ['src/pages', 'src/components', 'src/data']
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx'])
const bucketRules = [
  { prefix: 'src/data/legalContent', bucket: 'Legal voice' },
  { prefix: 'src/components/SauceStudio', bucket: 'Workshop voice' },
  { prefix: 'src/data/studioData', bucket: 'Workshop voice' },
  { prefix: 'src/pages/LabPage', bucket: 'Workshop voice' },
  { prefix: 'src/data/', bucket: 'Editorial reference voice' },
  { prefix: 'src/pages/LegalPage', bucket: 'Legal voice' },
  { prefix: 'src/pages/', bucket: 'Brand and UI voice' },
  { prefix: 'src/components/', bucket: 'Brand and UI voice' },
]

const wordingByFile = new Map()

for (const root of sourceRoots) {
  walkDirectory(path.join(repoRoot, root))
}

writeInventory()

function walkDirectory(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      walkDirectory(fullPath)
      continue
    }

    if (!extensions.has(path.extname(entry.name))) continue
    extractFromFile(fullPath)
  }
}

function extractFromFile(filePath) {
  const relativePath = path.relative(repoRoot, filePath).replaceAll(path.sep, '/')
  const contents = fs.readFileSync(filePath, 'utf8')
  const lines = contents.split(/\r?\n/)
  const entries = []

  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1
    const line = lines[index]

    const withoutInlineComment = line.replace(/\/\/.*$/, '')
    if (/^\s*import\b/.test(withoutInlineComment)) continue

    for (const match of withoutInlineComment.matchAll(/(['"`])((?:\\.|(?!\1).)*)\1/g)) {
      const raw = match[2]
      const text = normalizeText(raw)
      if (isCandidateWording(text, line)) {
        entries.push({ line: lineNumber, text })
      }
    }

    for (const match of withoutInlineComment.matchAll(/>([^<>{]+)</g)) {
      const text = normalizeText(match[1])
      if (isCandidateWording(text, line)) {
        entries.push({ line: lineNumber, text })
      }
    }
  }

  const deduped = dedupeEntries(entries)
  if (deduped.length) {
    wordingByFile.set(relativePath, deduped)
  }
}

function normalizeText(value) {
  return value
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isCandidateWording(text, sourceLine) {
  if (!text) return false
  if (!/[A-Za-z]/.test(text)) return false
  if (text.length < 2) return false
  if (text.includes('${')) return false
  if (/&&|\|\||=>/.test(text)) return false
  if (/[A-Za-z_]+\.[A-Za-z_]+/.test(text) && !/\.\.\./.test(text)) return false
  if (/^(use strict|module|true|false|null|undefined)$/i.test(text)) return false
  if (/^(div|span|section|article|button|footer|header|main|img|a|p|h[1-6])$/i.test(text)) return false
  if (/^(import|from|export|default|return|const|let|function|class)$/.test(text)) return false
  if (/^(px-|py-|mt-|mb-|ml-|mr-|gap-|grid|flex|block|inline|rounded|border|text-|bg-|w-|h-|min-|max-|space-y-|cursor-|sticky|overflow-|viewport-|panel|section-kicker|secondary-button|primary-button|context-link|source-link|mono-font|display-font|hero-copy|card-copy)/.test(text)) {
    return false
  }
  if (/^(https?:\/\/|\/|#|images\/|var\(--|rgba?\(|linear-gradient|\.\.\.|[A-Z_0-9-]+$)/.test(text)) return false
  if (/^[a-z0-9-]+\/[a-z0-9-]+$/i.test(text)) return false
  if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(text)) return false
  if (/^VITE_[A-Z0-9_]+$/.test(text)) return false
  if (/\b(px|py|text|bg|rounded|tracking|font|transition|flex|grid|gap|border|items-center|justify|hidden|block|sticky|top|left|right|bottom|uppercase)\b/.test(text)) {
    return false
  }
  if (/^[a-z0-9-]+$/.test(text) && !allowSingleToken(sourceLine, text)) return false
  if (/^[a-z-]+ [a-z-]+$/.test(text) && sourceLine.includes('className=')) return false
  if (/^(to|slug|href|src|alt|id|key|tone|image|labelStyleId|labelStyleName|status|item|className|type|role)$/.test(text)) {
    return false
  }
  if (/^(sm|md|lg|xl|2xl):/.test(text)) return false
  if (text.includes('import.meta.env')) return false
  if (/(className|to|href|src|key|tone|style|target|rel|aria-hidden|imagePosition)\s*=/.test(sourceLine)) {
    return false
  }
  if (/(^|\s)(className|to|href|src|key|tone|style|target|rel|image|imagePosition|path|slug|id):/.test(sourceLine)) {
    return false
  }
  if (!looksLikeCopyBearingLine(sourceLine, text)) return false

  return true
}

function looksLikeCopyBearingLine(sourceLine, text) {
  if (/>[^<]+</.test(sourceLine)) return true
  if (
    /(title|subtitle|summary|heroNote|body|copy|intro|heading|label|description|ctaLabel|actionLabel|kicker|contentType|cardAction|recognition|cuisine|lastUpdated|paragraphs|items|whyItMatters|bestFor|story|mood|role|notes|bestOn|profile|heatBand|region|name|city|value|language|kind|meta|placeholder|status|promptTone|prompt)\s*:/.test(
      sourceLine,
    )
  ) {
    return true
  }
  if (
    /(title|subtitle|summary|description|label|ctaLabel|actionLabel|kicker|alt|value)=/.test(sourceLine)
  ) {
    return true
  }
  if (/^\s*['"`]/.test(sourceLine)) return true
  if (/textContent|innerText/.test(sourceLine)) return true
  if (/\bsetStatus\(/.test(sourceLine)) return true
  if (/\bstatus\s*=/.test(sourceLine)) return true
  if (/\bstatus:\s*/.test(sourceLine)) return true
  if (/^\s*<Link\b/.test(sourceLine)) return true
  if (/^\s*<TextLink\b/.test(sourceLine)) return true
  return /^[A-Z]/.test(text)
}

function allowSingleToken(sourceLine, text) {
  if (/^\d+$/.test(text)) return false
  if (/^\s*['"`]/.test(sourceLine)) return true
  if (/>[^<]+</.test(sourceLine)) return true
  if (
    /(title|label|ctaLabel|actionLabel|kicker|contentType|cardAction|recognition|cuisine|name|city|language|kind|role|value|meta)\s*[:=]/.test(
      sourceLine,
    )
  ) {
    return true
  }
  return /^[A-Z]/.test(text)
}

function dedupeEntries(entries) {
  const seen = new Set()
  return entries.filter((entry) => {
    const key = `${entry.line}:${entry.text}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function resolveBucket(filePath) {
  const normalized = filePath.replaceAll(path.sep, '/')
  for (const rule of bucketRules) {
    if (normalized.startsWith(rule.prefix)) return rule.bucket
  }
  return 'Brand and UI voice'
}

function writeInventory() {
  const outputPath = path.join(repoRoot, 'docs', 'wording_inventory.md')
  const files = [...wordingByFile.keys()].sort()
  const bucketCounts = new Map()

  for (const file of files) {
    const bucket = resolveBucket(file)
    bucketCounts.set(bucket, (bucketCounts.get(bucket) ?? 0) + wordingByFile.get(file).length)
  }

  const lines = []
  lines.push('# HotPepperz Wording Inventory')
  lines.push('')
  lines.push('Generated from `src/pages`, `src/components`, and `src/data` using `scripts/extract-wording-audit.mjs`.')
  lines.push('')
  lines.push('## Coverage summary')
  lines.push('')
  lines.push(`- Files with wording: ${files.length}`)
  lines.push(
    `- Extracted wording entries: ${files.reduce((sum, file) => sum + wordingByFile.get(file).length, 0)}`,
  )
  lines.push(`- Voice buckets: ${[...bucketCounts.keys()].join(', ')}`)
  lines.push('')
  lines.push('## Bucket totals')
  lines.push('')

  for (const [bucket, count] of [...bucketCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push(`- ${bucket}: ${count}`)
  }

  lines.push('')
  lines.push('## Inventory')
  lines.push('')

  for (const file of files) {
    const entries = wordingByFile.get(file)
    lines.push(`### ${file}`)
    lines.push('')
    lines.push(`- Voice bucket: ${resolveBucket(file)}`)
    lines.push(`- Extracted entries: ${entries.length}`)
    lines.push('')
    for (const entry of entries) {
      lines.push(`- L${entry.line}: ${entry.text}`)
    }
    lines.push('')
  }

  fs.writeFileSync(outputPath, `${lines.join('\n')}\n`)
}
