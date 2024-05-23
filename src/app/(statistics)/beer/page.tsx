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
    <div className="flex h-screen w-screen select-none flex-col items-center gap-2 overflow-y-auto">
      <p>Beer</p>
      {
        //<Form />
        session && <BeerForm session={session as Session} />
      }
      <div className="flex size-full flex-col px-2">
        <h2 className="mx-auto font-serif text-xl font-semibold">Log</h2>
        <div className="border-border flex justify-between border-b-2">
          <p className="border-border w-full border-l-2 pl-2">Date</p>
        </div>
        {beerdata?.map((data) => {
          const date = new Date(data.created_at);
          return (
            <div className="flex justify-between">
              <p className="w-1/2 overflow-hidden">{data.product_name}</p>
              <p className="border-border w-full border-l-2 pl-2 italic">
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
