import BeerForm from '@/components/ui/Forms/Beer/Form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const BeerPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: beerdata } = await supabase
    .from('activity_statistics')
    .select('*')
    .eq('user_id', user?.id)
    .eq('activity_type', 'drinking beer');

  if (!user) redirect('login');

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <div className="flex flex-col gap-2 w-screen h-screen items-center select-none overflow-y-auto">
      <p>Beer</p>
      {
        //<Form />
        session && <BeerForm session={session as Session} />
      }
      <div className="w-full h-full flex flex-col px-2">
        <h2 className="text-xl font-semibold font-serif mx-auto">Log</h2>
        <div className="flex justify-between border-b-2 border-tremor-brand-subtle">
          <p className="border-l-2 border-tremor-brand-subtle pl-2 w-full">
            Date
          </p>
        </div>
        {beerdata?.map((data) => {
          const date = new Date(data.created_at);
          return (
            <div className="flex justify-between">
              <p className="w-1/2 overflow-hidden">{data.product_name}</p>
              <p className="border-l-2 border-tremor-brand-subtle pl-2 w-full italic">
                {`${date.toLocaleDateString()}\t${date.toLocaleTimeString()}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BeerPage;
