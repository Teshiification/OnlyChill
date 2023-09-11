import Statistics from '@/components/ui/Statistics/Statistics';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col w-screen h-screen items-center select-none overflow-y-auto">
      <div className="w-full h-full flex flex-col px-2">
        {user ? (
          <>
            <Statistics />
          </>
        ) : (
          <div>Your place to chill</div>
        )}
      </div>
    </div>
  );
}
