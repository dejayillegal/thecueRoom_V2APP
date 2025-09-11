declare const Deno: {
  env: { get(key: string): string | undefined };
  test: (name: string, fn: () => void | Promise<void>) => void;
};

interface ImportMeta {
  main?: boolean;
}

declare module "https://deno.land/std@0.203.0/http/server.ts" {
  export function serve(
    handler: (req: Request) => Response | Promise<Response>,
  ): void;
}

declare module "std/testing/asserts.ts" {
  export function assertEquals<T>(actual: T, expected: T, message?: string): void;
}

declare module "npm:@supabase/supabase-js@2.42.0" {
  export function createClient(url: string, key: string): SupabaseClient;
  export interface SupabaseClient {
    from: (table: string) => QueryBuilder;
    [key: string]: unknown;
  }
  export interface QueryBuilder {
    select: (columns?: string) => QueryBuilder;
    insert: (data: unknown) => QueryBuilder;
    upsert: (data: unknown, options?: { onConflict: string }) => QueryBuilder;
    eq: (column: string, value: unknown) => QueryBuilder;
    [key: string]: unknown;
  }
}

declare module "npm:fast-xml-parser@4.2.7" {
  export class XMLParser {
    constructor(opts?: unknown);
    parse(xml: string): Record<string, unknown>;
  }
}
