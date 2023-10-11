'use client';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createContext } from 'react';
import { cookies } from 'next/headers';
import { User } from 'next-auth';

export const UserContext = createContext<User | null>(null);

export async function UserProvider({ children }: any) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <UserContext.Provider value={user as User}>{children}</UserContext.Provider>
  );
}
