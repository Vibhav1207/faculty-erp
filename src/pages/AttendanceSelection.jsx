import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const courseOptions = [
    { value: 'cs101', label: 'CS101: Introduction to Computer Science' },
    { value: 'eng204', label: 'ENG204: Advanced Technical Writing' },
    { value: 'mat301', label: 'MAT301: Applied Linear Algebra' },
];

const cohortOptions = [
    { value: 'sec_a', label: 'Section A (Morning)' },
    { value: 'sec_b', label: 'Section B (Afternoon)' },
    { value: 'lab_1', label: 'Lab Group 01' },
];

const timeSlotOptions = [
    { value: 't1', label: '09:00 AM - 10:30 AM' },
    { value: 't2', label: '11:00 AM - 12:30 PM' },
    { value: 't3', label: '02:00 PM - 03:30 PM' },
];

const verificationMethods = [
    {
        value: 'face',
        icon: 'face_retouching_natural',
        title: 'Face Recognition',
        description: 'Automated AI scan for large lecture halls. Fastest throughput.',
    },
    {
        value: 'qr',
        icon: 'qr_code_scanner',
        title: 'Dynamic QR Code',
        description: 'Project a rotating code for students to scan via mobile app.',
    },
    {
        value: 'manual',
        icon: 'fact_check',
        title: 'Manual Roll Call',
        description: 'Traditional list view for small seminars or lab sessions.',
    },
];

