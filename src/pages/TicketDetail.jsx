import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

export default function TicketDetail() {
    const { id } = useParams();
    const { currentUser, userProfile } = useAuth();
    const navigate = useNavigate();
    const chatEndRef = useRef(null);

    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        
        // Listen to ticket document
        const unsubscribeTicket = onSnapshot(doc(db, 'tickets', id), (docSnap) => {
            if (docSnap.exists()) {
                setTicket({ id: docSnap.id, ...docSnap.data() });
            } else {
                // Ticket not found
                setTicket(null);
            }
            setIsLoading(false);
        });

        // Listen to messages subcollection
        const q = query(
            collection(db, 'tickets', id, 'messages'), 
            orderBy('timestamp', 'asc')
        );
        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            const msgs = [];
            snapshot.forEach(d => msgs.push({ id: d.id, ...d.data() }));
            setMessages(msgs);
            // Scroll to bottom
            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        });

        return () => {
             unsubscribeTicket();
             unsubscribeMessages();
        };
    }, [id]);

    const handleSendReply = async () => {
        if (!newMessage.trim() || !currentUser || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'tickets', id, 'messages'), {
                senderId: currentUser.uid,
                senderName: userProfile?.name || 'Faculty',
                senderRole: 'faculty',
                text: newMessage.trim(),
                timestamp: serverTimestamp()
            });

            // Update status to 'in-progress' if it was open
            if (ticket?.status === 'open') {
                await updateDoc(doc(db, 'tickets', id), {
                    status: 'in-progress',
                    updatedAt: serverTimestamp()
                });
            }

            setNewMessage('');
        } catch (error) {
            console.error("Error sending reply:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMarkResolved = async () => {
        try {
            await updateDoc(doc(db, 'tickets', id), {
                status: 'resolved',
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error resolving ticket:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-24 text-center">
                <span className="material-symbols-outlined text-6xl text-outline mb-4">error</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Ticket Not Found</h2>
                <p className="text-on-surface-variant font-body mb-6">The ticket you are looking for does not exist or has been deleted.</p>
                <Link to="/tickets" className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-medium">Return to Tickets</Link>
            </div>
        );
    }

    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) return 'Just now';
        return timestamp.toDate().toLocaleString('en-US', { 
            month: 'short', day: 'numeric', year: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });
    };

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-24">
            {/* Breadcrumbs & Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <nav className="flex items-center gap-2 text-sm font-body text-on-surface-variant mb-3">
                        <Link to="/tickets" className="hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">Tickets</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-on-surface font-medium">TCK-{id.substring(0,6).toUpperCase()}</span>
                    </nav>
                    <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">{ticket.subject || 'Inquiry'}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {ticket.status !== 'resolved' && (
                        <button 
                            onClick={handleMarkResolved}
                            className="px-5 py-2.5 rounded-lg font-headline font-semibold text-sm bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 outline-none"
                        >
                            <span className="material-symbols-outlined text-[18px]">done_all</span>
                            Mark as Resolved
                        </button>
                    )}
                </div>
            </div>

            {/* Bento Layout: Ticket Context (Left) + Chat (Right) */}
            <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-14rem)] min-h-[600px]">
                {/* Left Pane: Ticket Details Context */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-1 custom-scrollbar">
                    {/* Meta Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow relative overflow-hidden border border-outline-variant/10 shrink-0">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg uppercase shadow-sm">
                                    {ticket.studentAvatar ? (
                                        <img src={ticket.studentAvatar} alt={ticket.studentName} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        ticket.studentName?.substring(0,2) || 'ST'
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-lg text-on-surface leading-tight">{ticket.studentName || 'Student'}</h3>
                                    <p className="font-body text-sm text-on-surface-variant">{ticket.courseName || ticket.courseId}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-wider
                                ${ticket.status === 'open' ? 'bg-primary-container text-on-primary-container' :
                                  ticket.status === 'in-progress' ? 'bg-tertiary-container text-on-tertiary-container' : 
                                  'bg-surface-variant text-on-surface-variant'
                                }
                            `}>
                                {ticket.status}
                            </span>
                        </div>
                        <div className="space-y-4 font-body text-sm">
                            <div className="flex flex-col sm:flex-row sm:border-b border-surface-container-highest sm:pb-3 pb-1">
                                <span className="w-32 text-on-surface-variant font-medium">Ticket ID</span>
                                <span className="text-on-surface font-semibold uppercase">{id.substring(0,8)}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:border-b border-surface-container-highest sm:pb-3 pb-1">
                                <span className="w-32 text-on-surface-variant font-medium">Topic</span>
                                <span className="text-on-surface font-semibold">{ticket.topic || 'General'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:border-b border-surface-container-highest sm:pb-3 pb-1">
                                <span className="w-32 text-on-surface-variant font-medium">Date Raised</span>
                                <span className="text-on-surface font-semibold">{formatDate(ticket.createdAt)}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row">
                                <span className="w-32 text-on-surface-variant font-medium">Priority</span>
                                <span className={`font-semibold flex items-center gap-1 ${ticket.priority === 'high' ? 'text-error' : 'text-on-surface'}`}>
                                    {ticket.priority === 'high' && <span className="material-symbols-outlined text-[16px]">priority_high</span>}
                                    <span className="capitalize">{ticket.priority || 'medium'}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Original Description Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow border border-outline-variant/10 flex flex-col shrink-0">
                        <h4 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Original Request</h4>
                        <div className="bg-surface-container-low rounded-lg p-5 font-body text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
                            {ticket.description || 'No description provided.'}
                        </div>
                        {ticket.attachments && ticket.attachments.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-surface-container-highest space-y-2">
                                {ticket.attachments.map((att, idx) => (
                                    <a key={idx} href={att.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-body text-primary hover:text-primary-dim transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">attach_file</span>
                                        <span className="underline underline-offset-2">{att.name}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Pane: Chat Interface */}
                <div className="w-full lg:w-2/3 bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/10 flex flex-col overflow-hidden relative lg:h-full h-[600px]">
                    {/* Chat Header */}
                    <div className="bg-surface-container-low/50 px-6 py-4 border-b border-surface-container-highest flex justify-between items-center z-10 shrink-0">
                        <h3 className="font-headline font-bold text-on-surface">Communication Thread</h3>
                        <span className="text-xs font-body text-on-surface-variant bg-surface px-3 py-1 rounded-full border border-outline-variant/20 hidden sm:block">Response Time: Target &lt; 24h</span>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 custom-scrollbar" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23a9b4b9' fill-opacity='0.1'/%3E%3C/svg%3E\")" }}>
                        {/* System Note */}
                        <div className="flex justify-center my-2">
                            <span className="text-xs font-body text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                                Ticket created on {formatDate(ticket.createdAt)}
                            </span>
                        </div>

                        {messages.length === 0 && (
                            <div className="text-center text-on-surface-variant text-sm mt-10">
                                No replies yet. Start the conversation below.
                            </div>
                        )}

                        {messages.map((msg, index) => {
                            const isMe = msg.senderId === currentUser?.uid || msg.senderRole === 'faculty';
                            return (
                                <div key={msg.id || index} className={`flex gap-4 items-end ${isMe ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 border border-surface-container-lowest shadow-sm overflow-hidden text-xs font-bold uppercase">
                                        {isMe ? (
                                             msg.senderName?.substring(0,2) || 'FA'
                                        ) : (
                                            ticket.studentAvatar ? <img src={ticket.studentAvatar} alt="Student" /> : (msg.senderName?.substring(0,2) || 'ST')
                                        )}
                                    </div>
                                    <div className={`flex flex-col max-w-[85%] sm:max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                                        <span className={`text-[11px] font-body text-on-surface-variant mb-1 ${isMe ? 'ml-2' : 'mr-2'}`}>
                                            {isMe ? 'You' : msg.senderName || ticket.studentName} • {formatDate(msg.timestamp)}
                                        </span>
                                        <div className={`p-4 rounded-2xl shadow-sm font-body text-sm leading-relaxed whitespace-pre-wrap ${
                                            isMe 
                                            ? 'bg-primary-container text-on-primary-container rounded-br-sm' 
                                            : 'bg-surface-container-high text-on-surface rounded-bl-sm'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-surface-container-lowest border-t border-surface-container-highest z-10 block shrink-0">
                        {ticket.status === 'resolved' ? (
                            <div className="bg-surface-container p-3 rounded-xl text-center text-on-surface-variant text-sm font-medium">
                                <span className="material-symbols-outlined text-[16px] mr-2 align-text-bottom">lock</span>
                                This ticket has been resolved and is closed to further comments.
                            </div>
                        ) : (
                            <>
                                <div className="flex items-end gap-2 sm:gap-3 bg-surface p-2 rounded-xl border border-outline-variant/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                    <textarea 
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendReply();
                                            }
                                        }}
                                        className="w-full bg-transparent border-none focus:ring-0 resize-none font-body text-sm py-2.5 px-2 placeholder:text-on-surface-variant/50 text-on-surface outline-none" 
                                        placeholder="Type your response..." 
                                        rows="2"
                                        disabled={isSubmitting}
                                    ></textarea>
                                    <div className="flex gap-1 sm:gap-2 shrink-0 p-1">
                                        <button 
                                            onClick={handleSendReply}
                                            disabled={isSubmitting || !newMessage.trim()}
                                            className="px-4 sm:px-5 py-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm outline-none disabled:opacity-50"
                                        >
                                            <span className="hidden sm:inline">{isSubmitting ? 'Sending...' : 'Send'}</span>
                                            <span className="material-symbols-outlined text-[18px]">send</span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[10px] font-body text-center text-on-surface-variant mt-2">Press Enter to send, Shift+Enter for new line. All communications are logged.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
