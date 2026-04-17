import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginScreen() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden bg-grid-pattern antialiased">
            {/* Ethereal Background Elements (Cloud and Ink philosophy) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-container rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-tertiary-container rounded-full mix-blend-multiply filter blur-[150px] opacity-30"></div>
            </div>

            {/* Login Container */}
            <main className="z-10 w-full max-w-[420px] px-6 py-12">
                {/* Main Card Surface */}
                <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-8 sm:p-10 relative overflow-hidden flex flex-col">
                    {/* Academic Progress Ribbon at the top */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim"></div>

                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center mb-8 mt-2">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center mb-5">
                            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>assured_workload</span>
                        </div>
                        <h1 className="font-headline text-[28px] leading-tight font-extrabold tracking-[-0.02em] text-on-surface mb-2">Faculty Portal</h1>
                        <p className="text-on-surface-variant text-sm font-body">Academic Curator Workspace</p>
                    </div>

                    {/* Form Section */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        {/* ID/Email Input */}
                        <div className="space-y-1.5">
                            <label className="block font-label text-[11px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold" htmlFor="faculty-id">Faculty ID / Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-outline">
                                    <span className="material-symbols-outlined text-[20px]">badge</span>
                                </span>
                                <input className="w-full bg-surface-container-highest border-none rounded-[0.25rem] py-3 pl-11 pr-4 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none transition-shadow text-sm font-medium placeholder:text-outline-variant placeholder:font-normal" id="faculty-id" placeholder="Enter identification" type="text" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block font-label text-[11px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold" htmlFor="password">Password</label>
                                <a className="text-[11px] font-semibold text-primary hover:text-primary-dim transition-colors" href="#">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-outline">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </span>
                                <input className="w-full bg-surface-container-highest border-none rounded-[0.25rem] py-3 pl-11 pr-4 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none transition-shadow text-sm font-medium placeholder:text-outline-variant placeholder:font-normal" id="password" placeholder="••••••••" type="password" />
                            </div>
                        </div>

                        {/* Spacer */}
                        <div className="pt-2"></div>

                        {/* Submit Action */}
                        <button className="w-full bg-gradient-to-b from-primary to-primary-dim text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2" type="submit">
                            <span className="text-sm tracking-wide">Login</span>
                            <span className="material-symbols-outlined text-[18px]">login</span>
                        </button>
                    </form>
                </div>

                {/* Footer Context */}
                <div className="mt-8 text-center flex flex-col items-center justify-center gap-2">
                    <p className="text-[11px] text-outline font-medium tracking-wide">Protected by Institutional Single Sign-On</p>
                </div>
            </main>
        </div>
    );
}
