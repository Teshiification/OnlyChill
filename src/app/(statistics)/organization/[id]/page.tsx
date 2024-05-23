import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const OrganizationPage = async (searchParams: any) => {
  const { id } = searchParams.params;

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: activity_statistics } = await supabase
    .from('activity_statistics')
    .select('*')
    .eq('organization_id', id);

  const { data: organization } = await supabase
    .from('organization')
    .select('id, name')
    .eq('id', id)
    .single();

  if (!user) redirect('login');

  return (
    <div className="flex h-screen w-screen select-none flex-col items-center gap-6 overflow-y-auto">
      <div>
        <h1 className="border-tremor-brand-subtle mt-4 rounded border-b-2 px-2 text-center font-serif text-2xl font-semibold">
          {organization?.name}
        </h1>
        <h2 className="text-xs italic opacity-40">{organization?.id}</h2>
      </div>

      <div className="flex size-full flex-col px-2">
        <h2 className="mx-auto mb-4 mt-10 font-serif text-xl font-semibold">
          Log
        </h2>
        <table>
          <tr className="border-tremor-brand-subtle border-b-2">
            <th>User-ID</th>
            <th>Type</th>
            <th>Product</th>
            <th>Date / Time</th>
          </tr>
          {activity_statistics?.map((data) => {
            const date = new Date(data.created_at);
            return (
              <tr className="border-tremor-brand-subtle/60 border-b-2 pl-2 text-center">
                <td>{`${data.user_id.substring(0, 8)}...`}</td>
                <td className="px-2">{data.activity_type}</td>
                <td className="px2">{data.product_name}</td>
                <td className="italic">
                  {`${date.toLocaleDateString()}\t${date.toLocaleTimeString()}`}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
export default OrganizationPage;
