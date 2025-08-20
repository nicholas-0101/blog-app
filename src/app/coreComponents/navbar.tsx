"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAccountStore } from "@/lib/store/accountStore";
import Link from "next/link";
import axios from "axios";

function Navbar() {
  const account = useAccountStore((state) => state.account);
  const setAccount = useAccountStore((state) => state.setAccount);
  const signOut = useAccountStore((state) => state.signOut);
  const pathname = usePathname();

  //dropdown menu if we click username
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Click outside to close dropdown (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // keep login
  const keeplogin = async () => {
    try {
      if (localStorage.getItem("tkn")) {
        const result = await axios.get(`http://localhost:4400/auth/keep`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });
        console.log(result.data);

        setAccount(result.data.user); // menyimpan data ke global state zustand
        localStorage.setItem("tkn", result.data.user.token); // menyimpan data id ke localStorage untuk nanti keeplogin
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keeplogin();
  }, []);

  // list of routes where navbar should be hidden
  const hiddenRoutes = ["/signin", "/signup", "/verify", "/pre-verify"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="fixed w-full top-0 flex items-center justify-between px-8 py-4 bg-white border border-neutral-300 z-50">
      <div className="text-2xl font-bold text-black">BlogPlatform</div>

      <nav className="hidden md:flex gap-10 text-lg text-gray-700">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link
          href={account?.email ? "/write" : "/signin"}
          className="hover:underline"
        >
          Write
        </Link>
        <Link href="/explore" className="hover:underline">
          Explore
        </Link>
      </nav>

      <div className="hidden md:block">
        {account?.email ? (
          <div className="relative" ref={menuRef}>
            <Button onClick={() => setMenuOpen(!menuOpen)} variant="link">
              <p className="font-black font-sans text-[#18182b]">{`Hello, ${account.username}`}</p>
            </Button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-30 bg-white border border-gray-300 rounded z-50">
                <Link href={"/account-manager"}>
                  <Button
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#18182b]"
                    variant="ghost"
                  >
                    Account
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-[#910101]"
                  variant="ghost"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 font-sans">
            <Link href="/signin" className="w-full">
              <Button
                variant="outline"
                className="text-black font-bold w-20 rounded-lg bg-transparent hover:bg-[#ffffff66] cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button
                variant="default"
                className="bg-black text-white hover:bg-neutral-700 hover:text-white w-20 rounded-lg cursor-pointer"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
