"use client";

import { links } from "@/const/const";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" container py-4 px-4 md:py-6 md:px-8 flex justify-between items-center  z-100 justify-self-center backdrop-blur-[90%] ">
      
      {/* Logo */}
      <Link href="/" className="text-xl md:text-3xl font-bold ">
        <Image alt="logo" src="/logo.png" width={500} height={500} className="w-30 md:w-12" />
      </Link>

      {/* <nav className="hidden lg:flex space-x-8">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="text-xl hover:text-red-950 transition"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col w-8 h-5 md:h-8  justify-between items-center text-[#888888]"
        >
          <span
            className={`block h-px md:h-1 w-full bg-[#888888] transition-all duration-300
            ${isOpen ? "rotate-45 translate-y-3" : ""}`}
          />
          <span
            className={`block h-px md:h-1 w-full bg-[#888888] transition-all duration-300
            ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px md:h-1 w-full bg-[#888888] transition-all duration-300
            ${isOpen ? "-rotate-45 -translate-y-3" : ""}`}
          />
        </button>
      </div>

      <nav
        className={`absolute top-full left-0 w-full bg-black/40 backdrop-blur-2xl border-t border-white/10
                    flex flex-col items-center gap-6 py-6 lg:hidden transition-all duration-300
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="text-xl text-white hover:text-red-950 transition"
            onClick={() => setIsOpen(false)} // close menu on click
          >
            {link.name}
          </Link>
        ))}
      </nav> */}
    </header>
  );
}
