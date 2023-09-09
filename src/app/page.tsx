import Statistics from '@/components/ui/Statistics/Statistics';
import { getStatisticsShisha, getUser, supabase } from '../lib/database';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const user = await getUser();
  const shishadata = await getStatisticsShisha();

  return (
    <div className="flex flex-col w-screen h-screen items-center select-none overflow-y-auto">
      <div className="w-full h-full flex flex-col px-2">
        {user ? (
          <>
            <div>
              {shishadata?.map((entry, key) => {
                return <p className="text-red-500">I</p>;
              })}
            </div>
            <Statistics />
          </>
        ) : (
          <div>Your place to chill</div>
        )}
      </div>
    </div>
  );
}
