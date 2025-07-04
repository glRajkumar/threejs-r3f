import { createElement } from 'react';
import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

import CodeBlock from './components/ui/code-block';

type TableProps = {
  data: {
    headers: string[]
    rows: (string | number)[][]
  }
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))

  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

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

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  function Heading({ children }: readOnlychild) {
    const slug = slugify(children as string)
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}

const customComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Table,
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