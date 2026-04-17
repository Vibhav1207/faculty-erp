import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function DashboardLayout() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            // Keep UI stable even if logout request fails.
            console.error('Logout failed:', error);
        }
        closeSidebar();
    };

    return (
        <div className="font-body text-on-surface antialiased bg-surface overflow-x-hidden min-h-screen">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-inverse-surface/50 z-40 lg:hidden transition-opacity" 
                    onClick={closeSidebar}
                ></div>
            )}

            {/* SideNavBar */}
            <nav className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant/20 z-50 flex flex-col py-6 shadow-sm transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
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
                        <Link to="/dashboard" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname === '/dashboard' 
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname === '/dashboard' ? "'FILL' 1" : "" }}>dashboard</span>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/attendance" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname.startsWith('/attendance')
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname.startsWith('/attendance') ? "'FILL' 1" : "" }}>calendar_today</span>
                            <span>Attendance</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/assignments" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname.startsWith('/assignments')
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname.startsWith('/assignments') ? "'FILL' 1" : "" }}>assignment</span>
                            <span>Assignments</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/analytics" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname === '/analytics'
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname === '/analytics' ? "'FILL' 1" : "" }}>analytics</span>
                            <span>Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tickets" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                            location.pathname.startsWith('/tickets')
                            ? 'text-primary font-bold bg-primary/10' 
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                        }`}>
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: location.pathname.startsWith('/tickets') ? "'FILL' 1" : "" }}>confirmation_number</span>
                            <span>Raised Tickets</span>
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
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-medium">
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            {/* TopNavBar */}
            <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 z-30 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm flex justify-between items-center px-4 lg:px-8 text-sm">
                
                {/* Left Side: Hamburger (Mobile Only) & Search */}
                <div className="flex items-center gap-4 lg:gap-8 w-[60%] lg:w-1/2">
                    <button 
                        onClick={toggleSidebar}
                        className="lg:hidden text-on-surface hover:text-primary transition-colors focus:outline-none"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-md group hidden sm:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-xl">search</span>
                        <input className="w-full bg-surface-container-low text-on-surface border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/70 shadow-inner" placeholder="Search resources, students..." type="text" />
                    </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-4 lg:gap-6">
                    {/* Search action for mobile */}
                    <button className="sm:hidden text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">search</span>
                    </button>

                    {/* Trailing Icon Action */}
                    <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">notifications</span>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-surface-container-lowest"></span>
                    </button>
                    
                    {/* Separator */}
                    <div className="w-px h-6 bg-outline-variant/30 hidden sm:block"></div>
                    
                    {/* Profile Action */}
                    <button className="flex items-center gap-2 lg:gap-3 hover:bg-surface-container-low px-1 lg:px-2 py-1.5 rounded-lg transition-colors">
                        <img alt="Faculty Portrait" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUnKPosSLFDS79fTTigieWoLORVuscC0yjfYGwCAIa4bjPx_GCxxYPtYvrvlpkuIkMNE6KxHIFKXO8gpJlO8jmbCmXRUL8KHlcv8avVvPEQH0IdeGbYoHlZPI8r26A8TpySaxoK8XcHZF5Ia6BJHSY6uRbpO2kBnJxcYNHPV0AAd4i1wxSzA-dQ2wIsIxVidcAj7ytJMRGXGSbT3wpX2mPdgapIpXp825k7tVh2KSmiIsfI390NgBuXhQ4PSQivm_NhCtCDZKfNUAU" />
                        <div className="text-left hidden lg:flex items-center gap-1">
                            <span className="font-semibold text-on-surface text-sm">Profile</span>
                            <span className="material-symbols-outlined text-lg text-on-surface-variant">expand_more</span>
                        </div>
                    </button>
                </div>
            </header>

            {/* Main Canvas */}
            <main className="lg:ml-64 pt-24 min-h-screen px-4 lg:px-10 pb-10 relative max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
