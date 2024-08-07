import React from 'react'

import Link from 'next/link'
import type { PageMapItem } from 'nextra'

import { getNavigatorName, showInListing } from './dir_listing/lib.mjs'

type PageMapProps = {
  pageMap: PageMapItem[]
  route: string
}

export default function PageMap({ pageMap, route }: PageMapProps) {
  return <ul>
    {pageMap.map(item => {
      if (item.kind === 'Folder') {
        const active = route.startsWith(item.route)
        const link = <Link href={item.route}>{' '}{getNavigatorName(item.name)}{'/'}</Link>

        if (active) {
          return (
            <React.Fragment key={item.name}>
              <li>{'»'}<i>{link}</i></li>
              {item.children.length > 0 ? <li><PageMap pageMap={item.children} route={route} /></li> : <></>}
            </React.Fragment>
          )
        } else {
          return (
            <li key={item.name}>{'›'}{link}</li>
          )
        }
      } else if (item.kind === 'MdxPage') {
        if (item.name === 'index' || !showInListing(item.name)) {
          return null
        }

        const active = route.startsWith(item.route)
        const link = <Link href={item.route}>{' '}{getNavigatorName(item.name)}</Link>

        if (active) {
          return (
            <li key={item.name}>{'»'}<i>{link}</i></li>
          )
        } else {
          return (
            <li key={item.name}>{'›'}{link}</li>
          )
        }
      }

      return null
    })}
  </ul>
}