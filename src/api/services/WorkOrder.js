import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestoreInstance } from '../firebase';

/**
 * Fetch all the orders from Firestore ordered by creation date descent.
 * 
 * @return Promise <object>[]
 */
export async function getOrders() {
  const ordersRef = collection(firestoreInstance, 'orders');
  const q = query(ordersRef, orderBy('creationDate', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
}
