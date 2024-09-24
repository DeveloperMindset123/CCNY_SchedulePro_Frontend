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
  /*
  EXPO_PUBLIC_KEY: z.string().url(),
  EXPO_PUBLIC_SECRET_KEY: z.string().url().optional(),
  EXPO_PUBLIC_PROJECT_URL: z.string().url().optional(),
  EXPO_PUBLIC_JWT_SECRET: z.string().url().optional(),
  EXPO_PUBLIC_SUPABASE_DATABASE_PASSWORD: z.string().url().optional(),
  EXPO_PUBLIC_HCAPTCHA_SITE_KEY: z.string().url().optional(),
  EXPO_PUBLIC_HCAPTCHA_SECRET: z.string().url().optional(),
  EXPO_PUBLIC_RESEND_API_KEY: z.string().url().optional(), */
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
