/**
 * Markdown to Tistory-compatible HTML converter
 * Preserves KaTeX equations ($...$ and $$...$$) and code blocks (<pre><code class="language-...">)
 */
const fs = require('fs');
const path = require('path');

function convertMarkdownToTistoryHtml(markdownText) {
  let lines = markdownText.split('\n');
  let html = [];
  let inCodeBlock = false;
  let codeLang = '';
  let codeLines = [];
  let inBlockquote = false;

  for (let line of lines) {
    // Code block check
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        const escapedCode = codeLines.join('\n')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        html.push(`<pre class="line-numbers"><code class="language-${codeLang || 'c'}">${escapedCode}</code></pre>`);
        inCodeBlock = false;
        codeLines = [];
        codeLang = '';
      } else {
        inCodeBlock = true;
        codeLang = line.trim().replace(/^```/, '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    function formatInline(text) {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const bqContent = formatInline(line.replace(/^>\s*/, ''));
      html.push(`<blockquote>${bqContent}</blockquote>`);
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      html.push(`<h1>${formatInline(line.substring(2))}</h1>`);
    } else if (line.startsWith('## ')) {
      html.push(`<h2>${formatInline(line.substring(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      html.push(`<h3>${formatInline(line.substring(4))}</h3>`);
    } else if (line.startsWith('#### ')) {
      html.push(`<h4>${formatInline(line.substring(5))}</h4>`);
    } else if (line.trim().startsWith('---')) {
      html.push(`<hr />`);
    } else if (line.trim().startsWith('- ')) {
      html.push(`<ul><li>${formatInline(line.trim().substring(2))}</li></ul>`);
    } else if (line.trim().match(/^\d+\.\s/)) {
      html.push(`<ol><li>${formatInline(line.trim().replace(/^\d+\.\s/, ''))}</li></ol>`);
    } else if (line.trim().length === 0) {
      // Empty line
      html.push('<p><br /></p>');
    } else {
      // Normal paragraph
      html.push(`<p>${formatInline(line)}</p>`);
    }
  }

  return html.join('\n');
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetFile = args[0] || path.join(__dirname, '../posts/01_welcome_and_roadmap.md');
  if (fs.existsSync(targetFile)) {
    const md = fs.readFileSync(targetFile, 'utf8');
    const outHtml = convertMarkdownToTistoryHtml(md);
    const outFile = targetFile.replace(/\.md$/, '.html');
    fs.writeFileSync(outFile, outHtml, 'utf8');
    console.log(`[Success] Converted ${targetFile} -> ${outFile}`);
  } else {
    console.error(`[Error] File not found: ${targetFile}`);
  }
}

module.exports = { convertMarkdownToTistoryHtml };
