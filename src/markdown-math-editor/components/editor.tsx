import React from 'react'
import { Textarea } from '@/components/ui/textarea'

interface EditorProps {
  markdown: string
  setMarkdown: (markdown: string) => void
}

export default function Editor({ markdown, setMarkdown }: EditorProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Editor</h2>
      <Textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="w-full h-[calc(100vh-200px)] font-mono"
        placeholder="Enter your markdown here..."
      />
    </div>
  )
}

