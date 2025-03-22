import React from 'react'

import Giscus from '@giscus/react'
import Link from 'next/link'
import type { PageOpts } from 'nextra'

import styles from './styles.module.scss'

const GitLabEditLink = ({ repo, filePath, children }) => (
  <Link href={`https://gitlab.com/${repo}/-/blob/main/${filePath}?plain=1`}>{children}</Link>
)

const ArticleMeta = ({ pageOpts }: { pageOpts: PageOpts }) => {
  const [showComments, setShowComments] = React.useState(false)

  return <>
    <p>
      <GitLabEditLink repo="strear/strear.gitlab.io" filePath={pageOpts.filePath}>
        edit
      </GitLabEditLink>
      {' . '}
      <Link
        role="button"
        href="https://github.com/strear/strear.gitlab.io/discussions"
        onClick={(e) => {
          e.preventDefault()
          setShowComments(val => !val)
        }}
      >
        talk
      </Link>
    </p>

    {
      showComments &&
      <p>
        <Giscus
          repo="strear/strear.gitlab.io"
          repoId="R_kgDOMgk8-w"
          category="Ideas"
          categoryId="DIC_kwDOMgk8-84Ch5oQ"
          mapping="specific"
          strict="0"
          term={`Comments on ${pageOpts.filePath}`}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="light"
          lang="en"
          loading="lazy"
        />
      </p>
    }
  </>
}

export default {
  siteTitle: 'ac',
  siteSubTitle: 'say yes to world',
  bodyStyle: styles.body,

  topBar: <>
    {/* Left */}
    <div>
    </div>

    {/* Right */}
    <div>
      <Link href="https://strear.cc">strear.cc</Link>
    </div>
  </>,

  afterMain: ArticleMeta,

  footer: <>
    <br />

    <div style={{ marginRight: 'auto' }}>
      <Link href="https://nextra.site/">powered by nextra</Link>{' . '}
      <Link href="https://werc.cat-v.org/">werc theme</Link>
    </div>
  </>,
}