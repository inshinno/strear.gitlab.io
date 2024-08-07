import React from 'react'

import Head from 'next/head'
import type { NextraThemeLayoutProps } from 'nextra'

import PageMap from './nav'
import styles from './styles.module.scss'

import themeConfig from '../theme.config'

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const { title, pageMap, route } = pageOpts

  return (
    <div className={[styles.body, themeConfig.bodyStyle].filter(n => n != null).join(' ')}>
      <Head>
        <title>{`${title} - ${themeConfig.siteTitle}`}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
      </Head>

      <header>
        <nav>
          {themeConfig.topBar}
        </nav>
        <h1><a href="/">{themeConfig.siteTitle} <span id="headerSubTitle">{themeConfig.siteSubTitle}</span></a></h1>
      </header>

      <nav id="side-bar">
        <div>
          <PageMap pageMap={pageMap} route={route} />
        </div>
      </nav>

      <article>
        {children}
      </article>

      <footer>
        {themeConfig.footer}
      </footer>
    </div>
  )
}