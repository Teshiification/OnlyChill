import '@/styles/globals.css';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LogoutButton from '@/components/ui/LogoutButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'OnlyChill',
  description: 'Your personal statistics'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body className="flex h-screen w-screen select-none flex-col items-center overflow-hidden bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <nav className="flex h-16 w-full justify-center border-b border-gray-800">
          <div className="flex w-full items-center justify-between p-3 text-sm">
            <Link href="/" className="font-serif text-lg font-semibold italic">
              OnlyChill
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user?.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-tremor-brand hover:bg-tremor-brand-subtle rounded-md px-4 py-2 no-underline"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        <main className="size-full">{children}</main>
        <div className="border-tremor-brand-subtle absolute bottom-4 flex w-full flex-row justify-around rounded-md border-2 font-semibold">
          <p>More is coming soon!</p>
          <p className="flex gap-1">
            <p className="text-tremor-brand-subtle">{'<Await>'}</p> is
            <p className="text-tremor-brand-subtle">{'<Promised>'}</p> !
          </p>
          <Link href="/impressum">Impressum</Link>
        </div>
      </body>
    </html>
  );
}
