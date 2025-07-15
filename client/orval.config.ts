import { defineConfig } from 'orval';

export default defineConfig({
  app: {
    input: {
      target: 'http://localhost:3000/api-docs-json',
    },
    output: {
      target: './api/__generated__/api.ts',
      schemas: './api/__generated__/types',
      client: 'axios',
    }
  },
});
