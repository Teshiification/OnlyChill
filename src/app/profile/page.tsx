import { getUser } from '@/lib/database';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const user = await getUser();

  return (
    <div className="flex flex-col w-screen h-screen items-center select-none overflow-y-auto">
      <div className="w-full h-full flex flex-col px-2">
        {user ? (
          <>
            {
              //@ts-ignore
              <TicketCarousel tickets={tickets || []} />
            }
          </>
        ) : (
          <div>Entdecken Sie neue Reiseziele.</div>
        )}
      </div>
    </div>
  );
}
