import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SUBJECTS } from '../lib/seedData';

export default function AssignmentCreator() {
    const { currentUser, userProfile } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [marks, setMarks] = useState(100);
    const [course, setCourse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);

    // Filter subjects to show only assigned ones
    const availableSubjects = userProfile?.subjects 
        ? SUBJECTS.filter(s => userProfile.subjects.some(sub => sub.toLowerCase() === s.id.toLowerCase()))
        : SUBJECTS;

    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Timeout helper
    const withTimeout = (promise, ms) => {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out after ' + ms + 'ms')), ms))
        ]);
    };

    const handleCreate = async () => {
        setSubmitError('');
        setSubmitSuccess(false);

        if (!title || !description || !deadline || !course) {
            setSubmitError("Please fill in all required fields.");
            return;
        }
        
        setIsSubmitting(true);
        try {
            const courseObj = availableSubjects.find(s => s.id === course);
            
            let fileUrl = null;
            let fileName = null;

            if (file) {
                const fileRef = ref(storage, `assignments/${currentUser?.uid || 'anon'}/${Date.now()}_${file.name}`);
                await withTimeout(uploadBytes(fileRef, file), 10000); // 10s timeout
                fileUrl = await withTimeout(getDownloadURL(fileRef), 10000);
                fileName = file.name;
            }
            
            await withTimeout(addDoc(collection(db, 'assignments'), {
                facultyId: currentUser?.uid || 'anonymous',
                facultyName: userProfile?.name || 'Faculty',
                courseId: course,
                courseName: courseObj?.name || course,
                cohort: courseObj?.year || 'ALL',
                title,
                description,
                deadline, // format: YYYY-MM-DD
                maxMarks: Number(marks),
                status: 'Active',
                fileUrl,
                fileName,
                submissionsCount: 0,
                enrolledCount: 30, // Mocked for now based on our seed data size
                createdAt: serverTimestamp()
            }), 10000);
            
            setSubmitSuccess(true);
            setTimeout(() => {
                navigate('/assignments');
            }, 1000);
        } catch(error) {
            console.error("Error creating assignment:", error);
            setSubmitError(`Failed to create assignment: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-24">
            {/* Page Header */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <nav aria-label="Breadcrumb" className="flex text-xs font-label text-on-surface-variant uppercase tracking-widest mb-3">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
                            <li className="inline-flex items-center">
                                <Link to="/assignments" className="hover:text-primary transition-colors">Assignments</Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
                                    <span className="text-on-surface font-medium">Create</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">Create Assignment</h1>
                </div>
            </div>

            {/* Form Layout (Asymmetric Grid) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Main Academic Content */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Details Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow border border-outline-variant/20">
                        <h3 className="font-headline text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">article</span>
                            Assignment Details
                        </h3>
                        <div className="space-y-6">
                            {/* Title Input */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="title">Assignment Title *</label>
                                <input 
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none" 
                                    id="title" placeholder="e.g., Midterm Research Proposal" type="text" 
                                />
                            </div>
                            {/* Description Input */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="description">Detailed Instructions *</label>
                                <textarea 
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none resize-y" 
                                    id="description" placeholder="Outline the expectations, grading criteria, and methodology..." rows="5"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Materials / File Upload Card (UI Only for now as per plan) */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow border border-outline-variant/20">
                        <h3 className="font-headline text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">folder_open</span>
                            Supporting Materials (Optional)
                        </h3>
                        <p className="text-xs text-on-surface-variant mb-4 font-medium italic">Cloud Storage integration pending; metadata tracking simulated.</p>
                        {/* Drag & Drop Zone */}
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 border-2 border-dashed border-outline-variant opacity-30 rounded-xl group-hover:opacity-60 transition-opacity"></div>
                            <div className="bg-surface-container-low hover:bg-surface-container group-hover:bg-primary-container/30 transition-colors rounded-xl p-12 flex flex-col items-center justify-center text-center relative z-10">
                                <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mb-4 shadow-[0_8px_16px_rgba(42,52,57,0.04)] group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-3xl text-primary">
                                        {file ? 'description' : 'upload_file'}
                                    </span>
                                </div>
                                <p className="font-body text-base font-medium text-on-surface mb-1">
                                    {file ? file.name : "Drag and drop files here"}
                                </p>
                                <p className="font-body text-sm text-on-surface-variant mb-4">
                                    {file ? "Click to change file" : "or click to browse from your computer"}
                                </p>
                                <div className="flex gap-2 text-xs font-label text-outline uppercase tracking-wider">
                                    <span>PDF</span> • <span>DOCX</span> • <span>ZIP</span>
                                </div>
                                <input 
                                    className="hidden" 
                                    type="file" 
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer"></label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Actions */}
                <div className="xl:col-span-1 space-y-8">
                    {/* Configuration Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow border border-outline-variant/20">
                        <h3 className="font-headline text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">settings_input_component</span>
                            Parameters
                        </h3>
                        <div className="space-y-6">
                            {/* Deadline Picker */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="deadline">Submission Deadline *</label>
                                <div className="relative">
                                    <input 
                                        value={deadline}
                                        onChange={e => setDeadline(e.target.value)}
                                        className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 pl-12 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none" 
                                        id="deadline" type="date" 
                                    />
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">calendar_month</span>
                                </div>
                            </div>
                            {/* Marks/Grading */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="marks">Maximum Marks *</label>
                                <div className="relative">
                                    <input 
                                        value={marks}
                                        onChange={e => setMarks(e.target.value)}
                                        className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 pl-12 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none" 
                                        id="marks" type="number" 
                                    />
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">grade</span>
                                </div>
                            </div>
                            {/* Course Selection */}
                            <div>
                                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="course">Target Course *</label>
                                <select 
                                    value={course}
                                    onChange={e => setCourse(e.target.value)}
                                    className="w-full bg-surface-container-highest border-transparent rounded-lg py-3 px-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all appearance-none cursor-pointer outline-none" 
                                    id="course"
                                >
                                    <option value="" disabled>Select a course...</option>
                                    {availableSubjects.map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name} ({sub.code})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Primary Action Area */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center justify-center text-center ambient-shadow border border-outline-variant/20">
                        <span className="material-symbols-outlined text-tertiary-container text-4xl mb-3">auto_awesome</span>
                        <h4 className="font-headline text-base font-medium text-on-surface mb-2">Ready to Publish?</h4>
                        <p className="font-body text-sm text-on-surface-variant mb-6">Students in the target course will be notified immediately upon creation.</p>
                        
                        {submitError && (
                            <div className="w-full bg-error-container text-on-error-container text-sm p-3 rounded-lg mb-4 text-left border border-error/20 flex gap-2 items-start">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                <span className="font-medium">{submitError}</span>
                            </div>
                        )}

                        {submitSuccess && (
                            <div className="w-full bg-primary-container text-on-primary-container text-sm p-3 rounded-lg mb-4 text-left border border-primary/20 flex gap-2 items-start">
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                <span className="font-medium">Assignment created securely! Redirecting...</span>
                            </div>
                        )}

                        <button 
                            onClick={handleCreate}
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-primary to-primary-dim text-white font-medium rounded-lg py-3.5 px-6 shadow-[0_24px_48px_rgba(42,52,57,0.06)] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{isSubmitting ? 'Publishing...' : 'Create Assignment'}</span>
                            {!isSubmitting && <span className="material-symbols-outlined text-[20px]">send</span>}
                        </button>
                        <button className="mt-4 w-full bg-transparent text-primary hover:bg-primary-container/50 font-medium rounded-lg py-2.5 px-6 transition-colors outline-none disabled:opacity-50">
                            Save as Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
