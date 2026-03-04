import nextConfig from 'eslint-config-next'
import prettierConfig from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextConfig,
  // Disable formatting rules that conflict with Prettier
  prettierConfig,
]

export default config
