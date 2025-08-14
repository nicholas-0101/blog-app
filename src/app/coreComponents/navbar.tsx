// "use client";
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useAccountStore } from "@/lib/store/accountStore";
// import Link from "next/link";
// import { Card } from "@/components/ui/card";

// function Navbar() {
//   // difine signInHistory
//   const signInHistory = useAccountStore((state) => state.signInHistory);

//   // sign out (auto delete sign in history using zustand)
//   const account = useAccountStore((state) => state.account);
//   const signOut = useAccountStore((state) => state.signOut);

//   // to make dropdown menu if we click username
//   const [menuOpen, setMenuOpen] = useState(false);
//   // click outside to close menu
//   const menuRef = useRef(null);
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="fixed w-full top-0 flex items-center justify-between px-8 py-4 bg-white border border-neutral-300">
//       <div className="text-2xl font-bold flex items-center gap-2 text-black">
//         BlogPlatform
//       </div>
//       <nav className="hidden md:flex gap-10 text-lg text-gray-700">
//         <Link href="/" className="flex items-center gap-1 hover:underline">
//           Home
//         </Link>

//         {account ? (
//           <Link href="/write" className="flex items-center gap-1 hover:underline">
//             Write
//           </Link>
//         ) : (
//           <Link href="/signin" className="flex items-center gap-1 hover:underline">
//             Write
//           </Link>
//         )}

//         <Link href="/explore" className="flex items-center gap-1 hover:underline">
//           Explore
//         </Link>
//       </nav>

//       {account ? (
//         <div className="relative" ref={menuRef}>
//           <Button // make if we click username, shows dorpdown menu; menuRef uses for click outside to close dropdown
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-black font-medium"
//             variant={"link"}
//           >
//             <h5 className="text-black cursor-pointer">
//               {signInHistory.map((username, idx) => (
//                 <div key={idx}>{`Hello, ${username}`}</div>
//               ))}
//             </h5>
//           </Button>

//           {menuOpen && ( // dropdown menu if we click username
//             <div className="absolute right-0 mt-1 w-40 bg-white border border-neutral-300 rounded z-50">
//               <Button
//                 onClick={signOut}
//                 className="bg-white block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-400"
//               >
//                 Sign Out
//               </Button>
//               {/* <button
//                 onClick={signOut}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-black"
//               >
//                 //add another dropdown menu here
//               </button> */}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex items-center gap-3">
//           <a href="/signin">
//             <Button className="bg-white text-sm px-4 py-1.5 text-gray-600 hover:bg-gray-200" variant={"outline"}>
//               Sign In
//             </Button>
//           </a>
//           <a href="/signup">
//             <Button className="bg-black text-white text-sm px-4 py-1.5 rounded-md hover:bg-gray-700">
//               Sign Up
//             </Button>
//           </a>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;

"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/lib/store/accountStore";
import Link from "next/link";
import axios from "axios";

function Navbar() {
  const account = useAccountStore((state) => state.account);
  const setAccount = useAccountStore((state) => state.setAccount);
  const signOut = useAccountStore((state) => state.signOut);

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
      if (localStorage.getItem("id")) {
        const result = await axios.get(
          "https://upwardskin-us.backendless.app/api/data/accounts",
          {
            params: {
              where: `objectId='${localStorage.getItem("id")}'`,
            },
          }
        );

        setAccount(result.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keeplogin();
  }, []);
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
              <p className="font-black font-sans text-[#18182b]">{`Halo, ${account.username}`}</p>
            </Button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-30 bg-white border border-gray-300 rounded z-50">
                <Button
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-[#18182b]"
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
