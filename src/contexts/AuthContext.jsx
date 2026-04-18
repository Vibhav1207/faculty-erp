import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FACULTY_PROFILE } from '../lib/seedData';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Default profile built from local seed data (used as fallback when Firestore
// rules block reads or the profile hasn't been written yet)
function buildLocalProfile(user) {
  return {
    id: user.uid,
    name: FACULTY_PROFILE.name,
    email: user.email || '',
    role: FACULTY_PROFILE.role,
    department: FACULTY_PROFILE.department,
    designation: FACULTY_PROFILE.designation,
    subjects: FACULTY_PROFILE.subjects,
  };
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [facultyProfile, setFacultyProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Start with local profile immediately so the UI never shows "Faculty"
        const localProfile = buildLocalProfile(user);
        setFacultyProfile(localProfile);

        // Then try to fetch from Firestore for any updated data
        try {
          const facultyDoc = await getDoc(doc(db, 'faculty_users', user.uid));
          if (facultyDoc.exists()) {
            setFacultyProfile({ id: facultyDoc.id, ...facultyDoc.data() });
          }
          // If the doc doesn't exist, localProfile is already set — no action needed
        } catch (error) {
          // Firestore rules may block this read (e.g. during initial setup).
          // Local profile is already set so the UI still works perfectly.
          console.warn('Firestore read skipped (using local profile):', error.code || error.message);
        }
      } else {
        setFacultyProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    currentUser,
    facultyProfile,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
