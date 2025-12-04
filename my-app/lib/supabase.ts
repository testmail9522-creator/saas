import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,     // ✅ THIS FIXES REFRESH LOGOUT
      autoRefreshToken: true,   // ✅ keeps user logged in
      detectSessionInUrl: true,
    },
  }
);
