import React from 'react';
import { Link } from 'react-router-dom';

export default function TicketDetail() {
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
            {/* Breadcrumbs & Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <nav className="flex items-center gap-2 text-sm font-body text-on-surface-variant mb-3">
                        <Link to="/tickets" className="hover:text-primary transition-colors">Tickets</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-on-surface font-medium">TCK-8924</span>
                    </nav>
                    <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Grade Discrepancy Inquiry</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="px-5 py-2.5 rounded-lg font-headline font-semibold text-sm bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 outline-none">
                        <span className="material-symbols-outlined text-[18px]">done_all</span>
                        Mark as Resolved
                    </button>
                    <button className="px-5 py-2.5 rounded-lg font-headline font-semibold text-sm bg-gradient-to-r from-primary to-primary-dim text-on-primary hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm outline-none">
                        <span className="material-symbols-outlined text-[18px]">reply</span>
                        Reply & Close
                    </button>
                </div>
            </div>

            {/* Bento Layout: Ticket Context (Left) + Chat (Right) */}
            <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-14rem)]">
                {/* Left Pane: Ticket Details Context */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    {/* Meta Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow relative overflow-hidden border border-outline-variant/10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <img alt="Student" className="w-12 h-12 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClMtHULNpcoNwTGdqjC97_uSMvXPucCiQl5SJStTgOzi0eRR5eeRgnOZ7bzfvOgmMMN7J-VcEcytig_UCxriXHLVF49UQAFn9u6U4xdKmLG2V03DVGIqWNFeSk0xawEQG-VZT1GBzxN8hQHEJroEldP9T1eHvqgW12B38L9BhWQM_IOYIq2lJbRVvFlTeqDtnRVfnoCSwV_if_OMhYUjYuEIHAbyes0XSEGDdIaqfjpLOClQS9wt63bYeELEHlmVU7EjujA5ZzPlJB" />
                                <div>
                                    <h3 className="font-headline font-bold text-lg text-on-surface leading-tight">Sarah Jenkins</h3>
                                    <p className="font-body text-sm text-on-surface-variant">CS301 - Data Structures</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold font-headline uppercase tracking-wider">Open</span>
                        </div>
                        <div className="space-y-4 font-body text-sm">
                            <div className="flex flex-col sm:flex-row sm:border-b border-surface-container-highest sm:pb-3 pb-1">
                                <span className="w-32 text-on-surface-variant font-medium">Ticket ID</span>
                                <span className="text-on-surface font-semibold">TCK-8924</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:border-b border-surface-container-highest sm:pb-3 pb-1">
                                <span className="w-32 text-on-surface-variant font-medium">Category</span>
                                <span className="text-on-surface font-semibold">Assessment & Grading</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:border-b border-surface-container-highest sm:pb-3 pb-1">
                                <span className="w-32 text-on-surface-variant font-medium">Date Raised</span>
                                <span className="text-on-surface font-semibold">Oct 24, 2023 • 09:41 AM</span>
                            </div>
                            <div className="flex flex-col sm:flex-row">
                                <span className="w-32 text-on-surface-variant font-medium">Priority</span>
                                <span className="text-error font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">priority_high</span> High
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Original Description Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow flex-1 border border-outline-variant/10 flex flex-col max-h-[500px] lg:max-h-none">
                        <h4 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Original Request</h4>
                        <div className="bg-surface-container-low rounded-lg p-5 font-body text-sm text-on-surface leading-relaxed flex-1 overflow-y-auto">
                            <p>Dear Dr. Thompson,</p>
                            <br />
                            <p>I am writing to request a review of my grade for Midterm Project 2. The portal shows I received a 78/100, but according to the rubric provided and the feedback left on my code repository, I believe there might be a miscalculation in the final tally, specifically regarding the "Algorithmic Efficiency" section where I received full marks but it seems 0 points were added to the total.</p>
                            <br />
                            <p>I have attached my local scoring sheet for reference. Could you please take a look when you have a moment?</p>
                            <br />
                            <p>Thank you,<br />Sarah</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-surface-container-highest">
                            <a href="#" className="flex items-center gap-2 text-sm font-body text-primary hover:text-primary-dim transition-colors">
                                <span className="material-symbols-outlined text-[18px]">attach_file</span>
                                <span className="underline underline-offset-2">sarah_midterm_scoring.pdf</span>
                                <span className="text-xs text-on-surface-variant ml-auto no-underline">1.2 MB</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Chat Interface */}
                <div className="w-full lg:w-2/3 bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/10 flex flex-col overflow-hidden relative h-[600px] lg:h-auto">
                    {/* Chat Header */}
                    <div className="bg-surface-container-low/50 px-6 py-4 border-b border-surface-container-highest flex justify-between items-center z-10">
                        <h3 className="font-headline font-bold text-on-surface">Communication Thread</h3>
                        <span className="text-xs font-body text-on-surface-variant bg-surface px-3 py-1 rounded-full border border-outline-variant/20 hidden sm:block">Response Time: Target &lt; 24h</span>
                    </div>

                    {/* Chat Messages Area */}
                    {/* Inline SVG data URI for dot pattern background */}
                    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23a9b4b9' fill-opacity='0.1'/%3E%3C/svg%3E\")" }}>
                        {/* System Note */}
                        <div className="flex justify-center my-2">
                            <span className="text-xs font-body text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Ticket created on Oct 24, 09:41 AM</span>
                        </div>

                        {/* Faculty Reply */}
                        <div className="flex gap-4 flex-row-reverse items-end">
                            <img alt="Faculty" className="w-8 h-8 rounded-full object-cover shrink-0 border border-surface-container-lowest shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGN0EwDrtAJGVJO1FVw19cpzs7AIH1lLlmMBCNmi6jySug4g-RZKkjIm7snrQc3Z2_132r0Rksod6zdIthcriLOSWKsfcd8qqF4z6z9-41EWfueQa9_uf1iwAHfI3cPHgl3u75bATLpruMLiCip2gM_L9HKXHbWiaCMZ9E98N48NGLwdYQBghxdj6PM9r3cmR-EPnJBy1eri1SJyRowFezQ64UEbZkyUMMqGCiEI_Cs-XyutckhyeCAs9Uk6rIYGn7X-F_uOLzg9jt" />
                            <div className="flex flex-col items-end max-w-[85%] sm:max-w-[80%]">
                                <span className="text-[11px] font-body text-on-surface-variant mb-1 ml-2">You • Oct 24, 11:30 AM</span>
                                <div className="bg-primary-container text-on-primary-container p-4 rounded-2xl rounded-br-sm shadow-sm font-body text-sm leading-relaxed">
                                    <p>Hi Sarah, I see your message. Let me review the rubric and the specific scoring section for "Algorithmic Efficiency" against your submission. I will get back to you by this afternoon.</p>
                                </div>
                            </div>
                        </div>

                        {/* Student Reply */}
                        <div className="flex gap-4 items-end">
                            <img alt="Student" className="w-8 h-8 rounded-full object-cover shrink-0 border border-surface-container-lowest shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEuDcsbekw7Rtd5LO3yxyv_SKaWCPwVBMZO-M-gpDnys15F5F2_3-zRWJyBC0rJkU8wWHTh1hpFgAy-mEUqHJwocGRUfl5aECI973K95IR0i6xOvGnD6UTCszHUUAKtXvKciHEyKtCiDvGm9_W4areHCWnJcx93Arp5_n7hPV2Z_Ys_jWdGUVd5L1wYtZXTuCIFcQddQRdVjJ_C3qCuj2En5UuODVNt_vmlG935QsId9hPPBcLN2FE0yz8mHWNM9n4NLqFMTYcHUv-" />
                            <div className="flex flex-col items-start max-w-[85%] sm:max-w-[80%]">
                                <span className="text-[11px] font-body text-on-surface-variant mb-1 mr-2">Sarah Jenkins • Oct 24, 11:45 AM</span>
                                <div className="bg-surface-container-high text-on-surface p-4 rounded-2xl rounded-bl-sm shadow-sm font-body text-sm leading-relaxed">
                                    <p>Thank you Dr. Thompson. I appreciate you looking into this so quickly.</p>
                                </div>
                            </div>
                        </div>

                        {/* Faculty Reply 2 */}
                        <div className="flex gap-4 flex-row-reverse items-end">
                            <img alt="Faculty" className="w-8 h-8 rounded-full object-cover shrink-0 border border-surface-container-lowest shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCARHgCE8pXN-3Ir65-zih3JoRJlK-P5yJI_4UmvxO82k_eIh1U9wPuTV75kH9HRofXTZT971ccTFxYNA16lDXvn2X5Y_blUpMpkBNopwbXHjEXu5LsJLEBb2QW3cSkGpoN89gFbR3CoIZAg81XQDfq1Zq0rZanJ6Uo9z33OgEofWxCh0_bAFg6Db1YFdxhXQi0ExnN-ay7TuMd3cwrDjswOqBHvzGltNtm5dX1pmzhMzZ5ooDptfjccXe1RJOfR05kyYszU_wdWhPr" />
                            <div className="flex flex-col items-end max-w-[85%] sm:max-w-[80%]">
                                <span className="text-[11px] font-body text-on-surface-variant mb-1 ml-2">You • Oct 24, 02:15 PM</span>
                                <div className="bg-primary-container text-on-primary-container p-4 rounded-2xl rounded-br-sm shadow-sm font-body text-sm leading-relaxed">
                                    <p>Sarah, you were absolutely right. There was a glitch in the script that aggregates the rubrics, and the 15 points for Algorithmic Efficiency were not added to the final sum.</p>
                                    <br />
                                    <p>I have updated your grade in the system to a 93/100. This should reflect on your dashboard shortly.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-surface-container-lowest border-t border-surface-container-highest z-10 block">
                        <div className="flex items-end gap-2 sm:gap-3 bg-surface p-2 rounded-xl border border-outline-variant/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <button className="hidden sm:block p-2.5 text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/30 rounded-lg shrink-0 outline-none">
                                <span className="material-symbols-outlined">add_circle</span>
                            </button>
                            <textarea className="w-full bg-transparent border-none focus:ring-0 resize-none font-body text-sm py-2.5 px-2 placeholder:text-on-surface-variant/50 text-on-surface outline-none" placeholder="Type your formal response..." rows="2"></textarea>
                            <div className="flex gap-1 sm:gap-2 shrink-0 p-1">
                                <button className="hidden sm:block p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/30 rounded-lg outline-none">
                                    <span className="material-symbols-outlined">format_list_bulleted</span>
                                </button>
                                <button className="px-4 sm:px-5 py-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm outline-none">
                                    <span className="hidden sm:inline">Send</span>
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                </button>
                            </div>
                        </div>
                        <p className="text-[10px] font-body text-center text-on-surface-variant mt-2">All communications are logged securely in the academic record system.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