export default function AttendanceSelection() {
    const navigate = useNavigate();
    const [course, setCourse] = useState('');
    const [cohort, setCohort] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [verificationMethod, setVerificationMethod] = useState('face');

    const selectedCourseLabel = useMemo(
        () => courseOptions.find((option) => option.value === course)?.label || 'Not selected',
        [course],
    );
    const selectedCohortLabel = useMemo(
        () => cohortOptions.find((option) => option.value === cohort)?.label || 'Not selected',
        [cohort],
    );
    const selectedTimeSlotLabel = useMemo(
        () => timeSlotOptions.find((option) => option.value === timeSlot)?.label || 'Not selected',
        [timeSlot],
    );
    const selectedMethodLabel = useMemo(
        () => verificationMethods.find((option) => option.value === verificationMethod)?.title || 'Not selected',
        [verificationMethod],
    );

    const isSessionReady = Boolean(course && cohort && timeSlot && verificationMethod);

    const handleInitialize = (e) => {
        e.preventDefault();
        if (!isSessionReady) return;
        navigate('/attendance/manual');
    };

    const handleReset = () => {
        setCourse('');
        setCohort('');
        setTimeSlot('');
        setVerificationMethod('face');
    };

    return (
        <div className="relative">
            {/* Header Area */}
            <header className="mb-4 max-w-4xl">
                <p className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide mb-2">
                    <span className="material-symbols-outlined text-sm">tune</span>
                    Attendance Setup
                </p>
                <h1 className="font-headline text-2xl lg:text-3xl font-extrabold tracking-tight text-on-surface mb-1">Configure Session</h1>
                <p className="text-on-surface-variant text-sm max-w-3xl">Define lecture details and select a verification method.</p>
            </header>

            {/* Bento Layout Form */}
            <form onSubmit={handleInitialize} className="grid grid-cols-1 xl:grid-cols-12 gap-4 max-w-6xl">
                
                {/* Left Column: Session Details (Span 7) */}
                <section className="xl:col-span-7 bg-surface-container-lowest rounded-xl p-5 lg:p-6 relative isolate overflow-hidden ambient-shadow border border-outline-variant/30">
                    {/* Academic Progress Ribbon */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-dim opacity-80"></div>
                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">tune</span>
                            Session Parameters
                        </h2>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider font-label">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Draft Mode
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Subject Dropdown */}
                        <div className="space-y-2">
                            <label className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium block" htmlFor="subject">Course / Subject</label>
                            <div className="relative">
                                <select
                                    className="attendance-select w-full bg-surface-container-high text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none font-body text-sm transition-all border border-outline-variant/40 cursor-pointer outline-none"
                                    id="subject"
                                    name="subject"
                                    value={course}
                                    onChange={(event) => setCourse(event.target.value)}
                                >
                                    <option disabled value="">Select an active course...</option>
                                    {courseOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                            </div>
                        </div>

                        {/* Class/Cohort Dropdown */}
                        <div className="space-y-2">
                            <label className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium block" htmlFor="class_cohort">Section / Cohort</label>
                            <div className="relative">
                                <select
                                    className="attendance-select w-full bg-surface-container-high text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none font-body text-sm transition-all border border-outline-variant/40 cursor-pointer outline-none"
                                    id="class_cohort"
                                    name="class_cohort"
                                    value={cohort}
                                    onChange={(event) => setCohort(event.target.value)}
                                >
                                    <option disabled value="">Select student group...</option>
                                    {cohortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                            </div>
                        </div>

                        {/* Time Slot Dropdown */}
                        <div className="space-y-2">
                            <label className="font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-medium block" htmlFor="time_slot">Scheduled Time Slot</label>
                            <div className="relative">
                                <select
                                    className="attendance-select w-full bg-surface-container-high text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none font-body text-sm transition-all border border-outline-variant/40 cursor-pointer outline-none"
                                    id="time_slot"
                                    name="time_slot"
                                    value={timeSlot}
                                    onChange={(event) => setTimeSlot(event.target.value)}
                                >
                                    <option disabled value="">Select duration...</option>
                                    {timeSlotOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="rounded-lg bg-surface-container-low px-3 py-2.5 border border-outline-variant/20">
                            <p className="text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">Course</p>
                            <p className="text-sm font-semibold text-on-surface mt-1 truncate">{selectedCourseLabel}</p>
                        </div>
                        <div className="rounded-lg bg-surface-container-low px-3 py-2.5 border border-outline-variant/20">
                            <p className="text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">Section</p>
                            <p className="text-sm font-semibold text-on-surface mt-1 truncate">{selectedCohortLabel}</p>
                        </div>
                    </div>
                </section>

                {/* Right Column: Verification Method (Span 5) */}
                <section className="xl:col-span-5 bg-surface-container-low rounded-xl p-5 lg:p-6 flex flex-col h-full border border-outline-variant/30">
                    <div className="mb-4">
                        <h2 className="font-headline text-lg font-bold text-on-surface mb-1">Verification Protocol</h2>
                        <p className="text-xs text-on-surface-variant">Select how students will register their presence.</p>
                    </div>

                    <div className="space-y-3 flex-1">
                        {verificationMethods.map((method) => (
                            <label key={method.value} className="block relative cursor-pointer group">
                                <input
                                    className="peer sr-only"
                                    name="verification_method"
                                    type="radio"
                                    value={method.value}
                                    checked={verificationMethod === method.value}
                                    onChange={(event) => setVerificationMethod(event.target.value)}
                                />
                                <div className="bg-surface-container-lowest rounded-lg p-3 border border-outline-variant/20 transition-all flex items-start gap-3 peer-checked:bg-primary-container/20 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 hover:bg-surface relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                    <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center text-on-surface shrink-0 peer-checked:bg-primary peer-checked:text-on-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">{method.icon}</span>
                                    </div>
                                    <div className="pr-7">
                                        <h3 className="font-headline font-bold text-[15px] text-on-surface mb-0.5 peer-checked:text-primary-dim">{method.title}</h3>
                                        <p className="text-xs text-on-surface-variant leading-relaxed">{method.description}</p>
                                    </div>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="mt-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20 px-3 py-2.5">
                        <p className="text-[11px] uppercase tracking-[0.08em] text-on-surface-variant mb-1">Selected Method</p>
                        <p className="text-sm font-semibold text-on-surface">{selectedMethodLabel}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between gap-3">
                        <p className="text-xs text-on-surface-variant">Time: {selectedTimeSlotLabel}</p>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-3 py-2 text-sm rounded-lg border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            className="bg-gradient-to-r from-primary to-primary-dim text-white rounded-lg px-4 py-2 text-sm font-headline font-bold tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            type="submit"
                            disabled={!isSessionReady}
                        >
                            <span className="material-symbols-outlined">play_arrow</span>
                            Initialize Attendance
                        </button>
                    </div>
                </section>
            </form>
        </div>
    );
}
