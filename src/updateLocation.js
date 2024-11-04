import { getDatabase, ref, set } from 'firebase/database';

// פונקציה לעדכון מיקום
export function updateLocation(userId, location) {
  const db = getDatabase();
  set(ref(db, 'locations/' + userId), {
    latitude: location.lat,
    longitude: location.lng,
    timestamp: Date.now()
  })
  .then(() => {
    console.log('מיקום עודכן בהצלחה');
  })
  .catch((error) => {
    console.error('שגיאה בעדכון המיקום:', error);
  });
}
