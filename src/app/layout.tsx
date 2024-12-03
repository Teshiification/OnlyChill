// layout.tsx
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import { NavTools } from '@/components/ui/nav-tools';
import { cn } from '@/lib/utils';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { UserProvider } from '@/lib/providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'OnlyChill',
  description: 'Your personal statistics'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background text-foreground min-h-screen w-screen overflow-x-hidden font-sans antialiased ',
          'scrollbar scrollbar-track-primary scrollbar-thumb-secondary scrollbar-thumb-rounded-full',
          fontSans.variable
        )}
      >
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Theme>
              <NavTools />
              <div className="bg-background relative flex min-h-full select-none flex-col">
                {children}
              </div>
            </Theme>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
