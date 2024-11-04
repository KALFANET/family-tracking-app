import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // מאזין לשינויים במצב ההתחברות
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        try {
          // בדיקה האם המשתמש הוא מנהל
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists() && userDoc.data().isAdmin) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      } else {
        setCurrentUserId(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // ניתוק המאזין בעת ניקוי הקומפוננטה
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={setCurrentUserId} />} />
        {isAdmin ? (
          <Route path="/admin" element={<AdminPanel />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;