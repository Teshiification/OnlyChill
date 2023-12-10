import './globals.css';
import Link from 'next/link';
import LogoutButton from '@ui/LogoutButton';
import NextJsLogo from '@ui/NextJsLogo';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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
      <body className="h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center select-none">
        <nav className="w-full flex justify-center border-b border-gray-800 h-16">
          <div className="w-full flex justify-between items-center p-3 text-sm">
            <Link href="/" className="font-semibold text-lg font-serif italic">
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
                className="py-2 px-4 rounded-md no-underline bg-tremor-brand hover:bg-tremor-brand-subtle"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        <main className="w-full h-full">{children}</main>
        <div className="absolute bottom-4 font-semibold flex flex-row justify-around w-full border-2 border-tremor-brand-subtle rounded-md">
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
