/**
 * This file is used to load environment variables from a `.env` file and validate them using Zod.
 * It will throw an error if the environment variables are invalid.
 *
 */

import { TypeOf, z } from 'zod';

const schema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_REQRES_API_URL: z.string().url(),
  SEGMENT_KEY: z.string().url().optional(),
  JWT_ACCESS_SECRET: z.string().url().optional(),
  JWT_REFRESH_SECRET: z.string().url().optional(),
  MY_ENCRYPTION_KEY: z.string().url().optional(),
  MY_DECRYPTION_KEY: z.string().url().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.format(), null, 4)
  );
  process.exit?.(1);
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof schema> {}
  }
}
