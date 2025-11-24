import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Devlien',
  description: 'Documentation for Devlien - A modern Node.js framework',
  ignoreDeadLinks: true,
  cleanUrls: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API Reference', link: '/api/overview' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        },
        {
          text: 'Fundamentals',
          items: [
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Routing', link: '/guide/routing' },
            { text: 'Middleware', link: '/guide/middleware' },
            { text: 'Controllers', link: '/guide/controllers' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Database', link: '/guide/database' },
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'Validation', link: '/guide/validation' },
            { text: 'Error Handling', link: '/guide/error-handling' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Core', link: '/api/core' },
            { text: 'Router', link: '/api/router' },
            { text: 'Request', link: '/api/request' },
            { text: 'Response', link: '/api/response' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/devlien' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    },

    search: {
      provider: 'local'
    }
  }
})
