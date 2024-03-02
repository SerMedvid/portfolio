/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
      config.module.rules.push({
        "test": /\.(glsl|vs|fs|vert|frag)$/,
        "exclude": /node_modules/,
        "use": ["raw-loader"]
      })
   
      return config
    },
}

const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.ts'
  );

module.exports = withNextIntl(nextConfig)
