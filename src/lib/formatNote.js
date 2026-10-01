// Helper to format study notes into clean, rich HTML with interactive elements

export function formatMarkdownToHtml(text) {
  if (!text) return ''
  let out = text.trim()

  // 1. Concept Callouts: :::callout-concept::: ... :::
  out = out.replace(/:::callout-concept:::\s*([\s\S]*?):::/gi, (_, content) => {
    const cleanContent = content.trim().replace(/\n/g, '<br/>')
    return `<div class="callout-box concept"><div class="callout-header"><span class="callout-icon">💡</span><strong>Konsep Utama / Core Concept</strong></div><div class="callout-body">${cleanContent}</div></div>`
  })

  // 2. Alert blocks: [!TIP], [!EXAM], [!CONCEPT]
  out = out.replace(/\[!TIP\]\s*(.*?)(?=\n\n|$)/gis, '<div class="callout-box tip"><span class="callout-icon">💡</span><div>$1</div></div>')
  out = out.replace(/\[!EXAM\]\s*(.*?)(?=\n\n|$)/gis, '<div class="callout-box exam"><span class="callout-icon">⚠️</span><div>$1</div></div>')
  out = out.replace(/\[!CONCEPT\]\s*(.*?)(?=\n\n|$)/gis, '<div class="callout-box concept"><span class="callout-icon">📘</span><div>$1</div></div>')

  // 3. Markdown Tables: | col | col |
  if (out.includes('|---') || out.includes('| ---')) {
    const lines = out.split('\n')
    let inTable = false
    let isHeader = true
    let tableHtml = ''
    const newLines = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true
          isHeader = true
          tableHtml = '<div class="table-responsive"><table class="edu-table">'
        }
        if (line.includes('---')) {
          isHeader = false
          continue
        }
        const cells = line.split('|').slice(1, -1).map((c) => c.trim())
        const tag = isHeader ? 'th' : 'td'
        const row = '<tr>' + cells.map((c) => `<${tag}>${formatInline(c)}</${tag}>`).join('') + '</tr>'
        if (isHeader) {
          tableHtml += '<thead>' + row + '</thead><tbody>'
        } else {
          tableHtml += row
        }
      } else {
        if (inTable) {
          inTable = false
          tableHtml += '</tbody></table></div>'
          newLines.push(tableHtml)
          tableHtml = ''
        }
        newLines.push(lines[i])
      }
    }
    if (inTable) {
      tableHtml += '</tbody></table></div>'
      newLines.push(tableHtml)
    }
    out = newLines.join('\n')
  }

  // 4. Sub-accordions in text (<details class="edu-accordion"...)
  out = out.replace(/<details class="edu-accordion"([^>]*)>/gi, '<details class="edu-sub-accordion"$1>')

  // 5. Parse bullet lists (* or -) and numbered lists (1. , 2. )
  const lines = out.split('\n')
  let inBullet = false
  let inNum = false
  const listLines = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const trimmed = raw.trim()
    const isBullet = /^[*-]\s+(.*)/.test(trimmed)
    const isNum = /^\d+\.\s+(.*)/.test(trimmed)

    if (isBullet) {
      if (inNum) { listLines.push('</ol>'); inNum = false }
      if (!inBullet) { inBullet = true; listLines.push('<ul class="edu-list">') }
      const match = trimmed.match(/^[*-]\s+(.*)/)
      listLines.push(`<li>${formatInline(match[1])}</li>`)
    } else if (isNum) {
      if (inBullet) { listLines.push('</ul>'); inBullet = false }
      if (!inNum) { inNum = true; listLines.push('<ol class="edu-num-list">') }
      const match = trimmed.match(/^\d+\.\s+(.*)/)
      listLines.push(`<li>${formatInline(match[1])}</li>`)
    } else {
      if (inBullet) { listLines.push('</ul>'); inBullet = false }
      if (inNum) { listLines.push('</ol>'); inNum = false }
      listLines.push(raw)
    }
  }
  if (inBullet) listLines.push('</ul>')
  if (inNum) listLines.push('</ol>')
  out = listLines.join('\n')

  // 6. Format headers ### and ##
  out = out.replace(/^### (.*$)/gim, '<h4 class="edu-h4">$1</h4>')
  out = out.replace(/^## (.*$)/gim, '<h3 class="edu-h3">$1</h3>')

  // 7. Inline formatting
  out = formatInline(out)

  // 8. Paragraphs
  const blocks = out.split(/\n\s*\n/)
  out = blocks
    .map((b) => {
      const tb = b.trim()
      if (!tb) return ''
      if (
        tb.startsWith('<div') ||
        tb.startsWith('<table') ||
        tb.startsWith('<ul') ||
        tb.startsWith('<ol') ||
        tb.startsWith('<details') ||
        tb.startsWith('<h')
      ) {
        return tb
      }
      return `<p class="edu-p">${tb.replace(/\n/g, '<br/>')}</p>`
    })
    .filter(Boolean)
    .join('\n')

  return out
}

function formatInline(str) {
  if (!str) return ''
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="edu-bold">$1</strong>')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="edu-italic">$1</em>')
}
