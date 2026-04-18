import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSubjectById } from '../lib/seedData';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

export default function FaceAttendance() {
    const navigate = useNavigate();
    const location = useLocation();
    const { course, cohort, sessionId } = location.state || {};
    
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [detectedCount, setDetectedCount] = useState(0);

    const subject = course ? getSubjectById(course) : null;

    useEffect(() => {
        if (!sessionId) return;
        const unsubscribe = onSnapshot(doc(db, 'attendance_sessions', sessionId), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                if (data.presentStudents) {
                    setDetectedCount(data.presentStudents.length);
                }
            }
        });
        return () => unsubscribe();
    }, [sessionId]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleStop();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleStop = async () => {
        if (sessionId) {
            try {
                await updateDoc(doc(db, 'attendance_sessions', sessionId), { status: 'closed' });
            } catch(e) {
                console.error("Error closing session:", e);
            }
        }
        navigate('/dashboard');
    };

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    const progressPercent = ((300 - timeLeft) / 300) * 100;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <button onClick={() => navigate('/attendance')} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium mb-3">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back to Selection
                    </button>
                    <h1 className="font-headline text-2xl lg:text-3xl font-extrabold tracking-tight text-on-surface mb-1">Face Recognition Active</h1>
                    <p className="text-on-surface-variant text-sm flex items-center gap-2">
                        <span>{subject?.name || 'Unknown Course'}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span className="uppercase tracking-wider">{cohort || 'Unknown Group'}</span>
                    </p>
                </div>
                
                <button onClick={handleStop} className="px-6 py-2.5 bg-error text-white font-headline font-bold text-sm rounded-lg hover:bg-error/90 transition-colors shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined">stop_circle</span>
                    Stop Scanning
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visualizer Area */}
                <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden ambient-shadow">
                    
                    {/* Radar Circles */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <div className="w-[80%] aspect-square rounded-full border border-primary absolute animate-ping" style={{ animationDuration: '4s' }}></div>
                        <div className="w-[60%] aspect-square rounded-full border border-primary absolute opacity-50"></div>
                        <div className="w-[40%] aspect-square rounded-full border border-primary absolute opacity-70"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                            <span className="material-symbols-outlined text-primary text-5xl animate-pulse">face_retouching_natural</span>
                            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                        </div>

                        <h2 className="text-3xl font-headline font-bold text-on-surface mb-2">{minutes}:{seconds}</h2>
                        <p className="text-on-surface-variant text-sm font-medium flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Scanning via Student Apps...
                        </p>
                    </div>

                    {/* Progress Bar Bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-surface-container-high">
                        <div className="h-full bg-primary transition-all duration-1000 ease-linear" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                {/* Status Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 flex-1">
                        <h3 className="font-headline font-bold text-on-surface text-lg mb-1">Live Feed Stats</h3>
                        <p className="text-on-surface-variant text-xs mb-6">Real-time attendance processing</p>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-on-surface font-medium">Students Verified</span>
                                    <span className="text-primary font-bold">{detectedCount} / 30</span>
                                </div>
                                <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                                     <div className="h-full bg-gradient-to-r from-primary to-primary-dim transition-all duration-500" style={{ width: `${(detectedCount / 30) * 100}%` }}></div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/20">
                                    <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium mb-1">Network Quality</p>
                                    <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">wifi</span> Excellent
                                    </p>
                                </div>
                                <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/20">
                                    <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium mb-1">Confidence Score</p>
                                    <p className="text-sm font-bold text-on-surface">98.4%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary-container/20 border border-primary/20 rounded-2xl p-5 flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                        <div>
                            <h4 className="font-headline text-sm font-bold text-on-surface mb-1">How it works</h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Students mark their attendance securely from the Campus Student ERP app within a geofenced area. The system authenticates their device and face to prevent proxies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
