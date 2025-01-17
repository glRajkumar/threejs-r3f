import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import CodeBlocker from './code-blocker';

type props = {
  markdown: string
}

function MarkdownBlocker({ markdown }: props) {
  return (
    <ReactMarkdown
      className="prose prose-invert prose-sm prose-pre:p-0 prose-pre:m-0 prose-th:bg-gray-900 prose-th:py-1 prose-th:px-2 prose-td:px-2"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <CodeBlocker
              lang={match[1] || "md"}
              code={String(children).replace(/\n$/, '')}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

export default MarkdownBlocker
