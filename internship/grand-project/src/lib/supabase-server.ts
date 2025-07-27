import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServerClient() {
  const cookieStore = cookies() // ✅ NO await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll().map(({ name, value }) => ({ name, value }))
        },
        async setAll(cookies: { name: string; value: string; options: CookieOptions }[]) {
          for (const cookie of cookies) {
            (await cookieStore).set(cookie)
          }
        },
      },
    }
  )
}