import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { getSubjectById } from '../lib/seedData';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

export default function QRAttendance() {
    const navigate = useNavigate();
    const location = useLocation();
    const { course, cohort, sessionId } = location.state || {};
    
    const [qrCodeData, setQrCodeData] = useState('');
    const [timeLeft, setTimeLeft] = useState(10); // 10 second refresh
    const [scannedCount, setScannedCount] = useState(0);

    const subject = course ? getSubjectById(course) : null;

    // Generate random string for QR (also encode sessionId if active)
    const generateNewToken = () => {
        const token = Math.random().toString(36).substring(2, 15);
        setQrCodeData(`facnexus_att_${sessionId || 'demo'}_${course}_${cohort}_${token}`);
    };

    // Initialize first token and listener
    useEffect(() => {
        generateNewToken();
        
        if (!sessionId) return;
        const unsubscribe = onSnapshot(doc(db, 'attendance_sessions', sessionId), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                if (data.presentStudents) {
                    setScannedCount(data.presentStudents.length);
                }
            }
        });
        return () => unsubscribe();
    }, [sessionId]);

    // 10 second loop
    useEffect(() => {
        if (timeLeft <= 0) {
            generateNewToken();
            setTimeLeft(10);
            return;
        }
        
        const tick = setInterval(() => {
            setTimeLeft(prev => prev - 0.1);
        }, 100);
        
        return () => clearInterval(tick);
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

    const progressPercent = (timeLeft / 10) * 100;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <button onClick={() => navigate('/attendance')} className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium mb-3">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back to Selection
                    </button>
                    <h1 className="font-headline text-2xl lg:text-3xl font-extrabold tracking-tight text-on-surface mb-1">Dynamic QR Projection</h1>
                    <p className="text-on-surface-variant text-sm flex items-center gap-2">
                        <span>{subject?.name || 'Unknown Course'}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span className="uppercase tracking-wider">{cohort || 'Unknown Group'}</span>
                    </p>
                </div>
                
                <button onClick={handleStop} className="px-6 py-2.5 bg-error text-white font-headline font-bold text-sm rounded-lg hover:bg-error/90 transition-colors shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined">stop_circle</span>
                    Close QR Code
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* QR Code Canvas */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-8 lg:p-12 border-2 border-surface-container shadow-xl flex flex-col items-center justify-center relative shadow-primary/5">
                    
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10 mb-8">
                        {qrCodeData ? (
                            <QRCode
                                value={qrCodeData}
                                size={280}
                                level="H"
                                bgColor="#ffffff"
                                fgColor="#1e293b" // slate-800
                            />
                        ) : (
                            <div className="w-[280px] h-[280px] bg-slate-100 animate-pulse rounded-lg"></div>
                        )}
                    </div>
                    
                    <div className="w-full max-w-sm">
                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                            <span>Refreshing code in</span>
                            <span className={timeLeft < 3 ? 'text-error' : ''}>{Math.ceil(timeLeft)}s</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
                            <div 
                                className={`h-full rounded-full transition-all duration-100 ease-linear ${timeLeft < 3 ? 'bg-error' : 'bg-primary'}`}
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                    
                </div>

                {/* Status Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow">
                        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-2xl">how_to_reg</span>
                        </div>
                        <h3 className="font-headline font-bold text-on-surface text-xl mb-1">Live Scans</h3>
                        <p className="text-on-surface-variant text-sm mb-6">Students joined via app</p>

                        <div className="relative pt-4">
                            <div className="flex justify-between items-baseline mb-2 border-b border-outline-variant/20 pb-4">
                                <span className="text-4xl font-extrabold text-primary">{scannedCount}</span>
                                <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">/ 30 Enrolled</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                        <h4 className="font-headline text-sm font-bold text-primary mb-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                            Instructions for Students
                        </h4>
                        <ol className="text-xs text-on-surface-variant space-y-2 list-decimal list-inside marker:text-primary marker:font-bold">
                            <li>Open the <strong>Student ERP App</strong>.</li>
                            <li>Tap on <strong>"Scan Class QR"</strong>.</li>
                            <li>Point the camera at this screen.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
