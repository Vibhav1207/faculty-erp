import React from 'react';
import { Link } from 'react-router-dom';

export default function AssignmentOverview() {
    return (
        <div className="relative">
            {/* Page Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
                <div>
                    <p className="text-xs font-label uppercase tracking-widest text-outline mb-1">Curriculum Management</p>
                    <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Assignment Overview</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button className="px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-body font-medium hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filter Sort
                    </button>
                    <Link to="/assignments/create" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-white font-body font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0px_8px_16px_rgba(0,90,194,0.15)]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                        New Assignment
                    </Link>
                </div>
            </div>

            {/* Overview Stats (Bento style hint) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-low transition-colors cursor-default ambient-shadow">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim"></div>
                    <p className="text-sm font-label text-outline mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">pending_actions</span> Active Tasks</p>
                    <p className="text-3xl font-headline font-bold text-on-surface">12</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-low transition-colors cursor-default ambient-shadow">
                    <div className="absolute top-0 left-0 w-full h-1 bg-tertiary-container"></div>
                    <p className="text-sm font-label text-outline mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">rule</span> Needs Grading</p>
                    <p className="text-3xl font-headline font-bold text-on-surface">45</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-low transition-colors cursor-default ambient-shadow">
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container"></div>
                    <p className="text-sm font-label text-outline mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">check_circle</span> Closed This Week</p>
                    <p className="text-3xl font-headline font-bold text-on-surface">8</p>
                </div>
            </div>

            {/* Main Assignment List */}
            <div className="bg-surface-container-lowest rounded-xl flex flex-col pt-2 ambient-shadow overflow-x-auto border border-outline-variant/20">
                <div className="min-w-[800px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-surface-container-low/50 rounded-t-xl text-xs font-label uppercase tracking-widest text-outline">
                        <div className="col-span-4">Assignment Title</div>
                        <div className="col-span-2">Class Section</div>
                        <div className="col-span-2">Deadline</div>
                        <div className="col-span-2">Submissions</div>
                        <div className="col-span-2 text-right">Status</div>
                    </div>

                    {/* List Items (No horizontal lines, separated by spacing and subtle hover) */}
                    <div className="flex flex-col gap-2 p-2 w-full">
                        {/* Row 1: Active */}
                        <a href="#" className="grid grid-cols-12 gap-4 px-6 py-5 items-center rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden">
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="col-span-4">
                                <h3 className="font-headline font-bold text-on-surface text-base group-hover:text-primary transition-colors">Midterm Research Proposal</h3>
                                <p className="text-sm text-outline mt-0.5">HIST-301: Modern European History</p>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-medium w-max">
                                    Section 04
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                <span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
                                Oct 24, 11:59 PM
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-on-surface">32 / 40</span>
                                    <span className="text-outline">80%</span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: "80%" }}></div>
                                </div>
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Active
                                </span>
                            </div>
                        </a>

                        {/* Row 2: Pending (Needs Grading) */}
                        <a href="#" className="grid grid-cols-12 gap-4 px-6 py-5 items-center rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden">
                            <div className="absolute left-0 top-0 h-full w-1 bg-tertiary rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="col-span-4">
                                <h3 className="font-headline font-bold text-on-surface text-base group-hover:text-primary transition-colors">Literature Review Draft</h3>
                                <p className="text-sm text-outline mt-0.5">ENG-405: Seminar in Creative Writing</p>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-medium w-max">
                                    Section 01
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                <span className="material-symbols-outlined text-[18px] text-tertiary">calendar_month</span>
                                Oct 20, 5:00 PM
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-on-surface">15 / 15</span>
                                    <span className="text-outline">100%</span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className="h-full bg-tertiary rounded-full w-full"></div>
                                </div>
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                                    Pending
                                </span>
                            </div>
                        </a>

                        {/* Row 3: Active */}
                        <a href="#" className="grid grid-cols-12 gap-4 px-6 py-5 items-center rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden">
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="col-span-4">
                                <h3 className="font-headline font-bold text-on-surface text-base group-hover:text-primary transition-colors">Lab Report 3: Quantum Tunneling</h3>
                                <p className="text-sm text-outline mt-0.5">PHYS-202: Advanced Physics Lab</p>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-medium w-max">
                                    Section 12
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                <span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
                                Oct 28, 11:59 PM
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-on-surface">5 / 24</span>
                                    <span className="text-outline">20%</span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: "20%" }}></div>
                                </div>
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Active
                                </span>
                            </div>
                        </a>

                        {/* Row 4: Closed */}
                        <a href="#" className="grid grid-cols-12 gap-4 px-6 py-5 items-center rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden opacity-75 hover:opacity-100">
                            <div className="col-span-4">
                                <h3 className="font-headline font-bold text-on-surface text-base group-hover:text-secondary-dim transition-colors">Week 4 Problem Set</h3>
                                <p className="text-sm text-outline mt-0.5">MATH-110: Calculus I</p>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-medium w-max">
                                    Section 02
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-outline font-medium">
                                <span className="material-symbols-outlined text-[18px]">event_busy</span>
                                Oct 15, 11:59 PM
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-on-surface">120 / 120</span>
                                    <span className="text-outline">100%</span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className="h-full bg-outline-variant w-full rounded-full"></div>
                                </div>
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                                    Closed
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Pagination Footer */}
                    <div className="border-t border-surface-container-high/30 px-8 py-4 flex items-center justify-between mt-2">
                        <span className="text-sm text-outline font-medium">Showing 1 to 4 of 24 entries</span>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded flex items-center justify-center text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors disabled:opacity-50" disabled>
                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>
                            <button className="w-8 h-8 rounded flex items-center justify-center bg-primary text-white font-medium text-sm shadow-sm">1</button>
                            <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-medium text-sm">2</button>
                            <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-medium text-sm">3</button>
                            <span className="w-8 h-8 flex items-center justify-center text-outline text-sm">...</span>
                            <button className="w-8 h-8 rounded flex items-center justify-center text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors">
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
