import React from 'react'

import Head from 'next/head'
import Link from 'next/link'
import type { NextraThemeLayoutProps, PageOpts } from 'nextra'

import 'normalize.css'

import PageMap from './nav'
import styles from './styles.module.scss'

import themeConfig from '../theme.config'

export type BarType = React.ReactNode | React.FC<{ pageOpts: PageOpts }>

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const { title, pageMap, route } = pageOpts

  const renderBar = (val: BarType): React.ReactNode => (
    typeof val === 'function' ? val({ pageOpts }) : val
  )

  return (
    <div className={[styles.body, themeConfig.bodyStyle].filter(n => n != null).join(' ')}>
      <Head>
        <title>{`${title} - ${themeConfig.siteTitle}`}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
      </Head>

      <header>
        <nav>
          {renderBar(themeConfig.topBar)}
        </nav>
        <h1><Link href="/">{themeConfig.siteTitle} <span id="headerSubTitle">{themeConfig.siteSubTitle}</span></Link></h1>
      </header>

      <nav id="side-bar">
        <div>
          <PageMap pageMap={pageMap} route={route} />
        </div>
      </nav>

      <article>
        {children}
        {renderBar(themeConfig.afterMain)}
      </article>

      <footer>
        {renderBar(themeConfig.footer)}
      </footer>
    </div>
  )
}