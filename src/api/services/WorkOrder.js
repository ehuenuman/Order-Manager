import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { firestoreInstance } from '../firebase';

/**
 * Fetch all the orders from Firestore ordered by creation date descent.
 * 
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

/**
 * Fetch one order by its ID
 * 
 * @param orderID string
 */
export const getOrderById = async (id) => {
  const orderRef = doc(firestoreInstance, 'orders', id.toString());
  const querySnapshot = await getDoc(orderRef);
  if (querySnapshot.exists()) {
    return querySnapshot.data();
  } else {
    console.log('No order with number: ', id);
  }
}
