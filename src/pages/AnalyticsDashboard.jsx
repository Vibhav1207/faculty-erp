import React from 'react';

export default function AnalyticsDashboard() {
    return (
        <div className="max-w-[1400px] w-full mx-auto">
            {/* Page Header & Primary Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">Analytics Overview</h1>
                    <p className="text-on-surface-variant text-sm max-w-xl">Comprehensive overview of academic engagement and outcome metrics across all assigned cohorts.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 bg-surface-container-low p-2 rounded-lg">
                    {/* Filters */}
                    <select className="bg-surface-container-highest border-none text-sm text-on-surface rounded-md focus:ring-2 focus:ring-primary py-1.5 pl-3 pr-8 cursor-pointer font-medium outline-none">
                        <option>All Subjects</option>
                        <option>Advanced Physics</option>
                        <option>Quantum Mechanics</option>
                        <option>Applied Mathematics</option>
                    </select>

                    <select className="bg-surface-container-highest border-none text-sm text-on-surface rounded-md focus:ring-2 focus:ring-primary py-1.5 pl-3 pr-8 cursor-pointer font-medium outline-none">
                        <option>All Classes</option>
                        <option>Cohort A - 2024</option>
                        <option>Cohort B - 2024</option>
                    </select>
                    
                    <div className="hidden sm:block h-6 w-[1px] bg-outline-variant/30 mx-1"></div>
                    
                    <select className="bg-surface border-none text-sm text-primary font-bold rounded-md focus:ring-2 focus:ring-primary py-1.5 pl-3 pr-8 cursor-pointer outline-none">
                        <option>Last 30 Days</option>
                        <option>This Semester</option>
                        <option>Academic Year</option>
                    </select>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                
                {/* KPI 1 */}
                <div className="md:col-span-4 bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase font-headline">Avg. Attendance</span>
                        <span className="material-symbols-outlined text-primary-dim">groups</span>
                    </div>
                    <div>
                        <div className="text-4xl font-extrabold text-on-surface font-headline mb-1">87.4%</div>
                        <div className="flex items-center gap-1 text-sm text-on-secondary-container font-medium">
                            <span className="material-symbols-outlined text-[16px] text-[#2e7d32]">trending_up</span>
                            <span className="text-[#2e7d32]">+2.1%</span> vs last month
                        </div>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className="md:col-span-4 bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase font-headline">Submissions</span>
                        <span className="material-symbols-outlined text-tertiary">task_alt</span>
                    </div>
                    <div>
                        <div className="text-4xl font-extrabold text-on-surface font-headline mb-1">942</div>
                        <div className="flex items-center gap-1 text-sm text-on-secondary-container font-medium">
                            <span className="text-tertiary">On track for semester goal</span>
                        </div>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className="md:col-span-4 bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase font-headline">At-Risk Students</span>
                        <span className="material-symbols-outlined text-error">warning</span>
                    </div>
                    <div>
                        <div className="text-4xl font-extrabold text-error font-headline mb-1">14</div>
                        <div className="flex items-center gap-1 text-sm text-on-secondary-container font-medium">
                            <span className="material-symbols-outlined text-[16px] text-error">trending_down</span>
                            <span className="text-error">-3</span> requiring intervention
                        </div>
                    </div>
                </div>

                {/* Line Chart: Attendance Trends (Col 12) */}
                <div className="md:col-span-12 bg-surface-container-lowest rounded-lg p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-headline text-xl font-bold text-on-surface">Attendance Trends</h3>
                            <p className="text-sm text-on-surface-variant">Daily presence rate across selected cohorts</p>
                        </div>
                        <button className="text-sm font-bold text-primary hover:text-primary-dim transition-colors flex items-center gap-1 outline-none">
                            Export Data <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                    </div>

                    {/* Abstract Chart Representation using purely CSS/HTML */}
                    <div className="relative h-64 w-full flex items-end justify-between px-2">
                        {/* Y-Axis Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            <div className="w-full h-[1px] bg-outline-variant/10"></div>
                            <div className="w-full h-[1px] bg-outline-variant/10"></div>
                            <div className="w-full h-[1px] bg-outline-variant/10"></div>
                            <div className="w-full h-[1px] bg-outline-variant/10"></div>
                            <div className="w-full h-[1px] bg-outline-variant/20"></div>
                        </div>

                        {/* SVG Line Graph Mockup */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Gradient Fill under line */}
                            <defs>
                                <linearGradient id="areaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#005ac2" stopOpacity="0.15"></stop>
                                    <stop offset="100%" stopColor="#005ac2" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            {/* Path */}
                            <path d="M0,80 C10,75 20,40 30,50 C40,60 50,20 60,35 C70,50 80,10 90,25 C95,32 100,20 100,20 L100,100 L0,100 Z" fill="url(#areaGradient)"></path>
                            {/* Line */}
                            <path d="M0,80 C10,75 20,40 30,50 C40,60 50,20 60,35 C70,50 80,10 90,25 C95,32 100,20 100,20" fill="none" stroke="#005ac2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                            {/* Data Points */}
                            <circle cx="30" cy="50" fill="#ffffff" r="1.5" stroke="#005ac2" strokeWidth="1"></circle>
                            <circle cx="60" cy="35" fill="#ffffff" r="1.5" stroke="#005ac2" strokeWidth="1"></circle>
                            <circle cx="90" cy="25" fill="#ffffff" r="1.5" stroke="#005ac2" strokeWidth="1"></circle>
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="absolute -bottom-6 left-0 w-full flex justify-between text-xs text-on-surface-variant font-medium">
                            <span>Week 1</span>
                            <span>Week 2</span>
                            <span>Week 3</span>
                            <span>Week 4</span>
                            <span>Week 5</span>
                        </div>
                    </div>
                    <div className="mt-8"></div> {/* Spacer for labels */}
                </div>

                {/* Bar Chart: Subject-wise Attendance (Col 8) */}
                <div className="md:col-span-8 bg-surface-container-lowest rounded-lg p-8 shadow-sm">
                    <h3 className="font-headline text-xl font-bold text-on-surface mb-1">Subject Engagement</h3>
                    <p className="text-sm text-on-surface-variant mb-8">Average attendance grouped by discipline</p>
                    
                    <div className="flex flex-col gap-5">
                        {/* Bar 1 */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-on-surface">Advanced Physics</span>
                                <span className="text-on-surface-variant">92%</span>
                            </div>
                            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: "92%" }}></div>
                            </div>
                        </div>
                        {/* Bar 2 */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-on-surface">Quantum Mechanics</span>
                                <span className="text-on-surface-variant">85%</span>
                            </div>
                            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                <div className="bg-primary-dim h-full rounded-full" style={{ width: "85%" }}></div>
                            </div>
                        </div>
                        {/* Bar 3 */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-on-surface">Applied Mathematics</span>
                                <span className="text-on-surface-variant">78%</span>
                            </div>
                            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                <div className="bg-tertiary h-full rounded-full" style={{ width: "78%" }}></div>
                            </div>
                        </div>
                        {/* Bar 4 */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-on-surface">Scientific Computing</span>
                                <span className="text-on-surface-variant">88%</span>
                            </div>
                            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                <div className="bg-primary-fixed-dim h-full rounded-full" style={{ width: "88%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pie Chart: Submission Ratio (Col 4) */}
                <div className="md:col-span-4 bg-surface-container-lowest rounded-lg p-8 flex flex-col shadow-sm">
                    <h3 className="font-headline text-xl font-bold text-on-surface mb-1">Submission Status</h3>
                    <p className="text-sm text-on-surface-variant mb-8">Current assignment cycle</p>
                    
                    <div className="flex-1 flex flex-col items-center justify-center relative">
                        {/* CSS Donut Chart Mockup */}
                        <div className="w-40 h-40 rounded-full relative" style={{ background: "conic-gradient(#005ac2 0% 65%, #d3ceef 65% 85%, #fe8983 85% 100%)" }}>
                            {/* Inner circle for donut hole */}
                            <div className="absolute inset-4 bg-surface-container-lowest rounded-full flex items-center justify-center flex-col shadow-inner">
                                <span className="text-2xl font-black font-headline text-on-surface">65%</span>
                                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">On Time</span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="w-full mt-8 flex flex-col gap-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-on-surface">On Time</span>
                                </div>
                                <span className="font-medium">65%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
                                    <span className="text-on-surface">Late</span>
                                </div>
                                <span className="font-medium">20%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-error-container"></div>
                                    <span className="text-on-surface">Missing</span>
                                </div>
                                <span className="font-medium">15%</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
