'use client'
import TiptapEditor from '@/components/tiptap-editor'
import {useCallback} from "react";
import _ from "lodash";

export default function Home() {
    const debouncedSave = useCallback(
        _.debounce(({editor, transaction}) => {
            console.log("save tip tap event")
            console.log({transaction})
            const html = editor.getHTML();
            console.log({
                html
            })
        }, 2000)
        ,
        [], // 仅在初次渲染调用
    );
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tiptap Editor with LaTeX Support</h1>
            <TiptapEditor onUpdateCallback={debouncedSave}/>
        </main>
    )
}

