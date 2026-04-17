import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="font-body text-on-surface antialiased bg-surface overflow-x-hidden min-h-screen">
            {/* SideNavBar */}
            <nav className="h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant/20 z-50 flex flex-col py-6 shadow-sm">
                
                {/* Brand/Header */}
                <div className="px-6 mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-primary tracking-tight">Faculty Portal</h1>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-label mt-0.5 font-bold">Academic Curator</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className="flex-1 space-y-2 px-4 overflow-y-auto mt-4">
                    <li>
                        <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname === '/dashboard' 
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname === '/dashboard' ? "'FILL' 1" : "" }}>dashboard</span>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/attendance" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname.startsWith('/attendance')
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname.startsWith('/attendance') ? "'FILL' 1" : "" }}>calendar_today</span>
                            <span>Attendance</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/assignments" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname.startsWith('/assignments')
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname.startsWith('/assignments') ? "'FILL' 1" : "" }}>assignment</span>
                            <span>Assignments</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/analytics" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname === '/analytics'
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname === '/analytics' ? "'FILL' 1" : "" }}>analytics</span>
                            <span>Analytics</span>
                        </Link>
                    </li>
                    
                    <li className="pt-6 mt-6 border-t border-outline-variant/20">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-medium">
                            <span className="material-symbols-outlined text-xl">settings</span>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>

                <div className="px-4 mt-auto border-t border-outline-variant/20 pt-4">
                    <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-medium">
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <span>Logout</span>
                    </Link>
                </div>
            </nav>

            {/* TopNavBar */}
            <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm flex justify-between items-center px-8 text-sm">
                
                {/* Left Side: Product Name & Search */}
                <div className="flex items-center gap-8 w-1/2">
                    {/* Search Bar */}
                    <div className="relative w-full max-w-md group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-xl">search</span>
                        <input className="w-full bg-surface-container-low text-on-surface border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/70 shadow-inner" placeholder="Search resources, students..." type="text" />
                    </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-6">
                    {/* Trailing Icon Action */}
                    <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">notifications</span>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-surface-container-lowest"></span>
                    </button>
                    
                    {/* Separator */}
                    <div className="w-px h-6 bg-outline-variant/30"></div>
                    
                    {/* Profile Action */}
                    <button className="flex items-center gap-3 hover:bg-surface-container-low px-2 py-1.5 rounded-lg transition-colors">
                        <img alt="Faculty Portrait" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUnKPosSLFDS79fTTigieWoLORVuscC0yjfYGwCAIa4bjPx_GCxxYPtYvrvlpkuIkMNE6KxHIFKXO8gpJlO8jmbCmXRUL8KHlcv8avVvPEQH0IdeGbYoHlZPI8r26A8TpySaxoK8XcHZF5Ia6BJHSY6uRbpO2kBnJxcYNHPV0AAd4i1wxSzA-dQ2wIsIxVidcAj7ytJMRGXGSbT3wpX2mPdgapIpXp825k7tVh2KSmiIsfI390NgBuXhQ4PSQivm_NhCtCDZKfNUAU" />
                        <div className="text-left flex items-center gap-1">
                            <span className="font-semibold text-on-surface text-sm">Profile</span>
                            <span className="material-symbols-outlined text-lg text-on-surface-variant">expand_more</span>
                        </div>
                    </button>
                </div>
            </header>

            {/* Main Canvas */}
            <main className="ml-64 pt-20 min-h-screen p-8 lg:p-10 relative max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
