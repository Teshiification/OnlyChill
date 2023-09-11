import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const user = null;

  if (!user) redirect('login');
  return (
    <div className="flex flex-col w-screen h-screen items-center select-none overflow-y-auto">
      <div className="w-full h-full flex flex-col px-2">
        <div>Entdecken Sie neue Reiseziele.</div>
      </div>
    </div>
  );
}
