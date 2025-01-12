'use client'
import './styles.scss'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Button} from "@/components/ui/button"
import {Bold, Italic, List, ListOrdered} from 'lucide-react'
import 'katex/dist/katex.min.css'
import {Mathematics} from '@/components/tiptap-pro/extension-mathematics'
// import { Mathematics } from '@tiptap-pro/extension-mathematics'
// import {*} from "@tiptap/pm/state"
// Note: Mathematics extension is a Pro feature and requires a subscription
// For demonstration, we'll show how to set up the basic editor structure
export default function TiptapEditor({onUpdateCallback}: { onUpdateCallback?: Function }) {


    const editor = useEditor({
        shouldRerenderOnTransaction: true,
        extensions: [
            StarterKit,
            Mathematics,
        ],

        onUpdate({editor, transaction}) {
            if (!onUpdateCallback) {
                return
            }
            onUpdateCallback({editor, transaction})

            // 下边请求接口
        },
        content: `
     <h1>
        This editor supports $\\LaTeX$ math expressions.
      </h1>
      <p>
        Did you know that $3 * 3 = 9$? Isn't that crazy? Also Pythagoras' theorem is $a^2 + b^2 = c^2$.<br />
        Also the square root of 2 is $\\sqrt{2}$. If you want to know more about $\\LaTeX$ visit <a href="https://katex.org/docs/supported.html" target="_blank">katex.org</a>.
      </p>
      <code>
        <pre>$\\LaTeX$</pre>
      </code>
      <p>
        Do you want go deeper? Here is a list of all supported functions:
      </p>
      <ul>
        <li>$\\sin(x)$</li>
        <li>$\\cos(x)$</li>
        <li>$\\tan(x)$</li>
        <li>$\\log(x)$</li>
        <li>$\\ln(x)$</li>
        <li>$\\sqrt{x}$</li>
        <li>$\\sum_{i=0}^n x_i$</li>
        <li>$\\int_a^b x^2 dx$</li>
        <li>$\\frac{1}{x}$</li>
        <li>$\\binom{n}{k}$</li>
        <li>$\\sqrt[n]{x}$</li>
        <li>$\\left(\\frac{1}{x}\\right)$</li>
        <li>$\\left\\{\\begin{matrix}x&\\text{if }x>0\\0&\\text{otherwise}\\end{matrix}\\right.$</li>
      </ul>
    `,

        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none max-w-none',
            },
        },
    })

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-lg">
            <div className="border-b p-2 bg-muted/50 flex gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-muted' : ''}
                >
                    <Bold className="h-4 w-4"/>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-muted' : ''}
                >
                    <Italic className="h-4 w-4"/>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    disabled={!editor.can().chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-muted' : ''}
                >
                    <List className="h-4 w-4"/>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-muted' : ''}
                >
                    <ListOrdered className="h-4 w-4"/>
                </Button>
            </div>
            <EditorContent editor={editor} className="p-4"/>
        </div>
    )
}

