"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from 'classnames';
import { Box } from '@radix-ui/themes';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const navlist = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues/list" }
  ]
  const currentPath = usePathname()
  return (
    <nav className='flex justify-between border-b mb-5 px-5 h-14 items-center'>
      <div className='flex space-x-6'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {navlist.map(nav => <li key={nav.name}><Link key={nav.href} href={nav.href}
          className={classNames({
            "text-zinc-500": currentPath !== nav.href,
            "text-zinc-900": currentPath === nav.href,
            "hover:text-zinc-800 transition-colors": true
          })}
        >{nav.name}</Link></li>
        )}
      </ul>
      </div>
      <Box className='ml-auto mr-4'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Box>
    </nav>
  )
}

export default Navbar
