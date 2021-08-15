const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTM = require('next-transpile-modules')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports =
  (withPlugins(
    [
      withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
      withTM([])
    ],
    { reactStrictMode: true }
  ),
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching
    }
  }))
