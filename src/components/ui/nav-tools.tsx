'use client';

import {
  GithubIcon,
  GripVerticalIcon,
  HomeIcon,
  LinkedinIcon
} from 'lucide-react';
import Link from 'next/link';

import { Button } from './button';
import { ThemeToggle } from './theme-toggle';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const NavTools = () => {
  return (
    <Popover
      className={
        'flex flex-col overflow-hidden rounded-lg transition-all duration-300 ease-in-out'
      }
    >
      <PopoverContent
        className={
          'flex w-fit flex-col items-center space-y-1 transition-all duration-300 ease-in-out'
        }
      >
        <Link href="/">
          <Button variant={'ghost'}>
            <HomeIcon className="size-4" />
          </Button>
        </Link>
        <ThemeToggle />
        <Link href="https://www.github.com/Teshiification">
          <Button variant={'ghost'}>
            <GithubIcon className="size-4" />
          </Button>
        </Link>
        <Link href="https://www.linkedin.com/in/danny-sinicco/">
          <Button variant={'ghost'}>
            <LinkedinIcon className="size-4" />
          </Button>
        </Link>
      </PopoverContent>
      <PopoverTrigger className="fixed bottom-8 right-8 z-50">
        <Button variant={'default'}>
          <GripVerticalIcon className="size-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};
