import React from 'react';
import { Link } from 'react-router-dom';

export default function RaisedTicketsList() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
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
                    <button className="bg-gradient-to-r from-primary to-primary-dim text-white px-4 py-2 rounded-md font-body text-sm font-medium hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        New Ticket
                    </button>
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
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <select className="bg-surface-container-highest border-none rounded-lg text-sm font-body text-on-surface focus:ring-2 focus:ring-primary py-2 pl-4 pr-8 cursor-pointer outline-none">
                            <option value="">All Subjects</option>
                            <option value="cs101">Computer Science 101</option>
                            <option value="math202">Advanced Mathematics</option>
                            <option value="phys105">Physics 105</option>
                        </select>
                        <select className="bg-surface-container-highest border-none rounded-lg text-sm font-body text-on-surface focus:ring-2 focus:ring-primary py-2 pl-4 pr-8 cursor-pointer outline-none">
                            <option value="">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
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
                            {/* Row 1 */}
                            <tr className="hover:bg-surface-container-low/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img alt="Student Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABz_qH4dfpqbprlwZGMs6oBTPgkujMAuAAEy0sxhstOBTYWqRuPI_E8VXC34A9UaLqRloHkwvcaqaa3sKLJFT9_3eOAm7i-9yp_jhlA7W2jOKTQrBnlaxtn5w8EWFpupBnpaVKRgeqXp5EPO9thsQPZmBTRLnztGEKFWFVv7uyNaY2El1B-lXCdpRgnc7LWs2BzQFmI7Knr70HEBX9O9xLadAp-g8OU3TrJPyYks6X378B6cpUw-as2260NE3fFpJ_nZAkp9vS0uof" />
                                        <div>
                                            <p className="font-medium text-on-surface">Ethan Wright</p>
                                            <p className="text-xs text-on-surface-variant">ID: 104592</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Computer Science 101</td>
                                <td className="px-6 py-4 font-medium text-on-surface">Assignment 3 Extension Request</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-error-container/20 text-error">High</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-container text-on-primary-container">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                        Open
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Oct 24, 2023</td>
                                <td className="px-6 py-4 text-right">
                                    <Link to="/tickets/1" className="text-primary hover:text-primary-dim font-medium text-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">View Details</Link>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-surface-container-low/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img alt="Student Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8a9rVwy-_h72b3nJ6X2_t1IEFrjxJjDXRABgBlsLDL-beWJa1bIxukmpjXnccvDLKvBHhLcrQGiG3ZafjIeR1gW3Dcgi7itqlHL4p9L8qUDg2phMGXN2DqL8CHkRKfUpHjXYOWqECKA-spMWalayaruftrEN1K4Myy4HCz_AubSi2DDBYC8DTyOmF4KkJxbr1GKuljXiiP7RfUYneZTX1lyV9hRNJwm-O_AcAu-FpLUG-dPx1KgN-NpMukpOamrQGTdgIhFqDeGRe" />
                                        <div>
                                            <p className="font-medium text-on-surface">Sophia Martinez</p>
                                            <p className="text-xs text-on-surface-variant">ID: 108341</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Advanced Mathematics</td>
                                <td className="px-6 py-4 font-medium text-on-surface">Clarification on Midterm Q4</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-surface-variant text-on-surface-variant">Medium</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-tertiary-container text-on-tertiary-container">
                                        <span className="material-symbols-outlined text-[12px]">sync</span>
                                        In Progress
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Oct 23, 2023</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary hover:text-primary-dim font-medium text-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">View Details</button>
                                </td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-surface-container-low/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">LD</div>
                                        <div>
                                            <p className="font-medium text-on-surface">Liam Davis</p>
                                            <p className="text-xs text-on-surface-variant">ID: 102998</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Physics 105</td>
                                <td className="px-6 py-4 font-medium text-on-surface">Lab Equipment Issue</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-error-container/20 text-error">High</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container-high text-on-surface">
                                        <span className="material-symbols-outlined text-[12px]">check_circle</span>
                                        Resolved
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Oct 20, 2023</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary hover:text-primary-dim font-medium text-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">View Details</button>
                                </td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-surface-container-low/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img alt="Student Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh1_NUbRPq_EBTraEfTg-UxDVVipFNkJflQG5oG8-AbSmj5kc5SEkl30IM5L-SitmUMO5UOcu5KOi8pfA_woLxFLMVdC9eyo2Awfm392Vnx_FvEPfi7nZawvELDew4tafJEtKSPIkixu1tAAwJ9uD5195VChDT2FlJfPVMM2aYi8zexwooo94UmNrE6bDBkzDCd69dJjPgC4AcFHSO-bDHr6MKTQyo9sri5c-aBotG0rFIJLRMQk30o61tIqNg7uJvCldwUJ7kc5bQ" />
                                        <div>
                                            <p className="font-medium text-on-surface">Olivia Wilson</p>
                                            <p className="text-xs text-on-surface-variant">ID: 109223</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Computer Science 101</td>
                                <td className="px-6 py-4 font-medium text-on-surface">Access to Course Materials</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-surface-container text-on-surface-variant">Low</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-container text-on-primary-container">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                        Open
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-on-surface-variant">Oct 24, 2023</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary hover:text-primary-dim font-medium text-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">View Details</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-outline-variant/15 flex items-center justify-between bg-surface-container-lowest">
                    <p className="text-sm text-on-surface-variant">Showing 1 to 4 of 24 tickets</p>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-md hover:bg-surface-container-high text-on-surface-variant transition-colors disabled:opacity-50" disabled>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="p-2 rounded-md hover:bg-surface-container-high text-on-surface-variant transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
