import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function RaisedTicketsList() {
    const { currentUser } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        // Query tickets assigned to this faculty
        const q = query(
            collection(db, 'tickets'),
            where('facultyId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = [];
            snapshot.forEach(doc => {
                fetched.push({ id: doc.id, ...doc.data() });
            });
            // Sort by createdAt desc in memory
            fetched.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
            setTickets(fetched);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching tickets:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-error-container/20 text-error';
            case 'medium': return 'bg-surface-variant text-on-surface-variant';
            case 'low': return 'bg-surface-container text-on-surface-variant';
            default: return 'bg-surface-variant text-on-surface-variant';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'bg-primary-container text-on-primary-container';
            case 'in-progress': return 'bg-tertiary-container text-on-tertiary-container';
            case 'resolved': return 'bg-surface-container-high text-on-surface';
            default: return 'bg-surface-container-high text-on-surface';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'fiber_manual_record'; // A small dot usually
            case 'in-progress': return 'sync';
            case 'resolved': return 'check_circle';
            default: return 'fiber_manual_record';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-24">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Raised Tickets</h1>
                    <p className="text-sm text-on-surface-variant font-body mt-1">Manage and respond to student inquiries and issues.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-md font-body text-sm font-medium hover:bg-surface-variant transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter
                    </button>
                    {/* Faculty generally do not create tickets for students, but button is kept for UI consistency */}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden border border-outline-variant/20">
                {/* Toolbar */}
                <div className="p-6 border-b border-outline-variant/15 flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-container-lowest relative z-10">
                    <div className="relative w-full sm:w-96">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input className="w-full pl-10 pr-4 py-2 bg-surface-container-highest border-none rounded-lg text-sm font-body text-on-surface focus:ring-2 focus:ring-primary focus:outline-none transition-shadow outline-none" placeholder="Search by student or topic..." type="text" />
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low border-b border-outline-variant/15">
                                <th className="px-6 py-4 text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">Student</th>
                                <th className="px-6 py-4 text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-4 text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">Topic</th>
                                <th className="px-6 py-4 text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">Date Raised</th>
                                <th className="px-6 py-4 text-right text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/15 font-body text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-on-surface-variant">
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        Loading tickets...
                                    </td>
                                </tr>
                            ) : tickets.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-on-surface-variant">
                                        <span className="material-symbols-outlined text-4xl mb-2 text-outline">inbox</span>
                                        <p>No active tickets. Good job!</p>
                                    </td>
                                </tr>
                            ) : (
                                tickets.map(ticket => (
                                    <tr key={ticket.id} className="hover:bg-surface-container-low/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                                                    {ticket.studentAvatar ? (
                                                        <img src={ticket.studentAvatar} alt={ticket.studentName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        ticket.studentName?.substring(0,2) || 'ST'
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-on-surface">{ticket.studentName || 'Unknown Student'}</p>
                                                    <p className="text-xs text-on-surface-variant">ID: {ticket.studentId?.substring(0,6) || '---'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-on-surface-variant">{ticket.courseName || ticket.courseId || 'General'}</td>
                                        <td className="px-6 py-4 font-medium text-on-surface">{ticket.subject || 'No Subject'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium ${getPriorityColor(ticket.priority)} uppercase tracking-wider`}>
                                                {ticket.priority || 'Medium'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                                {ticket.status?.toLowerCase() === 'open' ? (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                                ) : (
                                                    <span className="material-symbols-outlined text-[12px]">{getStatusIcon(ticket.status)}</span>
                                                )}
                                                <span className="capitalize">{ticket.status || 'open'}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-on-surface-variant">
                                            {ticket.createdAt?.toDate ? ticket.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/tickets/${ticket.id}`} className="text-primary hover:text-primary-dim font-medium text-sm transition-colors md:opacity-0 md:group-hover:opacity-100 uppercase tracking-wide">
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
