import React from 'react';

export default function DashboardTimetable() {
    return (
        <>
            {/* Dashboard Header */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-6">
                <div>
                    <h2 className="font-headline text-3xl text-on-surface font-extrabold tracking-tight">Good morning, Dr. Aris.</h2>
                    <p className="font-label text-sm text-on-surface-variant font-medium mt-1">Here is what's happening today.</p>
                </div>
                <div className="text-left md:text-right">
                    <p className="font-headline text-base font-bold text-on-surface">Fall Semester 2024</p>
                    <p className="font-body text-sm text-on-surface-variant font-medium">Week 7 • Term active</p>
                </div>
            </header>

            {/* Quick Stats (Bento Grid Style) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Stat 1 */}
                <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-6">
                    <div className="p-4 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                    </div>
                    <div>
                        <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Today's Load</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-none">4</h3>
                            <span className="font-body text-sm text-on-surface-variant font-medium">classes</span>
                        </div>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-6">
                    <div className="p-4 bg-error/10 rounded-lg text-error flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
                    </div>
                    <div>
                        <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Pending Tasks</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-none">2</h3>
                            <span className="font-body text-sm text-on-surface-variant font-medium">registers</span>
                        </div>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-6">
                    <div className="p-4 bg-tertiary/10 rounded-lg text-tertiary flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>task</span>
                    </div>
                    <div>
                        <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Evaluation</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-none">18</h3>
                            <span className="font-body text-sm text-on-surface-variant font-medium">assignments</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timetable Section */}
            <section className="bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm mb-12">
                <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                    <div>
                        <h3 className="font-headline text-xl font-extrabold text-on-surface tracking-tight">Weekly Schedule</h3>
                        <p className="font-body text-sm text-on-surface-variant mt-1 font-medium">Room assignments and lecture timings</p>
                    </div>
                    <button className="font-headline font-semibold text-primary text-sm px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent hover:border-primary/20">
                        Print Schedule
                    </button>
                </div>

                {/* Timetable Grid */}
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Header Row */}
                        <div className="grid grid-cols-[80px_repeat(6,1fr)] bg-surface-container-low/50 border-b border-outline-variant/20">
                            <div className="p-3 border-r border-outline-variant/20"></div>
                            <div className="p-3 text-center font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold border-r border-outline-variant/20">Mon</div>
                            <div className="p-3 text-center font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold border-r border-outline-variant/20">Tue</div>
                            <div className="p-3 text-center font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold border-r border-outline-variant/20">Wed</div>
                            <div className="p-3 text-center font-label text-xs uppercase tracking-widest text-primary font-extrabold border-r border-outline-variant/20 bg-primary/5 relative">
                                Thu
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                            </div>
                            <div className="p-3 text-center font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold border-r border-outline-variant/20">Fri</div>
                            <div className="p-3 text-center font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Sat</div>
                        </div>

                        {/* Time Slots */}
                        <div className="bg-surface-container-lowest relative pb-4">
                            {/* 09:00 AM */}
                            <div className="grid grid-cols-[80px_repeat(6,1fr)] group border-b border-outline-variant/10">
                                <div className="p-3 text-right font-label text-xs text-on-surface-variant font-medium border-r border-outline-variant/20">
                                    <span>09:00</span>
                                </div>
                                {/* Mon */}
                                <div className="p-2 border-r border-outline-variant/20 relative min-h-[140px]">
                                    <div className="absolute inset-1.5 bg-surface-container-low border-l-4 border-secondary rounded-md p-3 hover:shadow-md transition-all cursor-pointer">
                                        <p className="font-headline text-sm font-bold text-on-surface leading-tight mb-2">Intro to Physics</p>
                                        <div className="space-y-1">
                                            <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span> 09:00 - 10:30</p>
                                            <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">location_on</span> Room 101</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Tue */} <div className="p-2 border-r border-outline-variant/20 min-h-[140px]"></div>
                                {/* Wed */}
                                <div className="p-2 border-r border-outline-variant/20 relative min-h-[140px]">
                                    <div className="absolute inset-1.5 bg-surface-container-low border-l-4 border-secondary rounded-md p-3 hover:shadow-md transition-all cursor-pointer">
                                        <p className="font-headline text-sm font-bold text-on-surface leading-tight mb-2">Quantum Mech</p>
                                        <div className="space-y-1">
                                            <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span> 09:00 - 10:30</p>
                                            <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">location_on</span> Lab 4</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Thu */} <div className="p-2 border-r border-outline-variant/20 min-h-[140px] bg-primary/5"></div>
                                {/* Fri */} <div className="p-2 border-r border-outline-variant/20 min-h-[140px]"></div>
                                {/* Sat */} <div className="p-2 min-h-[140px]"></div>
                            </div>

                            {/* 10:30 AM */}
                            <div className="grid grid-cols-[80px_repeat(6,1fr)] group border-b border-outline-variant/10">
                                <div className="p-3 text-right font-label text-xs text-on-surface-variant font-medium border-r border-outline-variant/20">
                                    <span>10:30</span>
                                </div>
                                {/* Mon */} <div className="p-2 border-r border-outline-variant/20 min-h-[140px]"></div>
                                {/* Tue */}
                                <div className="p-2 border-r border-outline-variant/20 relative min-h-[140px]">
                                    <div className="absolute inset-1.5 bg-surface-container-low border-l-4 border-tertiary rounded-md p-3 hover:shadow-md transition-all cursor-pointer">
                                        <p className="font-headline text-sm font-bold text-on-surface leading-tight mb-2">Office Hours</p>
                                        <div className="space-y-1">
                                            <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span> 10:30 - 12:00</p>
                                            <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">location_on</span> Faculty Wing</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Wed */} <div className="p-2 border-r border-outline-variant/20 min-h-[140px]"></div>
                                {/* Thu (CURRENT CLASS) */}
                                <div className="p-2 border-r border-outline-variant/20 relative min-h-[140px] bg-primary/5">
                                    <div className="absolute inset-1.5 z-10 bg-primary/10 border border-primary/30 rounded-md p-3 shadow-sm flex flex-col justify-between">
                                        <div>
                                            <p className="font-headline text-sm font-extrabold text-primary leading-tight mb-2">Advanced Physics 301</p>
                                            <div className="space-y-1">
                                                <p className="font-body text-xs text-on-surface font-semibold flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary">schedule</span> 10:30 - 12:00</p>
                                                <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Lecture Hall A</p>
                                            </div>
                                        </div>
                                        <p className="font-label text-[10px] uppercase font-bold text-primary tracking-wider mt-3 flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                            </span>
                                            In Progress
                                        </p>
                                    </div>
                                </div>
                                {/* Fri */} <div className="p-2 border-r border-outline-variant/20 min-h-[140px]"></div>
                                {/* Sat */} <div className="p-2 min-h-[140px]"></div>
                            </div>

                            {/* 12:00 PM */}
                            <div className="grid grid-cols-[80px_repeat(6,1fr)] group">
                                <div className="p-3 text-right font-label text-xs text-on-surface-variant font-medium border-r border-outline-variant/20 border-b border-outline-variant/20">
                                    <span>12:00</span>
                                </div>
                                {/* Break row */}
                                <div className="col-span-6 bg-surface-container-low/50 flex items-center justify-center h-12 border-b border-outline-variant/20">
                                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">restaurant</span> Lunch Break
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating "Class In Progress" Popup */}
            <div className="fixed bottom-8 right-8 z-50 w-80 bg-surface-container-lowest rounded-xl p-6 shadow-xl border border-outline-variant/20 transform transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-outline-variant/10">
                    <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="font-label text-[10px] font-extrabold text-primary uppercase tracking-widest">Class Active</span>
                    </div>
                    <button className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-md hover:bg-surface-container-low">
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>
                <h4 className="font-headline text-lg font-extrabold text-on-surface tracking-tight leading-tight mb-3">Advanced Physics 301</h4>
                <div className="space-y-2 mb-6">
                    <p className="flex items-center gap-2 text-on-surface font-semibold text-sm">
                        <span className="material-symbols-outlined text-[18px] text-primary">schedule</span> 10:30 - 12:00
                    </p>
                    <p className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                        <span className="material-symbols-outlined text-[18px] text-primary">location_on</span> Lecture Hall A
                    </p>
                </div>
                <button className="w-full bg-primary text-white font-headline font-bold text-sm py-3 px-4 rounded-lg hover:bg-primary-dim transition-colors focus:ring-2 focus:ring-primary/50 focus:outline-none flex items-center justify-center gap-2 shadow-sm hover:shadow">
                    Take Attendance
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
            </div>
        </>
    );
}
