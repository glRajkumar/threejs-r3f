import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type props = {
  lang: string
  code: string
}

function CodeBlocker({ lang, code }: props) {
  return (
    <SyntaxHighlighter
      language={lang}
      style={vscDarkPlus}
    >
      {code}
    </SyntaxHighlighter>
  )
}

export default CodeBlocker
