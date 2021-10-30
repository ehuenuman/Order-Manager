import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestoreInstance } from '../firebase';

/**
 * Fetch all the customers from Firestore
 * 
 * @return Promise <Object>[]
 */
 export async function getCustomers() {
  const customersRef = collection(firestoreInstance, 'customers');
  const querySnapshot = await getDocs(customersRef);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
}