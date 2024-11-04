import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !password) {
      alert('יש להזין את כל השדות.');
      return;
    }

    if (password.length < 6) {
      alert('הסיסמה חייבת להכיל לפחות 6 תווים.');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('נרשמת בהצלחה!');
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        alert(`שגיאה בהרשמה: ${error.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="register">
      <h2>הרשמה</h2>
      <input
        type="email"
        placeholder="מייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="סיסמא"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'טוען...' : 'הרשם'}
      </button>
    </div>
  );
}

export default Register;
