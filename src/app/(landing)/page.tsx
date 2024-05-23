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
    <div className="flex size-full select-none flex-col items-center overflow-y-auto">
      <div className="flex size-full flex-col px-2">
        {user ? (
          <>
            <Statistics />
          </>
        ) : (
          <div className="mt-8 flex w-full flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Hey Buddy!</h1>

            <h2 className="p-4 text-justify text-xl">
              Save your statistics and play with your friends online via
              OnlyChill.
            </h2>

            <div>
              <h2 className="font-serif text-xl italic">Current Features</h2>
              <table className="border-border rounded-md border-2 p-2">
                <tr className="border-border border-b-2">
                  <th>Type</th>
                  <th className="border-border border-l-2">Name</th>
                </tr>
                <tr>
                  <td className="px-2">Statistics</td>
                  <td className="border-border border-l-2 px-2">
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
