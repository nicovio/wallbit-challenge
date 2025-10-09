// eslint.config.cjs

// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginSvelte from 'eslint-plugin-svelte'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import globals from 'globals'
import svelteConfig from './svelte.config.js'

export default [
  js.configs.recommended,
  ...tsEslint.configs.strict,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      semi: ['error', 'never'],
      indent: ['warn', 2],
      'no-extra-parens': 'warn',
      'no-nested-ternary': 'error',
      'linebreak-style': 'off',
      'no-cond-assign': ['error', 'always'],
      'no-console': 'warn',
      '@typescript-eslint/sort-type-constituents': 'error'
    }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: tsEslint.parser,
        svelteFeatures: {
          experimentalGenerics: true,
        },
        svelteConfig,
      },
    },
  },
  {
    rules: {
      'svelte/no-target-blank': 'error',
      'svelte/no-at-debug-tags': 'error',
      'svelte/no-reactive-functions': 'error',
      'svelte/no-reactive-literals': 'error',
      'svelte/no-navigation-without-resolve': 'off',
      '@/semi': ['error', 'never'],
      '@/quotes': ['warn', 'single'],
      '@/indent': ['warn', 2],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
]
