import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('התחברת בהצלחה!');
        navigate('/');
      })
      .catch((error) => {
        alert(`שגיאה בהתחברות: ${error.message}`);
      });
  };

  return (
    <div className="login">
      <h2>התחברות</h2>
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
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
}

export default Login;