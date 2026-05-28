"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react";

// Creating the register component 
const Register = () => {
    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle Form Submission
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Basic Client-side Validation
        if (!name || !email || !password) {
            setError("Please fill out all fields.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);

        // Simulate backend API request delay
        setTimeout(() => {
            setIsLoading(false);
            // Logic for redirecting or saving state goes here
            alert("Registration successful! (Demo state achieved)");
        }, 1500);
    };

    // Rendering the jsx component
    return (
        <Fragment>
            {/* Adding the navbar component */}
            <Navbar />

            <div className="bg-slate-950 text-slate-100 antialiased flex flex-col justify-center relative overflow-hidden selection:bg-indigo-500/30 pt-28 pb-30">
                {/* Decorative Radial Background Light */}

                <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">

                    <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        Create your space
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Already using TaskFlow?{" "}
                        <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4">
                            Sign in to account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10 mb-10">
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">

                        {/* Error Alert Display */}
                        {error && (
                            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs sm:text-sm text-rose-400">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-5">
                            {/* Full Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <User size={18} />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Alex Mercer"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email Address Input */}
                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500/40 focus:ring-offset-slate-950"
                                    />
                                </div>
                                <div className="ml-3 text-xs sm:text-sm">
                                    <label htmlFor="terms" className="text-slate-400">
                                        I accept the{" "}
                                        <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a>
                                        {" "}and{" "}
                                        <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>.
                                    </label>
                                </div>
                            </div>

                            {/* Main Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 group text-sm"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Alternative Auth Dividers */}
                        <div className="mt-6 relative flex items-center justify-center">
                            <div className="absolute w-full border-t border-slate-800/80" />
                            <span className="relative bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-500 font-medium">
                                Or continue with
                            </span>
                        </div>

                        {/* Social Sign Up buttons */}
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950 text-slate-300 py-2.5 rounded-xl text-sm transition-all">
                                <span>Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950 text-slate-300 py-2.5 rounded-xl text-sm transition-all">
                                <span>GitHub</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Adding the footer component */}
            <Footer />
        </Fragment>
    );
}

// Exporting the register component
export default Register;