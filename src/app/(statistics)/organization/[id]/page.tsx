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
    <div className="flex flex-col gap-6 w-screen h-screen items-center select-none overflow-y-auto">
      <div>
        <h1 className="mt-4 px-2 text-center text-2xl font-semibold font-serif border-b-2 border-tremor-brand-subtle rounded">
          {organization?.name}
        </h1>
        <h2 className="text-xs italic opacity-40">{organization?.id}</h2>
      </div>

      <div className="w-full h-full flex flex-col px-2">
        <h2 className="text-xl font-semibold font-serif mx-auto mt-10 mb-4">
          Log
        </h2>
        <table>
          <tr className="border-b-2 border-tremor-brand-subtle">
            <th>User-ID</th>
            <th>Type</th>
            <th>Product</th>
            <th>Date / Time</th>
          </tr>
          {activity_statistics?.map((data) => {
            const date = new Date(data.created_at);
            return (
              <tr className="text-center border-b-2 border-tremor-brand-subtle/60 pl-2">
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
