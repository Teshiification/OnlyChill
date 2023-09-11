import Form from '@/components/ui/Forms/Tabak/Form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: shishadata } = await supabase
    .from('statistics_shisha')
    .select('*')
    .eq('user', user?.id);

  if (!user) redirect('login');

  return (
    <div className="flex flex-col gap-2 w-screen h-screen items-center select-none overflow-y-auto">
      <p>Shisha Tabak</p>
      {
        //<Form />
      }
      <div className="w-full h-full flex flex-col px-2">
        <h2 className="text-xl font-semibold font-serif mx-auto">Log</h2>
        <div className="flex justify-between border-b-2 border-tremor-brand-subtle">
          <p className="w-1/4">Name</p>
          <p className="border-l-2 border-tremor-brand-subtle pl-2 w-full">
            Date
          </p>
        </div>
        {shishadata?.map((data) => {
          const date = new Date(data.created_at);
          return (
            <div className="flex justify-between">
              <p className="w-1/4">{data.name}</p>
              <p className="border-l-2 border-tremor-brand-subtle pl-2 w-full italic">
                {`${date.toLocaleDateString()}\t${date.toLocaleTimeString()}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
