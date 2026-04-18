import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    DAYS,
    TIME_SLOTS,
    TIMETABLE,
    SUBJECTS,
    getSubjectById,
    getTodaySchedule,
    getCurrentClass,
    getNextClass,
    getTodayClassCount,
} from '../lib/seedData';

// ─── Live Clock Hook ───────────────────────────────────────────────
function useLiveClock() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return now;
}

// ─── Subject Color Map ─────────────────────────────────────────────
const SUBJECT_COLORS = {
    dbms: {
        bg: 'bg-blue-50',
        border: 'border-l-blue-500',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-700',
        activeBg: 'bg-blue-500/10',
        activeBorder: 'border-blue-500/30',
        activeText: 'text-blue-600',
        dot: 'bg-blue-500',
    },
    dsa: {
        bg: 'bg-emerald-50',
        border: 'border-l-emerald-500',
        text: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-700',
        activeBg: 'bg-emerald-500/10',
        activeBorder: 'border-emerald-500/30',
        activeText: 'text-emerald-600',
        dot: 'bg-emerald-500',
    },
    js: {
        bg: 'bg-amber-50',
        border: 'border-l-amber-500',
        text: 'text-amber-700',
        badge: 'bg-amber-100 text-amber-700',
        activeBg: 'bg-amber-500/10',
        activeBorder: 'border-amber-500/30',
        activeText: 'text-amber-600',
        dot: 'bg-amber-500',
    },
};

// ─── Format Time ───────────────────────────────────────────────────
function formatTime(date) {
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
}

