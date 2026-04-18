import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function AssignmentOverview() {
    const { currentUser } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        // Query assignments strictly for this faculty
        const q = query(
            collection(db, 'assignments'),
            where('facultyId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = [];
            snapshot.forEach(doc => {
                fetched.push({ id: doc.id, ...doc.data() });
            });
            // Sort in memory to avoid needing a Firestore composite index immediately
            fetched.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
            setAssignments(fetched);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching assignments:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    // Active tasks count
    const activeTasks = assignments.filter(a => a.status === 'Active').length;

    return (
        <div className="relative pb-24">
            {/* Page Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
                <div>
                    <p className="text-xs font-label uppercase tracking-widest text-outline mb-1">Curriculum Management</p>
                    <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Assignment Overview</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button className="px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-body font-medium hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filter
                    </button>
                    <Link to="/assignments/new" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-white font-body font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0px_8px_16px_rgba(0,90,194,0.15)]">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                        New Assignment
                    </Link>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-low transition-colors cursor-default ambient-shadow">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim"></div>
                    <p className="text-sm font-label text-outline mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">pending_actions</span> Active Tasks</p>
                    <p className="text-3xl font-headline font-bold text-on-surface">{activeTasks}</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-low transition-colors cursor-default ambient-shadow">
                    <div className="absolute top-0 left-0 w-full h-1 bg-tertiary-container"></div>
                    <p className="text-sm font-label text-outline mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">rule</span> Total Assignments</p>
                    <p className="text-3xl font-headline font-bold text-on-surface">{assignments.length}</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-low transition-colors cursor-default ambient-shadow">
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container"></div>
                    <p className="text-sm font-label text-outline mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">check_circle</span> Total Submissions</p>
                    <p className="text-3xl font-headline font-bold text-on-surface">
                        {assignments.reduce((acc, curr) => acc + (curr.submissionsCount || 0), 0)}
                    </p>
                </div>
            </div>

            {/* Main Assignment List */}
            <div className="bg-surface-container-lowest rounded-xl flex flex-col pt-2 ambient-shadow overflow-x-auto border border-outline-variant/20">
                <div className="min-w-[800px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-surface-container-low/50 rounded-t-xl text-xs font-label uppercase tracking-widest text-outline">
                        <div className="col-span-4">Assignment Title</div>
                        <div className="col-span-2">Target Course</div>
                        <div className="col-span-2">Deadline</div>
                        <div className="col-span-2">Submissions</div>
                        <div className="col-span-2 text-right">Status</div>
                    </div>

                    {/* List Items */}
                    <div className="flex flex-col gap-2 p-2 w-full">
                        {isLoading ? (
                            <div className="py-12 text-center text-on-surface-variant flex flex-col items-center">
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p>Loading assignments...</p>
                            </div>
                        ) : assignments.length === 0 ? (
                            <div className="py-12 text-center flex flex-col items-center">
                                <span className="material-symbols-outlined text-4xl text-outline mb-3">folder_off</span>
                                <h3 className="font-headline font-bold text-on-surface text-lg mb-1">No assignments yet</h3>
                                <p className="text-on-surface-variant text-sm mb-4">Create your first assignment to get started.</p>
                                <Link to="/assignments/new" className="px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-medium text-sm hover:brightness-95 transition-all">
                                    Create Assignment
                                </Link>
                            </div>
                        ) : (
                            assignments.map((asmnt) => {
                                // Calculate submission percentage
                                const submittedPercentage = asmnt.enrolledCount > 0 
                                    ? Math.round((asmnt.submissionsCount / asmnt.enrolledCount) * 100) 
                                    : 0;

                                return (
                                    <div key={asmnt.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden">
                                        <div className={`absolute left-0 top-0 h-full w-1 ${asmnt.status === 'Active' ? 'bg-primary' : 'bg-outline-variant'} rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                        
                                        <div className="col-span-4">
                                            <h3 className={`font-headline font-bold text-base transition-colors ${asmnt.status === 'Active' ? 'text-on-surface group-hover:text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                                                {asmnt.title}
                                            </h3>
                                            <p className="text-sm text-outline mt-0.5">{asmnt.courseName || asmnt.courseId}</p>
                                        </div>
                                        
                                        <div className="col-span-2 flex flex-col justify-center">
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-medium w-max uppercase tracking-wider">
                                                {asmnt.cohort} Cohort
                                            </span>
                                        </div>
                                        
                                        <div className="col-span-2 flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                            <span className={`material-symbols-outlined text-[18px] ${asmnt.status === 'Active' ? 'text-primary' : ''}`}>
                                                calendar_month
                                            </span>
                                            {asmnt.deadline || 'No deadline'}
                                        </div>
                                        
                                        <div className="col-span-2">
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="font-medium text-on-surface">{asmnt.submissionsCount} / {asmnt.enrolledCount || 0}</span>
                                                <span className="text-outline">{submittedPercentage}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${asmnt.status === 'Active' ? 'bg-primary' : 'bg-outline-variant'}`} style={{ width: `${submittedPercentage}%` }}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-2 flex justify-end">
                                            {asmnt.status === 'Active' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wide">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold uppercase tracking-wide">
                                                    Closed
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
