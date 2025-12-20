import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    user: null, // Add user authentication here later
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;