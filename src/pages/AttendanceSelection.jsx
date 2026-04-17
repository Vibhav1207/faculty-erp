import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttendanceSelection() {
    const navigate = useNavigate();

    const handleInitialize = (e) => {
        e.preventDefault();
        navigate('/attendance/manual');
    };

    return (
        <div className="relative">
            {/* Header Area */}
            <header className="mb-10 max-w-4xl">
                <h1 className="font-headline text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mb-2">Configure Session</h1>
                <p className="text-on-surface-variant text-base max-w-2xl">Define the parameters for your upcoming lecture and select a student verification protocol.</p>
            </header>

            {/* Bento Layout Form */}
            <form onSubmit={handleInitialize} className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-6xl">
                
                {/* Left Column: Session Details (Span 7) */}
                <section className="xl:col-span-7 bg-surface-container-lowest rounded-lg p-8 relative isolate overflow-hidden group ambient-shadow mb-0 xl:mb-12 border border-outline-variant/20">
                    {/* Academic Progress Ribbon */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-dim opacity-80"></div>
                    
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">tune</span>
                            Session Parameters
                        </h2>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-tertiary-container text-on-tertiary-container text-xs font-semibold uppercase tracking-wider font-label">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Draft Mode
                        </span>
                    </div>

                    <div className="space-y-6">
                        {/* Subject Dropdown */}
                        <div className="space-y-2">
                            <label className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium block" htmlFor="subject">Course / Subject</label>
                            <div className="relative">
                                <select className="w-full bg-surface-container-highest text-on-surface rounded-sm px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary appearance-none font-body text-sm transition-shadow border-none cursor-pointer outline-none" id="subject" name="subject" defaultValue="">
                                    <option disabled value="">Select an active course...</option>
                                    <option value="cs101">CS101: Introduction to Computer Science</option>
                                    <option value="eng204">ENG204: Advanced Technical Writing</option>
                                    <option value="mat301">MAT301: Applied Linear Algebra</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                            </div>
                        </div>

                        {/* Class/Cohort Dropdown */}
                        <div className="space-y-2">
                            <label className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium block" htmlFor="class_cohort">Section / Cohort</label>
                            <div className="relative">
                                <select className="w-full bg-surface-container-highest text-on-surface rounded-sm px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary appearance-none font-body text-sm transition-shadow border-none cursor-pointer outline-none" id="class_cohort" name="class_cohort" defaultValue="">
                                    <option disabled value="">Select student group...</option>
                                    <option value="sec_a">Section A (Morning)</option>
                                    <option value="sec_b">Section B (Afternoon)</option>
                                    <option value="lab_1">Lab Group 01</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                            </div>
                        </div>

                        {/* Time Slot Dropdown */}
                        <div className="space-y-2">
                            <label className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium block" htmlFor="time_slot">Scheduled Time Slot</label>
                            <div className="relative">
                                <select className="w-full bg-surface-container-highest text-on-surface rounded-sm px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary appearance-none font-body text-sm transition-shadow border-none cursor-pointer outline-none" id="time_slot" name="time_slot" defaultValue="">
                                    <option disabled value="">Select duration...</option>
                                    <option value="t1">09:00 AM - 10:30 AM</option>
                                    <option value="t2">11:00 AM - 12:30 PM</option>
                                    <option value="t3">02:00 PM - 03:30 PM</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Column: Verification Method (Span 5) */}
                <section className="xl:col-span-5 bg-surface-container-low rounded-lg p-8 flex flex-col h-full border border-outline-variant/20 mb-0 xl:mb-12">
                    <div className="mb-6">
                        <h2 className="font-headline text-xl font-bold text-on-surface mb-1">Verification Protocol</h2>
                        <p className="text-sm text-on-surface-variant">Select how students will register their presence.</p>
                    </div>

                    <div className="space-y-4 flex-1">
                        {/* Method 1: Face Recognition (Selected State) */}
                        <label className="block relative cursor-pointer group">
                            <input defaultChecked className="peer sr-only" name="verification_method" type="radio" value="face" />
                            <div className="bg-surface-container-lowest rounded-md p-5 border border-outline-variant/15 transition-all flex items-start gap-4 peer-checked:bg-primary-container/30 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary hover:bg-surface relative overflow-hidden">
                                {/* Active indicator */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded-sm bg-surface-container-high flex items-center justify-center text-on-surface shrink-0 peer-checked:bg-primary peer-checked:text-on-primary transition-colors">
                                    <span className="material-symbols-outlined">face_retouching_natural</span>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-base text-on-surface mb-0.5 peer-checked:text-primary-dim">Face Recognition</h3>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">Automated AI scan for large lecture halls. Fastest throughput.</p>
                                </div>
                                {/* Selected Checkmark */}
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                            </div>
                        </label>

                        {/* Method 2: QR Code */}
                        <label className="block relative cursor-pointer group">
                            <input className="peer sr-only" name="verification_method" type="radio" value="qr" />
                            <div className="bg-surface-container-lowest rounded-md p-5 border border-outline-variant/15 transition-all flex items-start gap-4 peer-checked:bg-primary-container/30 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary hover:bg-surface relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded-sm bg-surface-container-high flex items-center justify-center text-on-surface shrink-0 peer-checked:bg-primary peer-checked:text-on-primary transition-colors">
                                    <span className="material-symbols-outlined">qr_code_scanner</span>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-base text-on-surface mb-0.5 peer-checked:text-primary-dim">Dynamic QR Code</h3>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">Project a rotating code for students to scan via mobile app.</p>
                                </div>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                            </div>
                        </label>

                        {/* Method 3: Manual */}
                        <label className="block relative cursor-pointer group">
                            <input className="peer sr-only" name="verification_method" type="radio" value="manual" />
                            <div className="bg-surface-container-lowest rounded-md p-5 border border-outline-variant/15 transition-all flex items-start gap-4 peer-checked:bg-primary-container/30 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary hover:bg-surface relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded-sm bg-surface-container-high flex items-center justify-center text-on-surface shrink-0 peer-checked:bg-primary peer-checked:text-on-primary transition-colors">
                                    <span className="material-symbols-outlined">fact_check</span>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-base text-on-surface mb-0.5 peer-checked:text-primary-dim">Manual Roll Call</h3>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">Traditional list view for small seminars or lab sessions.</p>
                                </div>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Bottom CTA Area */}
                <div className="xl:col-span-12 flex justify-end">
                    <button className="bg-gradient-to-r from-primary to-primary-dim text-white rounded-xl px-10 py-4 font-headline font-bold text-lg tracking-wide shadow-ambient hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 active:scale-95 border border-primary-dim/20" type="submit">
                        <span className="material-symbols-outlined">play_arrow</span>
                        Initialize Attendance
                    </button>
                </div>
            </form>
        </div>
    );
}
