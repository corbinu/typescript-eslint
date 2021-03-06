/**
 * @fileoverview Disallows the use of custom TypeScript modules and namespaces.
 * @author Patricio Trevino
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-namespace'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: '@corbinu/typescript-eslint-parser'
});

ruleTester.run('no-namespace', rule, {
  valid: [
    'declare global { }',
    "declare module 'foo' { }",
    {
      code: 'declare module foo { }',
      options: [{ allowDeclarations: true }]
    },
    {
      code: 'declare namespace foo { }',
      options: [{ allowDeclarations: true }]
    },
    {
      filename: 'test.d.ts',
      code: 'namespace foo { }',
      options: [{ allowDefinitionFiles: true }]
    },
    {
      filename: 'test.d.ts',
      code: 'module foo { }',
      options: [{ allowDefinitionFiles: true }]
    }
  ],
  invalid: [
    {
      code: 'module foo {}',
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'namespace foo {}',
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'module foo {}',
      options: [{ allowDeclarations: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'namespace foo {}',
      options: [{ allowDeclarations: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'declare module foo { }',
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'declare namespace foo { }',
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'declare module foo {}',
      options: [{ allowDeclarations: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'declare namespace foo {}',
      options: [{ allowDeclarations: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      filename: 'test.d.ts',
      code: 'namespace foo { }',
      options: [{ allowDefinitionFiles: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      filename: 'test.d.ts',
      code: 'module foo { }',
      options: [{ allowDefinitionFiles: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      filename: 'test.d.ts',
      code: 'declare module foo {}',
      options: [{ allowDefinitionFiles: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      filename: 'test.d.ts',
      code: 'declare namespace foo {}',
      options: [{ allowDefinitionFiles: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: 'namespace Foo.Bar {}',
      options: [{ allowDeclarations: false }],
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 1
        }
      ]
    },
    {
      code: `
                namespace Foo.Bar {
                    namespace Baz.Bas {
                        interface X {}
                    }
                }
            `,
      errors: [
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 1,
          column: 17
        },
        {
          messageId: 'moduleSyntaxIsPreferred',
          row: 2,
          column: 21
        }
      ]
    }
  ]
});
