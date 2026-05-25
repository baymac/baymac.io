import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**', 'node_modules/**', '.next/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'components/**/*.{ts,tsx}',
        'hooks/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}',
        'scripts/**/*.js',
      ],
      exclude: ['**/*.module.css', '**/*.d.ts', 'tests/**'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['tests/unit/scripts/**/*.test.ts'],
          exclude: [
            'tests/unit/components/**',
            'tests/unit/hooks/**',
            'tests/unit/lib/**',
            'tests/unit/app/**',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'dom',
          environment: 'happy-dom',
          include: [
            'tests/unit/{components,hooks,lib,app}/**/*.test.{ts,tsx}',
            'tests/unit/*.test.{ts,tsx}',
          ],
          exclude: ['tests/unit/scripts/**'],
        },
      },
    ],
  },
});
