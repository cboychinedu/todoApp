// Importing the necessary modules 
import Link from "next/link";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { CheckCircle, Menu, X } from 'lucide-react';
import Cookies from "js-cookie";

// Creating the Navbar component 
const Navbar = () => {
    // Setting the router object 
    const router = useRouter();

    // Setting the state for mobile menu open/close 
    const [mounted, setMounted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Using use effect 
    useEffect(() => {
        // Mounting the component 
        setMounted(true);

        // Getting the user's token from the cookies storage 
        const userToken = Cookie.get("todoAppToken");

        // If the user token is present 
        if (userToken) {
            // Using try, catch block to decode the user token 
            try {
                // Deocode the token 
                const decodedToken: any = jwtDecode(userToken);

                // Checking if the token is valid by comparing the current time with the token's expiration time
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsLoggedIn(true);
                } else {
                    // If the token is expired, remove it from cookies and set isLoggedIn to false
                    Cookie.remove("todoAppToken");
                    setIsLoggedIn(false);
                }
            }

            // Catching the error if the token is invalid and removing it from the cookies 
            catch (error: any) {
                // Log the error to the console 
                console.log("Error decoding token:", error);

                // Removing the invalid token from cookies 
                Cookie.remove("todoAppToken");

                // Setting isLoggedIn to false 
                setIsLoggedIn(false);
            }
        }
    }, []);

    // Creating a function for handling the logout function 
    const handleLogout = () => {
        // Remotve the user token 
        Cookies.remove('todoAppToken');

        // Wait for 1 second and redirect the user to the home page 
        setTimeout(() => router.push("/login"), 1000);
    }

    // Don't render anything until mounted to prevent hydration mismatch 
    if (!mounted) return null;

    // Rendering the jsx component 
    return (
        <nav className="sticky top-0 w-full z-50 bg-slate-950 border-b border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <CheckCircle size={18} className="text-white" />
                    </div>
                    Task<span className="text-indigo-400">Flow</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
                    <Link href="/#demo" className="hover:text-white transition-colors">Live Demo</Link>
                    <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard">
                                <button> Dashboard </button>
                            </Link>
                            <Link href="#">
                                <button
                                    onClick={handleLogout}
                                    className="text-sm bg-red-800/55 hover:bg-red-950 text-white font-medium px-4 py-3 rounded-xl transition-all shadow-lg"
                                >
                                    Logout
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</button>
                            </Link>
                            <Link href="/register">
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                                    Get Started Free
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-950 border-b border-slate-900 px-4 pt-2 pb-6 space-y-4 flex flex-col">
                    <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white py-2 text-base">Features</Link>
                    <Link href="/#demo" onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white py-2 text-base">Live Demo</Link>
                    <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white py-2 text-base">Pricing</Link>
                    <hr className="border-slate-900" />
                    <Link href="/login">
                        <button className="text-slate-300 hover:text-white text-left py-2">Login</button>
                    </Link>
                    <Link href="/register">
                        <button className="bg-indigo-600 text-white font-medium py-2.5 rounded-xl text-center w-full">Get Started Free</button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

// Exporting the Navbar component
export default Navbar;

