import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import styleToObject from 'style-to-object'

interface PreviewProps {
  markdown: string
}

export default function Preview({ markdown }: PreviewProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Preview</h2>
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // This handler is added to properly handle inline styles
            span: ({ node, ...props }) => {
              if (props.style) {
                const style = styleToObject(props.style as string) || {}
                return <span {...props} style={style} />
              }
              return <span {...props} />
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

