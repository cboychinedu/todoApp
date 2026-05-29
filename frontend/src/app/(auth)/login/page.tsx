// Using client-side rendering for this page 
"use client";

// Importing the necessary modules 
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { LoginInterface } from "@/components/interfaces/loginInterface";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

// Creating the Login component
const Login = () => {
    // Setting the router 
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Setting the alert state 
    const [alertDisplay, setAlert] = useState({
        show: false,
        message: "",
        type: ""
    })

    // Form State
    const [credentials, setCredentials] = useState<LoginInterface>({
        email: "",
        password: ""
    });

    // Creating a function for handling the change on input forms 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Setting the credentials 
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    // Handle Form Submission
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    };

    // Rendering the login component 
    return (
        <Fragment>
            {/* Adding the navbar component */}
            <Navbar />

            <div className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col justify-center relative overflow-hidden selection:bg-indigo-500/30">
                <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
                    <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        New to TaskFlow?{" "}
                        <Link href="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4">
                            Create an account free
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">

                        {/* Error Alert Display */}
                        {error && (
                            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs sm:text-sm text-rose-400">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignIn} className="space-y-5">
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
                                        // value={credentials.email}
                                        // onChange={(e) => setLoginData({...credentials, email: e.target.value})}
                                        placeholder="name@example.com"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        // value={credentials.password}
                                        // onChange={(e) => setLoginData({...credentials, password: e.target.value})}
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

                            {/* Remember Me Checkbox */}
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500/40 focus:ring-offset-slate-950"
                                />
                                <label htmlFor="remember-me" className="ml-3 text-xs sm:text-sm text-slate-400 select-none cursor-pointer">
                                    Remember my session
                                </label>
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
                                        Sign In
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

                    </div>
                </div>
            </div>

            {/* Adding the footer component */}
            <Footer />
        </Fragment>
    );
}

// Exporting the login component 
export default Login; 