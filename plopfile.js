export default function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: (value) => {
          if (!value) return 'Component name is required'
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Component name must be PascalCase (e.g., MyComponent)'
          }
          return true
        },
      },
      {
        type: 'list',
        name: 'location',
        message: 'Where should this component be created?',
        choices: ['shared/components', 'feature-specific'],
      },
      {
        type: 'input',
        name: 'feature',
        message: 'Feature name (e.g., auth, dashboard):',
        when: (answers) => answers.location === 'feature-specific',
        validate: (value) => {
          if (!value) return 'Feature name is required'
          if (!/^[a-z][a-zA-Z]*$/.test(value)) {
            return 'Feature name must be camelCase (e.g., myFeature)'
          }
          return true
        },
      },
      {
        type: 'confirm',
        name: 'withTests',
        message: 'Include test file?',
        default: true,
      },
    ],
    actions: (data) => {
      const basePath = data.location === 'shared/components' 
        ? 'src/shared/components' 
        : `src/features/${data.feature}/components`
      
      const actions = [
        {
          type: 'add',
          path: `${basePath}/{{name}}.tsx`,
          templateFile: 'plop-templates/component.hbs',
        },
      ]

      if (data.withTests) {
        actions.push({
          type: 'add',
          path: `${basePath}/__tests__/{{name}}.test.tsx`,
          templateFile: 'plop-templates/component.test.hbs',
        })
      }

      return actions
    },
  })

  // Feature generator
  plop.setGenerator('feature', {
    description: 'Create a new feature module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name (camelCase):',
        validate: (value) => {
          if (!value) return 'Feature name is required'
          if (!/^[a-z][a-zA-Z]*$/.test(value)) {
            return 'Feature name must be camelCase (e.g., userProfile)'
          }
          return true
        },
      },
      {
        type: 'input',
        name: 'displayName',
        message: 'Feature display name:',
        default: (answers) => {
          return answers.name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
        },
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'What modules do you need?',
        choices: [
          { name: 'Pages/Routes', value: 'pages', checked: true },
          { name: 'Components', value: 'components', checked: true },
          { name: 'Hooks', value: 'hooks' },
          { name: 'Store (Zustand)', value: 'store' },
          { name: 'API layer', value: 'api' },
          { name: 'Types', value: 'types' },
        ],
      },
    ],
    actions: (data) => {
      const actions = []
      const basePath = `src/features/${data.name}`

      // Create directories
      data.modules.forEach((module) => {
        actions.push({
          type: 'add',
          path: `${basePath}/${module}/.gitkeep`,
          template: '',
        })
      })

      // Create main page if pages module is selected
      if (data.modules.includes('pages')) {
        actions.push({
          type: 'add',
          path: `${basePath}/pages/{{properCase name}}.tsx`,
          templateFile: 'plop-templates/feature-page.hbs',
        })
      }

      // Create store if store module is selected
      if (data.modules.includes('store')) {
        actions.push({
          type: 'add',
          path: `${basePath}/store/{{name}}Store.ts`,
          templateFile: 'plop-templates/feature-store.hbs',
        })
      }

      // Create API if api module is selected
      if (data.modules.includes('api')) {
        actions.push({
          type: 'add',
          path: `${basePath}/api/{{name}}Api.ts`,
          templateFile: 'plop-templates/feature-api.hbs',
        })
      }

      // Create types if types module is selected
      if (data.modules.includes('types')) {
        actions.push({
          type: 'add',
          path: `${basePath}/types/index.ts`,
          templateFile: 'plop-templates/feature-types.hbs',
        })
      }

      // Create index file
      actions.push({
        type: 'add',
        path: `${basePath}/index.ts`,
        templateFile: 'plop-templates/feature-index.hbs',
      })

      return actions
    },
  })

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a custom React hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix):',
        validate: (value) => {
          if (!value) return 'Hook name is required'
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Hook name must be PascalCase (e.g., LocalStorage)'
          }
          return true
        },
      },
      {
        type: 'list',
        name: 'location',
        message: 'Where should this hook be created?',
        choices: ['shared/hooks', 'feature-specific'],
      },
      {
        type: 'input',
        name: 'feature',
        message: 'Feature name:',
        when: (answers) => answers.location === 'feature-specific',
        validate: (value) => {
          if (!value) return 'Feature name is required'
          return true
        },
      },
    ],
    actions: (data) => {
      const basePath = data.location === 'shared/hooks' 
        ? 'src/shared/hooks' 
        : `src/features/${data.feature}/hooks`
      
      return [
        {
          type: 'add',
          path: `${basePath}/use{{name}}.ts`,
          templateFile: 'plop-templates/hook.hbs',
        },
      ]
    },
  })
}