function formatDate(date) {
    return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function getGreeting(hour) {
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

// ─── Main Component ────────────────────────────────────────────────
export default function DashboardTimetable() {
    const navigate = useNavigate();
    const { facultyProfile } = useAuth();
    const now = useLiveClock();

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[now.getDay()];
    const isSunday = todayName === 'Sunday';

    // Current time string for comparison
    const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Today's schedule
    const todaySchedule = useMemo(() => getTodaySchedule(), [now.getDay()]);
    const currentClass = useMemo(() => getCurrentClass(), [currentTimeStr]);
    const nextClass = useMemo(() => getNextClass(), [currentTimeStr]);
    const todayClassCount = useMemo(() => getTodayClassCount(), [now.getDay()]);

    // Faculty name
    const facultyName = facultyProfile?.name || 'Faculty';
    const firstName = facultyName.split(' ')[0];
    const greeting = getGreeting(now.getHours());

    // Determine active slot
    const getSlotStatus = (slotId) => {
        const slot = TIME_SLOTS.find((s) => s.id === slotId);
        if (!slot || isSunday) return 'future';
        if (currentTimeStr >= slot.start && currentTimeStr < slot.end) return 'active';
        if (currentTimeStr >= slot.end) return 'past';
        return 'future';
    };

    return (
        <>
            {/* ─── Dashboard Header with Live Clock ─── */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-6">
                <div>
                    <h2 className="font-headline text-3xl text-on-surface font-extrabold tracking-tight">
                        {greeting}, {firstName}.
                    </h2>
                    <p className="font-label text-sm text-on-surface-variant font-medium mt-1">
                        Here is what's happening today.
                    </p>
                </div>
                <div className="text-left md:text-right">
                    {/* Live Date */}
                    <p className="font-headline text-base font-bold text-on-surface">{formatDate(now)}</p>
                    {/* Live Clock */}
                    <div className="flex items-center gap-2 mt-1 md:justify-end">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <p className="font-mono text-sm text-on-surface-variant font-semibold tabular-nums tracking-wider">
                            {formatTime(now)}
                        </p>
                    </div>
                </div>
            </header>

            {/* ─── Quick Stats (Bento Grid) ─── */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Today's Classes */}
                <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-6">
                    <div className="p-4 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                    </div>
                    <div>
                        <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Today's Load</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-none">{isSunday ? '0' : todayClassCount}</h3>
                            <span className="font-body text-sm text-on-surface-variant font-medium">{isSunday ? 'holiday' : 'classes'}</span>
                        </div>
                    </div>
                </div>

                {/* Current Status */}
                <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-6">
                    <div className={`p-4 rounded-lg flex-shrink-0 ${currentClass ? 'bg-green-500/10 text-green-600' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{currentClass ? 'cast_for_education' : 'event_available'}</span>
                    </div>
                    <div>
                        <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">
                            {currentClass ? 'In Class' : 'Status'}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-headline text-lg font-extrabold text-on-surface tracking-tight leading-tight">
                                {currentClass
                                    ? currentClass.subject?.shortName
                                    : isSunday
                                    ? 'Sunday'
                                    : nextClass
                                    ? `Next: ${nextClass.subject?.shortName}`
                                    : 'All Done'}
                            </h3>
                            {currentClass && (
                                <span className="text-xs font-medium text-green-600">({currentClass.subject?.year})</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Subjects Taught */}
                <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-6">
                    <div className="p-4 bg-tertiary/10 rounded-lg text-tertiary flex-shrink-0">
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                    </div>
                    <div>
                        <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Subjects</p>
                        <div className="flex items-center gap-2 flex-wrap">
                            {SUBJECTS.map((sub) => {
                                const colors = SUBJECT_COLORS[sub.id];
                                return (
                                    <span key={sub.id} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${colors?.badge || 'bg-surface-container-high text-on-surface-variant'}`}>
                                        {sub.shortName}
                                        <span className="text-[9px] font-medium opacity-60">({sub.year})</span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Today's Timeline ─── */}
            {!isSunday && (
                <section className="bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm mb-8">
                    <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                        <div>
                            <h3 className="font-headline text-xl font-extrabold text-on-surface tracking-tight">Today's Timeline</h3>
                            <p className="font-body text-sm text-on-surface-variant mt-1 font-medium">{todayName}'s schedule • Live tracking</p>
                        </div>
                        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-xs font-semibold text-on-surface-variant tabular-nums">{formatTime(now)}</span>
                        </div>
                    </div>

                    <div className="p-4 lg:p-6">
                        <div className="space-y-2">
                            {todaySchedule.entries?.map((entry, idx) => {
                                const slot = entry.slot;
                                if (!slot) return null;

                                const status = getSlotStatus(slot.id);
                                const isClass = !!entry.subjectId;
                                const subject = entry.subject;
                                const colors = subject ? SUBJECT_COLORS[subject.id] : null;
                                const specialType = entry.type; // FREE, LUNCH, BUFFER

                                return (
                                    <div
                                        key={idx}
                                        className={`flex items-stretch gap-4 rounded-lg transition-all duration-300 ${
                                            status === 'active'
                                                ? 'bg-primary/5 ring-1 ring-primary/20 shadow-sm'
                                                : status === 'past'
                                                ? 'opacity-50'
                                                : ''
                                        }`}
                                    >
                                        {/* Time Column */}
                                        <div className="w-28 flex-shrink-0 flex flex-col justify-center px-3 py-3">
                                            <p className={`font-mono text-xs font-bold ${status === 'active' ? 'text-primary' : 'text-on-surface-variant'}`}>
                                                {slot.label.split('–')[0]?.trim()}
                                            </p>
                                            <p className="font-mono text-[10px] text-on-surface-variant/60">
                                                {slot.label.split('–')[1]?.trim()}
                                            </p>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className="flex flex-col items-center py-2">
                                            <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                                                status === 'active'
                                                    ? 'border-primary bg-primary animate-pulse'
                                                    : status === 'past'
                                                    ? 'border-outline-variant bg-outline-variant'
                                                    : 'border-outline-variant/40 bg-surface'
                                            }`}></div>
                                            {idx < todaySchedule.entries.length - 1 && (
                                                <div className={`w-0.5 flex-1 mt-1 ${status === 'past' ? 'bg-outline-variant' : 'bg-outline-variant/20'}`}></div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 py-3 pr-4">
                                            {isClass && subject ? (
                                                <div className={`rounded-lg p-3 border-l-4 ${colors?.border || 'border-l-outline-variant'} ${colors?.bg || 'bg-surface-container-low'} ${status === 'active' ? 'shadow-md' : ''}`}>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className={`font-headline text-sm font-bold ${status === 'active' ? colors?.activeText || 'text-primary' : 'text-on-surface'}`}>
                                                            {subject.name}
                                                        </h4>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors?.badge || 'bg-surface-container-high text-on-surface-variant'}`}>
                                                            {subject.year}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-on-surface-variant font-medium">{subject.shortName} • {slot.label}</p>
                                                    {status === 'active' && (
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                            </span>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">In Progress</span>
                                                            <button
                                                                onClick={() => navigate('/attendance', { state: { autoFill: true } })}
                                                                className="ml-auto text-[10px] font-bold text-primary hover:text-primary-dim transition-colors flex items-center gap-1"
                                                            >
                                                                Take Attendance
                                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : specialType === 'LUNCH' ? (
                                                <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-surface-container-low/50">
                                                    <span className="material-symbols-outlined text-lg text-on-surface-variant">restaurant</span>
                                                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Lunch Break</span>
                                                </div>
                                            ) : specialType === 'BUFFER' ? (
                                                <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-surface-container-low/50">
                                                    <span className="material-symbols-outlined text-lg text-on-surface-variant">timer</span>
                                                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Buffer Time</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 py-2 px-3">
                                                    <span className="material-symbols-outlined text-lg text-on-surface-variant/40">event_available</span>
                                                    <span className="text-xs text-on-surface-variant/60 font-medium">Free Period</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Sunday Holiday Message ─── */}
            {isSunday && (
                <section className="bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm mb-8 p-8 text-center">
                    <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>self_improvement</span>
                    <h3 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight mb-2">It's Sunday!</h3>
                    <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto">
                        No classes scheduled today. Enjoy your day off, {firstName}! 
                        Your next class starts Monday at 09:50 AM.
                    </p>
                </section>
            )}

            {/* ─── Full Weekly Timetable ─── */}
            <section className="bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm mb-12">
                <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                    <div>
                        <h3 className="font-headline text-xl font-extrabold text-on-surface tracking-tight">Weekly Schedule</h3>
                        <p className="font-body text-sm text-on-surface-variant mt-1 font-medium">
                            Full timetable for {facultyName}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Subject Legend */}
                        <div className="hidden lg:flex items-center gap-3">
                            {SUBJECTS.map((sub) => {
                                const colors = SUBJECT_COLORS[sub.id];
                                return (
                                    <div key={sub.id} className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${colors?.dot}`}></div>
                                        <span className="text-[11px] text-on-surface-variant font-semibold">{sub.shortName} ({sub.year})</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Timetable Grid */}
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Header Row */}
                        <div className="grid grid-cols-[100px_repeat(6,1fr)] bg-surface-container-low/50 border-b border-outline-variant/20">
                            <div className="p-3 border-r border-outline-variant/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-surface-variant text-lg">schedule</span>
                            </div>
                            {DAYS.map((day) => {
                                const isToday = day === todayName;
                                return (
                                    <div
                                        key={day}
                                        className={`p-3 text-center font-label text-xs uppercase tracking-widest font-bold border-r border-outline-variant/20 last:border-r-0 relative ${
                                            isToday
                                                ? 'text-primary font-extrabold bg-primary/5'
                                                : 'text-on-surface-variant'
                                        }`}
                                    >
                                        {day.slice(0, 3)}
                                        {isToday && (
                                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Time Slot Rows */}
                        <div className="bg-surface-container-lowest">
                            {TIME_SLOTS.map((slot) => (
                                <div key={slot.id} className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-outline-variant/10 last:border-b-0">
                                    {/* Time Label */}
                                    <div className="p-2 text-right font-label text-[11px] text-on-surface-variant font-medium border-r border-outline-variant/20 flex flex-col justify-center items-end pr-3">
                                        <span className="font-mono">{slot.start}</span>
                                        <span className="font-mono text-[9px] text-on-surface-variant/50">{slot.end}</span>
                                    </div>

                                    {/* Day Cells */}
                                    {DAYS.map((day) => {
                                        const entry = TIMETABLE.find((t) => t.day === day && t.slotId === slot.id);
                                        const isToday = day === todayName;
                                        const subject = entry?.subjectId ? getSubjectById(entry.subjectId) : null;
                                        const colors = subject ? SUBJECT_COLORS[subject.id] : null;
                                        const isActiveNow = isToday && getSlotStatus(slot.id) === 'active' && subject;

                                        // Special slot types
                                        if (slot.type === 'lunch') {
                                            if (day === DAYS[0]) {
                                                return (
                                                    <div key={day} className="col-span-6 bg-surface-container-low/50 flex items-center justify-center h-10 border-b border-outline-variant/10">
                                                        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-sm">restaurant</span> Lunch Break
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return null; // colspan handles the rest
                                        }

                                        if (slot.type === 'buffer') {
                                            if (day === DAYS[0]) {
                                                return (
                                                    <div key={day} className="col-span-6 bg-surface-container-low/30 flex items-center justify-center h-10 border-b border-outline-variant/10">
                                                        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-sm">timer</span> Buffer
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }

                                        return (
                                            <div
                                                key={day}
                                                className={`p-1.5 border-r border-outline-variant/20 last:border-r-0 min-h-[60px] ${
                                                    isToday ? 'bg-primary/[0.02]' : ''
                                                }`}
                                            >
                                                {subject ? (
                                                    <div
                                                        className={`h-full rounded-md p-2 border-l-[3px] ${colors?.border || 'border-l-outline-variant'} ${
                                                            isActiveNow
                                                                ? `${colors?.activeBg} border ${colors?.activeBorder} shadow-sm`
                                                                : `${colors?.bg || 'bg-surface-container-low'} hover:shadow-sm`
                                                        } transition-all cursor-pointer`}
                                                    >
                                                        <p className={`font-headline text-[12px] font-bold leading-tight ${isActiveNow ? colors?.activeText : 'text-on-surface'}`}>
                                                            {subject.shortName}
                                                        </p>
                                                        <p className="text-[9px] text-on-surface-variant font-medium mt-0.5">
                                                            {subject.year}
                                                        </p>
                                                        {isActiveNow && (
                                                            <div className="flex items-center gap-1 mt-1">
                                                                <span className="relative flex h-1.5 w-1.5">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                                                </span>
                                                                <span className="text-[8px] font-bold uppercase text-green-600 tracking-wider">LIVE</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex items-center justify-center">
                                                        <span className="text-[10px] text-on-surface-variant/30 font-medium">—</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sunday note footer */}
                <div className="p-4 border-t border-outline-variant/10 flex items-center gap-2 bg-surface-container-low/30">
                    <span className="material-symbols-outlined text-sm text-on-surface-variant/50">info</span>
                    <span className="text-[11px] text-on-surface-variant/60 font-medium">Sunday: Holiday — No classes scheduled</span>
                </div>
            </section>

            {/* ─── Floating Current Class Popup ─── */}
            {currentClass && currentClass.subject && (
                <div className="fixed bottom-8 right-8 z-50 w-80 bg-surface-container-lowest rounded-xl p-6 shadow-xl border border-outline-variant/20 transform transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-outline-variant/10">
                        <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-label text-[10px] font-extrabold text-green-600 uppercase tracking-widest">Class Active</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SUBJECT_COLORS[currentClass.subject.id]?.badge || 'bg-surface-container-high text-on-surface-variant'}`}>
                            {currentClass.subject.year}
                        </span>
                    </div>
                    <h4 className="font-headline text-lg font-extrabold text-on-surface tracking-tight leading-tight mb-3">
                        {currentClass.subject.name}
                    </h4>
                    <div className="space-y-2 mb-6">
                        <p className="flex items-center gap-2 text-on-surface font-semibold text-sm">
                            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                            {currentClass.slot?.label}
                        </p>
                        <p className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                            <span className="material-symbols-outlined text-[18px] text-primary">school</span>
                            {currentClass.subject.shortName} — {currentClass.subject.yearFull}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/attendance', { state: { autoFill: true } })}
                        className="w-full bg-primary text-white font-headline font-bold text-sm py-3 px-4 rounded-lg hover:bg-primary-dim transition-colors focus:ring-2 focus:ring-primary/50 focus:outline-none flex items-center justify-center gap-2 shadow-sm hover:shadow"
                    >
                        Take Attendance
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            )}
        </>
    );
}
