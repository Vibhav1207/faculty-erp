/**
 * Seed Data for Faculty ERP
 * This module contains the initial data for Vibhav Patel's profile,
 * subjects, and timetable. It also provides a function to seed this
 * data into Firestore if it doesn't already exist.
 */

import { doc, getDoc, setDoc, serverTimestamp, collection, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

// ─── Faculty Profile ───────────────────────────────────────────────
export const FACULTY_PROFILE = {
  name: 'Vibhav Patel',
  email: '', // will be set from the auth user
  role: 'faculty',
  department: 'Computer Science & Engineering',
  designation: 'Assistant Professor',
  subjects: ['DBMS', 'DSA', 'JS'],
};

// ─── Subjects ──────────────────────────────────────────────────────
export const SUBJECTS = [
  {
    id: 'dbms',
    code: 'DBMS',
    name: 'Database Management Systems',
    shortName: 'DBMS',
    year: 'FY',
    yearFull: 'First Year',
    semester: 2,
    color: 'secondary',    // timetable card color
  },
  {
    id: 'dsa',
    code: 'DSA',
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    year: 'SY',
    yearFull: 'Second Year',
    semester: 3,
    color: 'tertiary',
  },
  {
    id: 'js',
    code: 'JS',
    name: 'Advanced Java',
    shortName: 'JS',
    year: 'SY',
    yearFull: 'Second Year',
    semester: 3,
    color: 'primary',
  },
];

// ─── Time Slots ────────────────────────────────────────────────────
export const TIME_SLOTS = [
  { id: 'slot1', start: '09:50', end: '10:40', label: '09:50 – 10:40' },
  { id: 'slot2', start: '10:40', end: '11:30', label: '10:40 – 11:30' },
  { id: 'slot3', start: '11:30', end: '12:20', label: '11:30 – 12:20' },
  { id: 'slot4', start: '12:20', end: '13:10', label: '12:20 – 01:10' },
  { id: 'slot5', start: '13:10', end: '14:00', label: '01:10 – 02:00', type: 'lunch' },
  { id: 'slot6', start: '14:00', end: '14:50', label: '02:00 – 02:50' },
  { id: 'slot7', start: '14:50', end: '15:40', label: '02:50 – 03:40' },
  { id: 'slot8', start: '15:40', end: '16:30', label: '03:40 – 04:30' },
  { id: 'slot9', start: '16:30', end: '16:50', label: '04:30 – 04:50', type: 'buffer' },
];

// ─── Days ──────────────────────────────────────────────────────────
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ─── Timetable Schedule ────────────────────────────────────────────
// Each entry: { day, slotId, subjectId | type }
// type can be 'FREE', 'LUNCH', 'BUFFER'
export const TIMETABLE = [
  // Monday
  { day: 'Monday', slotId: 'slot1', subjectId: 'dbms' },
  { day: 'Monday', slotId: 'slot2', type: 'FREE' },
  { day: 'Monday', slotId: 'slot3', subjectId: 'dsa' },
  { day: 'Monday', slotId: 'slot4', type: 'FREE' },
  { day: 'Monday', slotId: 'slot5', type: 'LUNCH' },
  { day: 'Monday', slotId: 'slot6', type: 'FREE' },
  { day: 'Monday', slotId: 'slot7', type: 'FREE' },
  { day: 'Monday', slotId: 'slot8', type: 'FREE' },
  { day: 'Monday', slotId: 'slot9', type: 'BUFFER' },

  // Tuesday
  { day: 'Tuesday', slotId: 'slot1', subjectId: 'dbms' },
  { day: 'Tuesday', slotId: 'slot2', type: 'FREE' },
  { day: 'Tuesday', slotId: 'slot3', subjectId: 'js' },
  { day: 'Tuesday', slotId: 'slot4', type: 'FREE' },
  { day: 'Tuesday', slotId: 'slot5', type: 'LUNCH' },
  { day: 'Tuesday', slotId: 'slot6', type: 'FREE' },
  { day: 'Tuesday', slotId: 'slot7', type: 'FREE' },
  { day: 'Tuesday', slotId: 'slot8', type: 'FREE' },
  { day: 'Tuesday', slotId: 'slot9', type: 'BUFFER' },

  // Wednesday
  { day: 'Wednesday', slotId: 'slot1', subjectId: 'dbms' },
  { day: 'Wednesday', slotId: 'slot2', type: 'FREE' },
  { day: 'Wednesday', slotId: 'slot3', subjectId: 'dsa' },
  { day: 'Wednesday', slotId: 'slot4', type: 'FREE' },
  { day: 'Wednesday', slotId: 'slot5', type: 'LUNCH' },
  { day: 'Wednesday', slotId: 'slot6', type: 'FREE' },
  { day: 'Wednesday', slotId: 'slot7', type: 'FREE' },
  { day: 'Wednesday', slotId: 'slot8', type: 'FREE' },
  { day: 'Wednesday', slotId: 'slot9', type: 'BUFFER' },

  // Thursday
  { day: 'Thursday', slotId: 'slot1', subjectId: 'dbms' },
  { day: 'Thursday', slotId: 'slot2', type: 'FREE' },
  { day: 'Thursday', slotId: 'slot3', subjectId: 'js' },
  { day: 'Thursday', slotId: 'slot4', type: 'FREE' },
  { day: 'Thursday', slotId: 'slot5', type: 'LUNCH' },
  { day: 'Thursday', slotId: 'slot6', type: 'FREE' },
  { day: 'Thursday', slotId: 'slot7', type: 'FREE' },
  { day: 'Thursday', slotId: 'slot8', type: 'FREE' },
  { day: 'Thursday', slotId: 'slot9', type: 'BUFFER' },

  // Friday
  { day: 'Friday', slotId: 'slot1', subjectId: 'dbms' },
  { day: 'Friday', slotId: 'slot2', type: 'FREE' },
  { day: 'Friday', slotId: 'slot3', subjectId: 'dsa' },
  { day: 'Friday', slotId: 'slot4', type: 'FREE' },
  { day: 'Friday', slotId: 'slot5', type: 'LUNCH' },
  { day: 'Friday', slotId: 'slot6', type: 'FREE' },
  { day: 'Friday', slotId: 'slot7', type: 'FREE' },
  { day: 'Friday', slotId: 'slot8', type: 'FREE' },
  { day: 'Friday', slotId: 'slot9', type: 'BUFFER' },

  // Saturday
  { day: 'Saturday', slotId: 'slot1', subjectId: 'dbms' },
  { day: 'Saturday', slotId: 'slot2', type: 'FREE' },
  { day: 'Saturday', slotId: 'slot3', subjectId: 'js' },
  { day: 'Saturday', slotId: 'slot4', type: 'FREE' },
  { day: 'Saturday', slotId: 'slot5', type: 'LUNCH' },
  { day: 'Saturday', slotId: 'slot6', type: 'FREE' },
  { day: 'Saturday', slotId: 'slot7', type: 'FREE' },
  { day: 'Saturday', slotId: 'slot8', type: 'FREE' },
  { day: 'Saturday', slotId: 'slot9', type: 'BUFFER' },
];

// ─── Helper: Get subject by ID ─────────────────────────────────────
export function getSubjectById(id) {
  return SUBJECTS.find((s) => s.id === id) || null;
}

// ─── Helper: Get timetable entry ───────────────────────────────────
export function getTimetableEntry(day, slotId) {
  return TIMETABLE.find((t) => t.day === day && t.slotId === slotId) || null;
}

// ─── Helper: Get today's schedule ──────────────────────────────────
export function getTodaySchedule() {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = dayNames[new Date().getDay()];
  
  if (today === 'Sunday') {
    return { day: 'Sunday', isHoliday: true, entries: [] };
  }

  const entries = TIMETABLE
    .filter((t) => t.day === today)
    .map((entry) => {
      const slot = TIME_SLOTS.find((s) => s.id === entry.slotId);
      const subject = entry.subjectId ? getSubjectById(entry.subjectId) : null;
      return { ...entry, slot, subject };
    });

  return { day: today, isHoliday: false, entries };
}

// ─── Helper: Get current active class ──────────────────────────────
export function getCurrentClass() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const todaySchedule = getTodaySchedule();

  if (todaySchedule.isHoliday) return null;

  for (const entry of todaySchedule.entries) {
    if (entry.slot && entry.subjectId && currentTime >= entry.slot.start && currentTime < entry.slot.end) {
      return entry;
    }
  }
  return null;
}

