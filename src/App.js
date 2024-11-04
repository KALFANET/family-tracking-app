import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig'; // ייבוא ה-Firestore מ-config שלך
import { listenToLocationUpdates } from './listenToLocation'; // אם יש לך פונקציה זו

function App() {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState({});

  // קריאת נתוני משתמשים מ-Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // מעקב אחרי שינויים במיקומי המשתמשים
  useEffect(() => {
    if (users && Array.isArray(users)) {
      users.forEach(user => {
        listenToLocationUpdates(user.id, (data) => {
          setLocations(prevLocations => ({
            ...prevLocations,
            [user.id]: data
          }));
        });
      });
    }
  }, [users]);

  if (!users || !Array.isArray(users) || users.length === 0) {
    return <div>Loading users or no users available...</div>;
  }

  return (
    <div className="container">
      <MapContainer center={[32.0853, 34.7818]} zoom={10} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {users.map(user => (
          locations[user.id] && (
            <Marker
              key={user.id}
              position={[locations[user.id].latitude, locations[user.id].longitude]}
            >
              <Popup>
                <strong>{user.name}</strong>
                <p>עודכן לאחרונה: {new Date(locations[user.id].timestamp).toLocaleString()}</p>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
