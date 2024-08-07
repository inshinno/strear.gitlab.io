const withNextra = require('nextra')({
  theme: './werc_laf/lib/theme.tsx',
  latex: true
})

module.exports = withNextra({
  output: 'export',
  images: {
    unoptimized: true
  }
})