// ─── Helper: Get next upcoming class ───────────────────────────────
export function getNextClass() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const todaySchedule = getTodaySchedule();

  if (todaySchedule.isHoliday) return null;

  for (const entry of todaySchedule.entries) {
    if (entry.slot && entry.subjectId && currentTime < entry.slot.start) {
      return entry;
    }
  }
  return null;
}

// ─── Helper: Count today's classes ─────────────────────────────────
export function getTodayClassCount() {
  const todaySchedule = getTodaySchedule();
  if (todaySchedule.isHoliday) return 0;
  return todaySchedule.entries.filter((e) => e.subjectId).length;
}

// ─── Seed Firestore ────────────────────────────────────────────────
export async function seedFacultyData(userId, userEmail) {
  try {
    // Check if timetable already seeded
    const timetableCheckDoc = await getDoc(doc(db, 'faculty_users', userId, 'meta', 'timetable_seeded'));
    
    if (timetableCheckDoc.exists()) {
      console.log('Faculty data already seeded. Skipping.');
      return;
    }

    const batch = writeBatch(db);

    // 1. Set faculty profile
    const facultyRef = doc(db, 'faculty_users', userId);
    batch.set(facultyRef, {
      ...FACULTY_PROFILE,
      email: userEmail,
      lastLoginAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });

    // 2. Set subjects sub-collection
    for (const subject of SUBJECTS) {
      const subjectRef = doc(db, 'faculty_users', userId, 'subjects', subject.id);
      batch.set(subjectRef, {
        ...subject,
        createdAt: serverTimestamp(),
      });
    }

    // 3. Set timetable sub-collection
    for (const entry of TIMETABLE) {
      const entryId = `${entry.day}_${entry.slotId}`;
      const timetableRef = doc(db, 'faculty_users', userId, 'timetable', entryId);
      batch.set(timetableRef, {
        ...entry,
        createdAt: serverTimestamp(),
      });
    }

    // 4. Mark as seeded
    const metaRef = doc(db, 'faculty_users', userId, 'meta', 'timetable_seeded');
    batch.set(metaRef, {
      seededAt: serverTimestamp(),
      version: 1,
    });

    await batch.commit();
    console.log('✅ Faculty data seeded successfully for', FACULTY_PROFILE.name);
  } catch (error) {
    console.error('Error seeding faculty data:', error);
  }
}

