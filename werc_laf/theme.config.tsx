import React from 'react'

import styles from './styles.module.scss'

export default {
  siteTitle: 'ac',
  siteSubTitle: '<|',
  bodyStyle: styles.body,
  topBar: <>
    {/* Left */}
    <div></div>

    {/* Right */}
    <div>
      <a href="https://gitlab.com/strear/strear.gitlab.io">gitlab</a>{' . '}
      <a href="https://strear.cc">strear.cc</a>
    </div>
  </>,
  footer: <>
    <br />

    <div style={{ marginRight: 'auto' }}>
      <a href="https://nextra.site/">powered by nextra</a>{' . '}
      <a href="https://werc.cat-v.org/">werc theme</a>
    </div>
  </>,
}