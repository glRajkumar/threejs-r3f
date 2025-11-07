import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

import CodeBlock from './components/ui/code-block';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

function CustomLink({ href, ...props }: CustomLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a href={href} {...props} />
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}

interface RoundedImageProps extends ImageProps {
  alt: string
}

function RoundedImage(props: RoundedImageProps) {
  return <Image className="rounded-lg" {...props} />
}

const customComponents = {
  Image: RoundedImage,
  a: CustomLink,
  pre: ({ children }: readOnlychild) => <div className="overflow-x-auto">{children}</div>,
  code: ({ className, children }: { className?: string } & readOnlychild) => {
    const match = /language-(\w+)/.exec(className || '')

    if (match) {
      return (
        <CodeBlock
          className='[&_pre]:text-base [&_pre]:mt-0 [&_pre]:mb-1 [&_pre]:px-5 [&_pre]:py-2.5 [&_pre]:rounded-md'
          content={String(children).replace(/\n$/, '')}
          fileName={match?.[1]}
        />
      )
    }

    return <code className={className}>{children}</code>
  }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  }
}