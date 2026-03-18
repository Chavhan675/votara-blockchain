"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../context/AuthContext"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar(){

  const { user, logout } = useAuth()

  const [mobileOpen,setMobileOpen] = useState(false)
  const [loginOpen,setLoginOpen] = useState(false)

  const pathname = usePathname()
  const dropdownRef = useRef()

  // Close login dropdown when clicking outside
  useEffect(()=>{

    function handleClick(e){
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setLoginOpen(false)
      }
    }

    document.addEventListener("mousedown",handleClick)

    return ()=>document.removeEventListener("mousedown",handleClick)

  },[])

  const navLink = (href,label)=>(
    <Link
      href={href}
      className={`hover:text-blue-200 transition ${
        pathname === href ? "text-yellow-300 font-semibold" : ""
      }`}
      onClick={()=>setMobileOpen(false)}
    >
      {label}
    </Link>
  )

  return(

    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link href="/" className="text-xl font-bold tracking-wide">
          Votara
        </Link>


        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-6">

          {navLink("/","Home")}
          {navLink("/candidates","Candidates")}
          {navLink("/results","Results")}
          {navLink("/help","Help")}
          {navLink("/about","About")}


          {/* Login dropdown */}

          {!user && (

            <div className="relative" ref={dropdownRef}>

              <button
                onClick={()=>setLoginOpen(!loginOpen)}
                className="flex items-center gap-1 hover:text-blue-200"
              >
                Login <ChevronDown size={16}/>
              </button>

              {loginOpen && (

                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">

                  <Link
                    href="/auth/login?role=voter"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login as Voter
                  </Link>

                  <Link
                    href="/auth/login?role=admin"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login as Admin
                  </Link>

                </div>

              )}

            </div>

          )}


          {/* Register */}

          {!user && (

            <Link
              href="/auth/register"
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Register
            </Link>

          )}


          {/* Voter menu */}

          {user?.role === "voter" && (

            <>

              <Link
                href="/voter/dashboard"
                className="flex items-center gap-1 hover:text-blue-200"
              >
                <User size={18}/> Dashboard
              </Link>

              {navLink("/voter/profile","Profile")}

              <Link
                href="/voter/vote"
                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Vote
              </Link>

            </>

          )}


          {/* Admin menu */}

          {user?.role === "admin" && (

            <>

              {navLink("/admin/dashboard","Admin Dashboard")}
              {navLink("/admin/election","Manage Elections")}

            </>

          )}


          {/* Logout */}

          {user && (

            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>

          )}

        </div>


        {/* Mobile button */}

        <button
          onClick={()=>setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>

      </div>


      {/* Mobile Menu */}

      {mobileOpen && (

        <div className="md:hidden bg-blue-800 px-6 pb-4 flex flex-col gap-4">

          {navLink("/","Home")}
          {navLink("/candidates","Candidates")}
          {navLink("/results","Results")}
          {navLink("/help","Help")}
          {navLink("/about","About")}

          {!user && (
            <>
              {navLink("/auth/login?role=voter","Login as Voter")}
              {navLink("/auth/login?role=admin","Login as Admin")}
              {navLink("/auth/register","Register")}
            </>
          )}

          {user?.role === "voter" && (
            <>
              {navLink("/voter/dashboard","Dashboard")}
              {navLink("/voter/profile","Profile")}
              {navLink("/voter/vote","Vote")}
            </>
          )}

          {user?.role === "admin" && (
            <>
              {navLink("/admin/dashboard","Admin Dashboard")}
              {navLink("/admin/election","Manage Elections")}
            </>
          )}

          {user && (

            <button
              onClick={logout}
              className="bg-red-600 px-3 py-2 rounded"
            >
              Logout
            </button>

          )}

        </div>

      )}

    </nav>

  )

}