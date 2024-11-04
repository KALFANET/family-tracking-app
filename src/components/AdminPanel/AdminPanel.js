import React from 'react';
import './AdminPanel.css'; // קובץ CSS מותאם לעמוד הניהול

function AdminPanel({ users }) {
  return (
    <div className="admin-panel">
      <h2>עמוד ניהול</h2>
      <table>
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>מייל</th>
            <th>סטטוס מנהל</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'כן' : 'לא'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
