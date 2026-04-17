import React from 'react';

export default function ManualAttendanceSheet() {
    return (
        <div className="relative">
            {/* Main Canvas (The Breathing Room) */}
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Page Header (Editorial Voice) */}
                <div className="space-y-4">
                    <h2 className="font-headline text-5xl md:text-6xl text-on-surface font-semibold tracking-[-0.02em]">Manual Attendance</h2>
                    
                    {/* Context Card with Progress Ribbon */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden relative ambient-shadow flex flex-col sm:flex-row justify-between sm:items-center p-6 gap-4">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dim"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-headline font-bold text-xl text-on-surface">CS401: Advanced Algorithms</h3>
                                <span className="bg-tertiary-container text-on-tertiary-container text-xs px-2 py-1 rounded-sm font-semibold tracking-wider uppercase">CORE</span>
                            </div>
                            <p className="text-sm text-on-surface-variant font-medium">Fall 2024 • Section A • 45 Students</p>
                        </div>
                        
                        {/* Date Selector */}
                        <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-lg">
                            <button className="text-on-surface-variant hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <span className="font-headline font-semibold text-on-surface w-32 text-center">Oct 24, 2024</span>
                            <button className="text-on-surface-variant hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Toolbar (Asymmetric Layout) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
                    {/* Specific Search */}
                    <div className="relative w-full sm:w-72">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">search</span>
                        <input className="w-full pl-11 pr-4 py-3 bg-surface-container-highest border-none rounded-lg text-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all font-medium outline-none" placeholder="Find student..." type="text" />
                    </div>
                    
                    {/* Bulk Actions */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-on-surface-variant mr-2">Bulk Actions:</span>
                        <button className="px-4 py-2 bg-surface-container-high hover:bg-surface-dim text-on-surface rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">done_all</span>
                            Mark All Present
                        </button>
                        <button className="px-4 py-2 text-error hover:bg-error-container/20 rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">clear_all</span>
                            Mark All Absent
                        </button>
                    </div>
                </div>

                {/* Data List (High-End Card Grids, NO 1px borders) */}
                <div className="space-y-2 mt-4">
                    {/* Table Header (Metadata look) */}
                    <div className="grid grid-cols-[3fr_1fr_2fr] gap-4 px-6 pb-2 text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                        <div>Student Details</div>
                        <div className="text-center">Recent Trend</div>
                        <div className="text-right pr-4">Status</div>
                    </div>

                    {/* Row 1 */}
                    <div className="bg-surface-container-lowest rounded-xl p-4 grid grid-cols-[3fr_1fr_2fr] items-center gap-4 group hover:bg-surface-container-low transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <img alt="Alice Freeman" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDaDyE1_RZnMtzs-oW7_wX9ivjfc_JnL3apvXseDD4NWSvXHNGFN72RcpYM7zLBz82ufO9Bfm2SCPCzigWYrr8dqX9iS8N1n-iotgK5hnpu7rkEuCFFAiz_cTKzSAeDa5Z3YLJjL9UK5AFmoTCaXEtMH_pSHgzUOYBvvReVMrng2o9zNJSMO9CMp1mY8oThGqTAYANqJcs94FwNvclSUiR0MwZBFVGWJjjWIcoMHC2Q-PELxQrBFXhN1PoLFFnMIUAqHQWiL_dsyH7" />
                            <div>
                                <div className="font-headline font-semibold text-on-surface">Alice Freeman</div>
                                <div className="text-xs text-on-surface-variant mt-0.5">Roll: CS-24-001</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex bg-surface-container-low rounded-lg p-1">
                                <button className="px-4 py-1.5 rounded-md text-sm font-semibold bg-primary-container text-on-primary-container shadow-sm transition-all">Present</button>
                                <button className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Absent</button>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-surface-container-lowest rounded-xl p-4 grid grid-cols-[3fr_1fr_2fr] items-center gap-4 group hover:bg-surface-container-low transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <img alt="Bob Chen" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB87abvRYRMxhOdO9je9lG0i7PyHMIhInWwYPqA38mEDFuP-WYdndFCSihjHnaO8nkLeB5i58YrM_0-o0eTymK0Z5r7fPtngvY_2Xe8YX4-0Bqs9V6hNkP0sKdpNp3eyWcfSzv3I7ySZDI-ctz8152MeIH59z-63Wh-A6_OEpvowi44ETZq6mqb39VCsPpqsM7iQIb64uBC_GEubMgV4cGHPnEYlUtw9fpM50XZssHwJTKV5N9tXaiieTqmPz6lIyinh1pdqhHSbuCg" />
                            <div>
                                <div className="font-headline font-semibold text-on-surface">Bob Chen</div>
                                <div className="text-xs text-on-surface-variant mt-0.5">Roll: CS-24-002</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <div className="w-2 h-2 rounded-full bg-error"></div>
                            <div className="w-2 h-2 rounded-full bg-error"></div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex bg-surface-container-low rounded-lg p-1">
                                <button className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Present</button>
                                <button className="px-4 py-1.5 rounded-md text-sm font-semibold bg-error-container text-on-error-container shadow-sm transition-all">Absent</button>
                            </div>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="bg-surface-container-lowest rounded-xl p-4 grid grid-cols-[3fr_1fr_2fr] items-center gap-4 group hover:bg-surface-container-low transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <img alt="Clara Diaz" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv3ih3DnCP7Cu-ADk_ZOGgHVA9UOYOryaxYg-7zoBCCtCHWkZVnl6-8aJ--hc2CK7_GiPo5-U6hfu4dSqvvkAy5pNTt42k8sUSfh1hgziWMvzoufc3Sz6BrN2ZWxuUakar-_ECctShT7t6_skZfp9UVH1EgzLaCIRPHwKbut6NaE-Rt6S9ye-2m3KZtR3AqBHRRfRIBfplzjrwKQMwHELZu8mCihaAlMIdMT80Kj3eiJf307lEfVBCmciClc2cOAqZDkhtHXbwVJgY" />
                            <div>
                                <div className="font-headline font-semibold text-on-surface">Clara Diaz</div>
                                <div className="text-xs text-on-surface-variant mt-0.5">Roll: CS-24-003</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex bg-surface-container-low rounded-lg p-1">
                                <button className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Present</button>
                                <button className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Absent</button>
                            </div>
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="bg-surface-container-lowest rounded-xl p-4 grid grid-cols-[3fr_1fr_2fr] items-center gap-4 group hover:bg-surface-container-low transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <img alt="David Evans" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy3xe7ezNF-wzc4E-qttQ5D9vumbWLrFahQdVaaT0VLROAJbPkOnFq4MRrUqVPtHPq54WuN7FS4zxSrVxbjQRl-GrlAW4kzuNFENCwL2GpP9eoayl7jgDW9wYqWjtBxSkuTGCENidV0mvW88iH1dNvrL5kUZTjlSSEX6rA570XExhUmrSp10BvkfFjviosJuMaokVV0d_cPZC23egisryWbYxp-nc9xlxagoXop-jvONCd9ILG8LYl1SfXXDkIy56C41sumQ8UA1Nb" />
                            <div>
                                <div className="font-headline font-semibold text-on-surface">David Evans</div>
                                <div className="text-xs text-on-surface-variant mt-0.5">Roll: CS-24-004</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex bg-surface-container-low rounded-lg p-1">
                                <button className="px-4 py-1.5 rounded-md text-sm font-semibold bg-primary-container text-on-primary-container shadow-sm transition-all">Present</button>
                                <button className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Absent</button>
                            </div>
                        </div>
                    </div>

                </div>
                
                {/* Spacer for sticky button */}
                <div className="h-24"></div>
            </div>

            {/* Sticky Save Button (Glass & Gradient) */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-gradient-to-b from-primary to-primary-dim text-white rounded-xl px-8 py-4 font-headline tracking-tight ambient-shadow hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">save</span>
                    <span className="font-bold text-lg">Save Register</span>
                </button>
            </div>
        </div>
    );
}
