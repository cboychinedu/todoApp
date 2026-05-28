// Importing the necessary modules 
import { Fragment } from "react";

// Creating the footer component 
const Footer = () => {
    // Rendering the jsx component 
    return (
        <Fragment>
            <footer className="border-t border-slate-900 py-12 bg-slate-950 text-center text-xs text-slate-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© {new Date().getFullYear()} TaskFlow Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

// Exporting the Footer component
export default Footer;