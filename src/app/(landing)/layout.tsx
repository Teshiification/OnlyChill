import LogoutButton from '@/components/ui/LogoutButton';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <body className="size-full">
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
              className="bg-background hover:bg-background rounded-md px-4 py-2 no-underline"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <main className="size-full">{children}</main>
      <div className="absolute bottom-4 flex w-full flex-row justify-around rounded-md font-semibold">
        <Link href="/impressum">Impressum</Link>
      </div>
    </body>
  );
}
