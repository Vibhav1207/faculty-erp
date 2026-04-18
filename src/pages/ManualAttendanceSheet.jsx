import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStudentsByYear, getSubjectById, TIME_SLOTS } from '../lib/seedData';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function ManualAttendanceSheet() {
    const location = useLocation();
    const navigate = useNavigate();
    const { course, cohort, timeSlot, sessionId } = location.state || {};

    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({}); // { studentId: 'present' | 'absent' | null }
    const [searchQuery, setSearchQuery] = useState('');

    const subject = course ? getSubjectById(course) : { name: 'Unknown Course', code: 'N/A' };
    const timeSlotObj = TIME_SLOTS.find(t => t.id === timeSlot);

    useEffect(() => {
        const yearGroup = cohort || 'fy';
        const fetchedStudents = getStudentsByYear(yearGroup);
        setStudents(fetchedStudents);
        
        const initialMap = {};
        fetchedStudents.forEach(s => {
            initialMap[s.id] = 'present'; // Default assumption for bulk marking, or keep null
        });
        setAttendance(initialMap);
    }, [cohort]);

    const handleMarkAll = (status) => {
        const newMap = {};
        students.forEach(s => newMap[s.id] = status);
        setAttendance(newMap);
    };

    const toggleStatus = (id, status) => {
        setAttendance(prev => ({ ...prev, [id]: status }));
    };

    const handleSave = async () => {
        if (sessionId) {
            try {
                const presentStudents = Object.keys(attendance).filter(id => attendance[id] === 'present');
                
                await updateDoc(doc(db, 'attendance_sessions', sessionId), {
                    status: 'closed',
                    presentStudents,
                    attendanceMap: attendance 
                });
            } catch(e) {
                console.error("Error saving attendance map", e);
            }
        }
        navigate('/dashboard');
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative pb-32">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Page Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                        <button onClick={() => navigate('/attendance')} className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                        </button>
                        <h2 className="font-headline text-4xl md:text-5xl text-on-surface font-semibold tracking-[-0.02em]">Manual Attendance</h2>
                    </div>
                    
                    {/* Context Card */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden relative ambient-shadow flex flex-col sm:flex-row justify-between sm:items-center p-6 gap-4">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dim"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-headline font-bold text-xl text-on-surface">{subject.code}: {subject.name}</h3>
                                <span className="bg-tertiary-container text-on-tertiary-container text-xs px-2 py-1 rounded-sm font-semibold tracking-wider uppercase">
                                    {(cohort || 'fy').toUpperCase()} Cohort
                                </span>
                            </div>
                            <p className="text-sm text-on-surface-variant font-medium">
                                {timeSlotObj?.label || 'Time not selected'} • {students.length} Students
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-lg">
                            <span className="font-headline font-semibold text-on-surface w-fit text-center">Live Roster</span>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
                    <div className="relative w-full sm:w-72">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">search</span>
                        <input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-surface-container-highest border-none rounded-lg text-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all font-medium outline-none" 
                            placeholder="Find student..." 
                            type="text" 
                        />
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-on-surface-variant mr-2">Bulk Actions:</span>
                        <button onClick={() => handleMarkAll('present')} className="px-4 py-2 bg-surface-container-high hover:bg-surface-dim text-on-surface rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">done_all</span>
                            Mark All Present
                        </button>
                        <button onClick={() => handleMarkAll('absent')} className="px-4 py-2 text-error hover:bg-error-container/20 rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">clear_all</span>
                            Mark All Absent
                        </button>
                    </div>
                </div>

                {/* Data List */}
                <div className="space-y-2 mt-4">
                    <div className="grid grid-cols-[3fr_1fr_2fr] gap-4 px-6 pb-2 text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                        <div>Student Details</div>
                        <div className="text-center">Recent Trend</div>
                        <div className="text-right pr-4">Status</div>
                    </div>

                    {filteredStudents.map(student => (
                        <div key={student.id} className="bg-surface-container-lowest rounded-xl p-4 grid grid-cols-[3fr_1fr_2fr] items-center gap-4 group hover:bg-surface-container-low transition-colors duration-200">
                            <div className="flex items-center gap-4">
                                <img alt={student.name} className="w-10 h-10 rounded-full" src={student.avatar} />
                                <div>
                                    <div className="font-headline font-semibold text-on-surface">{student.name}</div>
                                    <div className="text-xs text-on-surface-variant mt-0.5">Roll: {student.rollNumber}</div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                {/* Mock Trend */}
                                <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                                <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                            </div>
                            <div className="flex justify-end">
                                <div className="flex bg-surface-container-low rounded-lg p-1 gap-1">
                                    <button 
                                        onClick={() => toggleStatus(student.id, 'present')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${attendance[student.id] === 'present' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                                    >
                                        Present
                                    </button>
                                    <button 
                                        onClick={() => toggleStatus(student.id, 'absent')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${attendance[student.id] === 'absent' ? 'bg-error-container text-on-error-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                                    >
                                        Absent
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredStudents.length === 0 && (
                        <div className="text-center py-12 text-on-surface-variant">
                            No students match your search.
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Save Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button onClick={handleSave} className="bg-gradient-to-b from-primary to-primary-dim text-white rounded-xl px-8 py-4 font-headline tracking-tight ambient-shadow hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">save</span>
                    <span className="font-bold text-lg">Save Register</span>
                </button>
            </div>
        </div>
    );
}
