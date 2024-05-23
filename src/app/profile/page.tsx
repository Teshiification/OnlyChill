import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const user = null;

  if (!user) redirect('login');
  return (
    <div className="flex h-screen w-screen select-none flex-col items-center overflow-y-auto">
      <div className="flex size-full flex-col px-2">
        <div>Entdecken Sie neue Reiseziele.</div>
      </div>
    </div>
  );
}
