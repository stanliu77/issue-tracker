"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from 'classnames';

const Navbar = () => {
  const navlist = [
    {name:"Dashboard",href:"/"},
    {name:"Issues",href:"/issues"}
  ]
  const currentPath = usePathname()
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {navlist.map(nav=><Link id={nav.href} href={nav.href} 
        className= {classNames({
          "text-zinc-500": currentPath !== nav.href,
          "text-zinc-900": currentPath === nav.href,
          "hover:text-zinc-800 transition-colors":true
        })}
        >{nav.name}</Link>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
