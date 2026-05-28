"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, Trash2, Plus, ListTodo, ClipboardList } from "lucide-react";

// Define the structure of a To-Do item
interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoLandingPage() {
    // State management
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [mounted, setMounted] = useState(false);

    // Handle mounting to prevent hydration mismatch if using localStorage
    useEffect(() => {
        setMounted(true);
        const savedTodos = localStorage.getItem("next-todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Save to localStorage whenever todos change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("next-todos", JSON.stringify(todos));
        }
    }, [todos, mounted]);

    // Helper stats
    const completedCount = todos.filter((t) => t.completed).length;
    const totalCount = todos.length;
    const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Filtered todos to display
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    // Actions
    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: input.trim(),
            completed: false,
        };

        setTodos([newTodo, ...todos]);
        setInput("");
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    if (!mounted) return null; // Avoid hydration flash

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 flex flex-col justify-between">
            {/* Hero / Header Section */}
            <header className="max-w-4xl w-full mx-auto px-4 pt-12 pb-6 text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                    <ListTodo size={16} /> Next.js + Tailwind Productivity Hub
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-200">
                    Accomplish your goals, <br />
                    <span className="text-indigo-400">one task at a time.</span>
                </h1>
                <p className="mt-3 text-slate-400 max-w-md mx-auto text-base md:text-lg">
                    A minimalist, lightning-fast to-do application designed to keep you focused and organized.
                </p>
            </header>

            {/* Main Todo Interactive Dashboard */}
            <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-6">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden p-6 md:p-8">

                    {/* Progress Tracker */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center text-sm font-medium mb-2">
                            <span className="text-slate-400">Task Progress</span>
                            <span className="text-indigo-400">{completedCount} of {totalCount} completed ({completionPercentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Form Input */}
                    <form onSubmit={addTodo} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="What needs to be done today?"
                            className="flex-grow bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium px-5 rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0 shadow-lg shadow-indigo-600/20"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Add Task</span>
                        </button>
                    </form>

                    {/* Filter Tabs */}
                    <div className="flex border-b border-slate-700/60 mb-4 gap-2 text-sm">
                        {(["all", "active", "completed"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`pb-3 px-2 capitalize font-medium transition-colors relative ${filter === type ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
                                    }`}
                            >
                                {type}
                                {filter === type && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Todo List Area */}
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group ${todo.completed
                                        ? "bg-slate-900/40 border-slate-800/60 text-slate-500"
                                        : "bg-slate-900/70 border-slate-700/50 text-slate-200 hover:border-slate-600"
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className="flex items-center gap-3 text-left flex-grow transition-colors"
                                    >
                                        {todo.completed ? (
                                            <CheckCircle className="text-emerald-500 shrink-0" size={21} />
                                        ) : (
                                            <Circle className="text-slate-500 group-hover:text-indigo-400 shrink-0" size={21} />
                                        )}
                                        <span className={`text-sm md:text-base break-all ${todo.completed ? "line-through text-slate-500" : ""}`}>
                                            {todo.text}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        aria-label="Delete todo"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-slate-500 flex flex-col items-center justify-center gap-3">
                                <ClipboardList size={40} className="text-slate-600 stroke-[1.5]" />
                                <p className="text-sm">No tasks found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="text-center py-8 text-xs text-slate-500 border-t border-slate-800/40 bg-slate-950/20 backdrop-blur-sm">
                <p>© {new Date().getFullYear()} Productivity Dashboard. Built with Next.js & Tailwind CSS.</p>
            </footer>
        </div>
    );
}