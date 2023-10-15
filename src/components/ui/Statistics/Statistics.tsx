import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

const Statistics = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: shishadata } = await supabase
    .from('activity_statistics')
    .select('*')
    .eq('user_id', user?.id)
    .eq('activity_type', 'smoking shisha');
  const { data: beerdata } = await supabase
    .from('activity_statistics')
    .select('*')
    .eq('user_id', user?.id)
    .eq('activity_type', 'drinking beer');

  const { data: organizations, error } = await supabase
    .from('user_organization')
    .select(
      `
      *,
        organization (
          id,
          name
        )
      `
    )
    .eq('user_id', user?.id);

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-xl mx-auto py-4">
        Personal Statistics
      </h1>
      <div className="flex flex-col md:flex-row gap-4 border-2 border-slate-500 p-2 rounded-md">
        <Item
          name={'Shisha'}
          amount={shishadata?.length || 0}
          link={'shisha'}
        />
        <Item name={'Beer'} amount={beerdata?.length || 0} link={'beer'} />
      </div>
      <h1 className="font-semibold text-xl mx-auto py-4">
        Organization Statistics
      </h1>
      <div className="flex flex-col md:flex-row gap-4 border-2 border-slate-500 p-2 rounded-md">
        {organizations ? (
          organizations?.map((item) => {
            console.log(item);
            return (
              <Item
                name={item?.organization.name}
                link={'organization/' + item?.organization_id}
              />
            );
          })
        ) : (
          <p>... no organizations</p>
        )}
      </div>
    </div>
  );
};

export interface ItemProps {
  name: string;
  amount?: number;
  link?: string;
  img?: string;
}
export const Item = async (props: ItemProps) => {
  const { name, amount, img, link } = props;
  return (
    <Link
      className="group relative flex flex-col bg-blue-900 text-slate-100 w-full md:w-40 h-40 rounded-md overflow-hidden hover:cursor-pointer"
      href={`${link}` || '#'}
    >
      <div className="flex flex-col p-2 my-auto mx-auto items-center">
        <p className="font-semibold text-xl">{name}</p>
        {amount && <p className="font-semibold italic">{amount}x</p>}
      </div>
      <img
        className="blur-sm absolute w-full h-full opacity-20 object-cover group-hover:scale-105 trasform ease-in-out duration-300"
        src={
          img ||
          'https://media.istockphoto.com/id/1284193221/de/foto/einzelhandelslager-voller-regale-mit-waren-in-kartons-arbeiter-scannen-und-sortieren-pakete.jpg?s=1024x1024&w=is&k=20&c=-XBEZxHPQmF-Lvt9q8c8j9xuEldquirL9y6P7OLn4ms='
        }
      />
    </Link>
  );
};

export default Statistics;
