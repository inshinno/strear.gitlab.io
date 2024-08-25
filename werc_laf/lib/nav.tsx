import React from 'react'

import Link from 'next/link'
import type { MetaJsonFile, PageMapItem } from 'nextra'

import { getNavigatorName, showInListing } from './dir_listing/lib.mjs'

type PageMapProps = {
  pageMap: PageMapItem[]
  route: string
}

function checkoutName(n: string, meta: MetaJsonFile['data']) {
  if (n in meta) {
    const m = meta[n]
    if (typeof m === 'string') {
      return m
    }
    if (typeof m.title === 'string') {
      return m.title
    }
  }
  return getNavigatorName(n)
}

function renderItem(item: PageMapItem, route: string, meta: MetaJsonFile['data']) {
  if (item.kind === 'Folder') {
    const active = route.startsWith(item.route)
    const text = checkoutName(item.name, meta)

    if (active) {
      return (
        <React.Fragment key={item.name}>
          <li><Link href={item.route}>{'»'}<i>{' '}{text}{'/'}</i></Link></li>
          {item.children.length > 0 ? <li><PageMap pageMap={item.children} route={route} /></li> : <></>}
        </React.Fragment>
      )
    } else {
      return (
        <li key={item.name}><Link href={item.route}>{'›'}{' '}{text}{'/'}</Link></li>
      )
    }
  }

  if (item.kind === 'MdxPage') {
    if (item.name === 'index' || !showInListing(item.name)) {
      return null
    }

    const active = route.startsWith(item.route)
    const text = checkoutName(item.name, meta)

    if (active) {
      return (
        <li key={item.name}><Link href={item.route}>{'»'}<i>{' '}{text}</i></Link></li>
      )
    } else {
      return (
        <li key={item.name}><Link href={item.route}>{'›'}{' '}{text}</Link></li>
      )
    }
  }

  return null
}

export default function PageMap({ pageMap, route }: PageMapProps) {
  const metaArray = pageMap.flatMap(item => item.kind === 'Meta' ? [item] : [])
  const itemArray = pageMap.flatMap(item => item.kind === 'Meta' ? [] : [item])

  const meta = metaArray.map(item => item.data).reduce((prev, cur) => ({...prev, ...cur}), {})

  const res = (
    Object.fromEntries(Object.keys(meta).map(key => [key, null])) as
    Record<string, React.JSX.Element | null>
  )

  for (const [key, obj] of Object.entries(meta)) {
    if (typeof obj === 'object' && typeof obj.href === 'string') {
      const newWindow = Boolean(obj.newWindow)
      const linkProps = newWindow ? { target: '_blank', rel: 'noreferrer' } : {}
      const text = obj.title ?? key

      res[key] = <li key={key}><Link href={obj.href} {...linkProps}>{'-'}{' '}{text}</Link></li>
    }
  }

  for (const item of itemArray) {
    res[item.name] = renderItem(item, route, meta)
  }

  return <ul>{Object.values(res)}</ul>
}