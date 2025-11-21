import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Keyboard, Zap } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();

    const NavLink = ({ to, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                    ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
            >
                {children}
                {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary shadow-[0_0_10px_#d946ef]" />
                )}
            </Link>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-gray-200 font-sans selection:bg-primary/30 selection:text-primary">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

            <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                                <Keyboard className="w-8 h-8 text-white relative z-10" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight group-hover:to-white transition-all">
                                TypeArena
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-mono text-green-500 tracking-wider">SYSTEM ONLINE</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <NavLink to="/single">Single Player</NavLink>
                        <NavLink to="/multi">Multiplayer</NavLink>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 relative z-10 flex flex-col justify-center">
                {children}
            </main>

            <footer className="border-t border-white/5 py-8 text-center text-gray-600 text-sm relative z-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center gap-2 text-accent/80">
                        <Zap className="w-4 h-4" />
                        <span className="font-mono">Powered by Native WebSockets</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>v1.0.0</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                        <span>&copy; 2025 TypeArena</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
