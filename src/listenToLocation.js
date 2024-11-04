import { getDatabase, ref, onValue } from 'firebase/database';

// פונקציה להאזנה לעדכוני מיקום בזמן אמת
export function listenToLocationUpdates(userId, callback) {
  const db = getDatabase();
  const locationRef = ref(db, 'locations/' + userId);
  onValue(locationRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    }
  }, {
    onlyOnce: false // מאפשר האזנה רציפה לעדכונים
  });
}
