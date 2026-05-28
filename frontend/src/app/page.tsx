"use client";

// Importing the necessary modules 
import { useState } from "react";
import {
  CheckCircle,
  Circle,
  Plus,
  Sparkles,
  Shield,
  Zap,
  Layers,
  ArrowRight,
  Check,
  Star
} from "lucide-react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

// Types for our live demo widget
interface DemoTodo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Live Demo State
  const [todos, setTodos] = useState<DemoTodo[]>([
    { id: 1, text: "Launch next-gen landing page", completed: true },
    { id: 2, text: "Integrate database sync architectures", completed: false },
    { id: 3, text: "Review daily team workflow analytics", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }]);
    setInputValue("");
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden selection:bg-indigo-500/30">

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.5),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles size={14} /> The next generation task manager is here
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400 leading-[1.15]">
            Where productivity meets <span className="text-indigo-400 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text">seamless execution.</span>
          </h1>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
            Stop drowning in chaotic lists. Streamline your workflow, collaborate natively in real-time, and crush your daily objectives using our ultra-minimal framework.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group">
              Start Productive For Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#demo" className="w-full sm:w-auto border border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 text-slate-300 font-medium px-8 py-4 rounded-xl transition-all text-center">
              Try Interactive Widget
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-16 flex flex-col items-center gap-3">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Trusted by 40,000+ engineers, creators, and professionals</p>
          </div>
        </div>
      </section>

      {/* Interactive Live Preview Component Widget */}
      <section id="demo" className="py-16 bg-slate-900/30 border-y border-slate-900/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">See it in action right now</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">This isn&apos;t a static screenshot. Test drive the core interface mechanics below.</p>
          </div>

          {/* Core App Live Shell */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-xl mx-auto">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/40" />
                <span className="w-3 h-3 rounded-full bg-amber-500/40" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/40" />
              </div>
              <span className="text-xs font-mono text-slate-500">taskflow_dashboard.app</span>
              <div className="w-4" />
            </div>

            <div className="p-6">
              <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Test typing and adding a task..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm w-full text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-3.5 rounded-xl text-white transition-colors shrink-0">
                  <Plus size={18} />
                </button>
              </form>

              <div className="space-y-2">
                {todos.map(todo => (
                  <button
                    key={todo.id}
                    onClick={() => handleToggleTodo(todo.id)}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all ${todo.completed ? 'bg-slate-950/40 border-slate-950 text-slate-500 line-through' : 'bg-slate-950 border-slate-800/80 text-slate-200 hover:border-slate-700'
                      }`}
                  >
                    {todo.completed ? <CheckCircle size={18} className="text-indigo-500 shrink-0" /> : <Circle size={18} className="text-slate-600 shrink-0" />}
                    <span className="text-sm truncate">{todo.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Value Proposition Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Engineered for high-output performers.</h2>
          <p className="mt-4 text-slate-400">Everything you need to handle complex project management timelines without the cognitive overhead.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 hover:border-slate-800 transition-all group">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold mt-5 text-white">Sub-millisecond Latency</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Instantly synchronized state pipelines mean you never wait on spinning loaders. Work natively at the velocity of thought.
            </p>
          </div>
          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 hover:border-slate-800 transition-all group">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Layers size={22} />
            </div>
            <h3 className="text-lg font-bold mt-5 text-white">Dynamic Context Layers</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Nest complex tracking dependencies inside clean filters. View everything globally or parse out single workflows instantly.
            </p>
          </div>
          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 hover:border-slate-800 transition-all group">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Shield size={22} />
            </div>
            <h3 className="text-lg font-bold mt-5 text-white">End-to-End Encryption</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Your data structures are explicitly localized and cryptographically signed. Keep your intellectual logs hidden away from scrapers.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section id="pricing" className="py-20 bg-slate-900/20 border-t border-slate-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, predictable structures.</h2>
          <p className="mt-4 text-slate-400">Scale up access effortlessly as your personal task requirements grow.</p>
        </div>

        <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-8 items-start">
          {/* Free Tier */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Core Engine</h4>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-4xl font-extrabold tracking-tight">$0</span>
                <span className="ml-1 text-xl text-slate-500">/ forever</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">Perfect configuration for foundational daily scheduling metrics.</p>

              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-2"><Check size={16} className="text-indigo-400" /> Unlimited standard local items</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-indigo-400" /> Complete layout filtering access</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-indigo-400" /> Native markdown tracking formatting</li>
              </ul>
            </div>
            <button className="mt-8 w-full border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-white py-3 rounded-xl font-medium text-sm transition-all">
              Access Core
            </button>
          </div>

          {/* Premium Tier */}
          <div className="bg-slate-900/60 border-2 border-indigo-500/80 rounded-2xl p-8 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-4 bg-indigo-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">Most Popular</span>
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-indigo-400">Elite Account</h4>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-4xl font-extrabold tracking-tight">$4</span>
                <span className="ml-1 text-xl text-slate-500">/ mo</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">Built out entirely for power users demanding cross-device scaling.</p>

              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-2"><Check size={16} className="text-indigo-400" /> Cloud database infrastructure syncing</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-indigo-400" /> Automated calendar calendar integrations</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-indigo-400" /> Deep productivity data graphs</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-indigo-400" /> Premium priority user technical support</li>
              </ul>
            </div>
            <button className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-xl shadow-indigo-600/30">
              Upgrade to Elite
            </button>
          </div>
        </div>
      </section>

      {/* Ultimate Bottom Conversion CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to take control of your time?</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of high performers using TaskFlow to convert ideas directly into systematic task completions.
          </p>
          <button className="mt-8 bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl inline-flex items-center gap-2 text-sm sm:text-base">
            Get Started Instantly
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}