import { useState, useEffect } from 'react';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from '@lexical/html';
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ThemeDefault from "./theme/theme";
import "./styles/styles.css";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: "Rich Text Lexical in Nextjs",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ThemeDefault,
};

function HtmlPreviewPlugin() {
  const [editor] = useLexicalComposerContext();
  const [html, setHtml] = useState('');

  useEffect(() => {
    const updateHtml = () => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor);
        setHtml(htmlString);
      });
    };

    editor.registerUpdateListener(updateHtml);
    updateHtml(); // Initial update

    return () => {
      editor.registerUpdateListener(updateHtml);
    };
  }, [editor]);

  return (
    <div 
      className="html-preview p-5 rounded-md min-h-[200px] bg-transparent text-black border border-zinc-200 dark:text-white dark:bg-stone-900 dark:border-zinc-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function RichTextLexical() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="container items-center grid grid-cols-2 gap-8 h-full">
        <div className="rounded-md bg-transparent border border-zinc-200 dark:bg-stone-900 dark:border-zinc-700">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input text-black dark:text-white" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
        <HtmlPreviewPlugin />
      </div>
    </LexicalComposer>
  );
}
