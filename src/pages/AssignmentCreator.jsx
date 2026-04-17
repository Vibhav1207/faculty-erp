import React from 'react';
import { Link } from 'react-router-dom';

export default function AssignmentCreator() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <nav aria-label="Breadcrumb" className="flex text-xs font-label text-on-surface-variant uppercase tracking-widest mb-3">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
                            <li className="inline-flex items-center">
                                <Link to="/assignments" className="hover:text-primary transition-colors">Assignments</Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
                                    <span className="text-on-surface font-medium">Create</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">Create Assignment</h1>
                </div>
            </div>

            {/* Form Layout (Asymmetric Grid) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Main Academic Content (Takes up 2 cols) */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Details Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow border border-outline-variant/20">
                        <h3 className="font-headline text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">article</span>
                            Assignment Details
                        </h3>
                        <div className="space-y-6">
                            {/* Title Input */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="title">Assignment Title</label>
                                <input className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none" id="title" placeholder="e.g., Midterm Research Proposal" type="text" />
                            </div>
                            {/* Description Input */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="description">Detailed Instructions</label>
                                <textarea className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none resize-y" id="description" placeholder="Outline the expectations, grading criteria, and methodology..." rows="5"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Materials / File Upload Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow border border-outline-variant/20">
                        <h3 className="font-headline text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">folder_open</span>
                            Supporting Materials
                        </h3>
                        {/* Drag & Drop Zone */}
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 border-2 border-dashed border-outline-variant opacity-30 rounded-xl group-hover:opacity-60 transition-opacity"></div>
                            <div className="bg-surface-container-low hover:bg-surface-container group-hover:bg-primary-container/30 transition-colors rounded-xl p-12 flex flex-col items-center justify-center text-center relative z-10">
                                <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mb-4 shadow-[0_8px_16px_rgba(42,52,57,0.04)] group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-3xl text-primary">upload_file</span>
                                </div>
                                <p className="font-body text-base font-medium text-on-surface mb-1">Drag and drop files here</p>
                                <p className="font-body text-sm text-on-surface-variant mb-4">or click to browse from your computer</p>
                                <div className="flex gap-2 text-xs font-label text-outline uppercase tracking-wider">
                                    <span>PDF</span> • <span>DOCX</span> • <span>ZIP</span>
                                </div>
                                <input className="hidden" type="file" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Actions (Takes up 1 col) */}
                <div className="xl:col-span-1 space-y-8">
                    {/* Configuration Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow border border-outline-variant/20">
                        <h3 className="font-headline text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">settings_input_component</span>
                            Parameters
                        </h3>
                        <div className="space-y-6">
                            {/* Deadline Picker */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="deadline">Submission Deadline</label>
                                <div className="relative">
                                    <input className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 pl-12 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all appearance-none outline-none" id="deadline" type="date" />
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">calendar_month</span>
                                </div>
                            </div>
                            {/* Marks/Grading */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="marks">Maximum Marks</label>
                                <div className="relative">
                                    <input className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 pl-12 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none" id="marks" type="number" defaultValue="100" />
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">grade</span>
                                </div>
                            </div>
                            {/* Course Selection */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="course">Target Course</label>
                                <select className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all appearance-none cursor-pointer outline-none" id="course">
                                    <option>Select a course...</option>
                                    <option>Advanced Data Structures (CS301)</option>
                                    <option>Machine Learning Ethics (CS450)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Primary Action Area */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center justify-center text-center ambient-shadow border border-outline-variant/20">
                        <span className="material-symbols-outlined text-tertiary-container text-4xl mb-3">auto_awesome</span>
                        <h4 className="font-headline text-base font-medium text-on-surface mb-2">Ready to Publish?</h4>
                        <p className="font-body text-sm text-on-surface-variant mb-6">Students will be notified immediately upon creation.</p>
                        
                        <button className="w-full bg-gradient-to-r from-primary to-primary-dim text-white font-medium rounded-lg py-3.5 px-6 shadow-[0_24px_48px_rgba(42,52,57,0.06)] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 outline-none">
                            <span>Create Assignment</span>
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                        <button className="mt-4 w-full bg-transparent text-primary hover:bg-primary-container/50 font-medium rounded-lg py-2.5 px-6 transition-colors outline-none">
                            Save as Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