// ─── Mock Students Data ────────────────────────────────────────────
const NAMES = ["Aarav", "Aanya", "Vivaan", "Diya", "Aditya", "Isha", "Vihaan", "Ananya", "Arjun", "Saanvi", "Sai", "Myra", "Reyansh", "Kavya", "Krishna", "Riya", "Ishaan", "Aarohi", "Shaurya", "Avni", "Atharv", "Prisha", "Kabir", "Neha", "Rudra", "Nisha", "Aryan", "Pooja", "Rishi", "Meera", "Om", "Sneha", "Karan", "Kirti"];
const SURNAMES = ["Patel", "Sharma", "Singh", "Kumar", "Deshmukh", "Joshi", "Gupta", "Verma", "Rao", "Chauhan", "Mehta", "Reddy"];

const generateStudentsForYear = (yearId, yearPrefix, count) => {
  return Array.from({ length: count }).map((_, i) => {
    const fName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const lName = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
    return {
      id: `stu_${yearId}_${i + 1}`,
      name: `${fName} ${lName}`,
      rollNumber: `${yearPrefix}${String(i + 1).padStart(3, '0')}`,
      year: yearId,
      avatar: `https://ui-avatars.com/api/?name=${fName}+${lName}&background=random`
    };
  });
};

export const MOCK_STUDENTS = [
  ...generateStudentsForYear('fy', '26CS', 30),
  ...generateStudentsForYear('sy', '25CS', 30),
  ...generateStudentsForYear('ty', '24CS', 30),
  ...generateStudentsForYear('ly', '23CS', 30),
];

export function getStudentsByYear(year) {
  return MOCK_STUDENTS.filter(s => s.year === year.toLowerCase());
}
