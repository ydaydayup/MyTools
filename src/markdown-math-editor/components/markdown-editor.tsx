'use client'

import React, { useState } from 'react'
import Editor from './editor'
import Preview from './preview'
import 'katex/dist/katex.min.css'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Welcome to Markdown Math Editor\n\nEnter your markdown here. You can use LaTeX for math formulas:\n\n$$E = mc^2$$\n\nOr inline math like this: $a^2 + b^2 = c^2$')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Markdown Math Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Editor markdown={markdown} setMarkdown={setMarkdown} />
        <Preview markdown={markdown} />
      </div>
    </div>
  )
}

