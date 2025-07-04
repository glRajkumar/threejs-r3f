import { codeToHtml } from "shiki";

export async function highlightCode(code: string, language: string = "tsx") {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'dark-plus',
    transformers: [
      {
        pre(node) {
          node.properties["class"] = "no-scroll-bar"
        },
      },
    ],
  })

  return html
}
