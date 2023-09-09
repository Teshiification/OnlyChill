import './globals.css';
import Link from 'next/link';
import LogoutButton from '@ui/LogoutButton';
import NextJsLogo from '@ui/NextJsLogo';
import { getUser } from '../lib/database';

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
  const user = await getUser();

  return (
    <html lang="en">
      <body className="min-h-screen w-screen overflow-x-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center select-none">
        <nav className="w-full flex justify-center border-b border-gray-800 h-16">
          <div className="w-full flex justify-between items-center p-3 text-sm">
            <Link href="/" className="font-semibold text-lg font-serif italic">
              OnlyChill
            </Link>
            <NextJsLogo />
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
      </body>
    </html>
  );
}
