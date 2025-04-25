"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../public/logo.svg"; // Ensure this path is correct
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
  const pathname = usePathname(); // Get the current route

  const { status, data: session } = useSession();

  return (
    <nav className="h-[80px] bg-black flex items-center px-4">
      <div className="container m-auto grid grid-cols-4 gap-4">
        <div>
          <Image src={Logo} alt="Logo" width={240} />
        </div>
        <div className="text-[#efefef] flex justify-start items-center col-span-3">
          <ul className="flex space-x-14">
            <li className="flex justify-start items-center">
              <Link
                className={`text-[25px] ${pathname === "/" ? "text-[#bdb577] font-bold" : "text-gray-600"}`}
                href="/"
              >
                <IoMdHome />
              </Link>
            </li>
            <li className={`flex justify-start items-center ${pathname === "/about" ? "font-bold text-[#bdb577]" : ""}`}>
              <Link href="/about">About</Link>
            </li>
            <li className={`flex justify-start items-center ${pathname === "/portfolio" ? "font-bold text-[#bdb577]" : ""}`}>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li className={`flex justify-start items-center ${pathname === "/users" ? "font-bold text-[#bdb577]" : ""}`}>
              <Link href="/users">Users</Link>
            </li>
            <li className={`flex justify-start items-center ${pathname === "/contact" ? "font-bold text-[#bdb577]" : ""}`}>
              <Link href="/contact">Contact</Link>
            </li>
            <li className={`flex justify-start items-center ${pathname === "/admin" ? "font-bold text-[#bdb577]" : ""}`}>
              <Link href="/admin">Admin</Link>
            </li>
            {status === 'loading' && <div>Loading...</div>}

            {status === 'authenticated' &&
              <li className={`flex justify-start items-center ${pathname === "/admin" ? "font-bold text-[#bdb577]" : ""}`}>
                <div>
                  {session.user!.name}
                  <Link href="/api/auth/signout">Logout</Link>
                </div>
              </li>}

            {status === 'unauthenticated' &&
              <li className={`flex justify-start items-center ${pathname === "/admin" ? "font-bold text-[#bdb577]" : ""}`}>
                <Link href="/api/auth/signin">Login</Link>
              </li>}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
