import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  // Full default FSD rule set (forbidden-imports + public-api stay strict: dependency
  // direction violations and deep imports are errors).
  ...fsd.configs.recommended,

  {
    // Project-requirements exceptions:
    // - `widgets/users-table` and `widgets/winners` are explicitly mandated widget
    //   slices by the project spec (Steiger suggests merging single-use slices,
    //   which would break the required structure).
    // - `app/providers` is the mandated app-layer DI registration point.
    files: [
      './src/widgets/users-table/**',
      './src/widgets/winners/**',
      './src/app/providers/**',
    ],
    rules: {
      'fsd/insignificant-slice': 'off',
      'fsd/segments-by-purpose': 'off',
    },
  },
])
