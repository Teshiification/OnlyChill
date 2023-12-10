import Statistics from '@/components/ui/Statistics/Statistics';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

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
          <div className="flex flex-col items-center gap-4 mt-8 w-full">
            <h1 className="font-bold text-2xl">Hey Buddy!</h1>

            <h2 className="text-xl text-justify p-4">
              Save your statistics and play with your friends online via
              OnlyChill.
            </h2>

            <div>
              <h2 className="text-xl italic font-serif">Current Features</h2>
              <table className="border-2 border-tremor-brand-subtle rounded-md p-2">
                <tr className="border-b-2 border-tremor-brand-subtle">
                  <th>Type</th>
                  <th className="border-l-2 border-tremor-brand-subtle">
                    Name
                  </th>
                </tr>
                <tr>
                  <td className="px-2">Statistics</td>
                  <td className="px-2 border-l-2 border-tremor-brand-subtle">
                    Drinking Beer, Smoking Shisha
                  </td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
