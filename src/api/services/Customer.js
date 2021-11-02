import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestoreInstance } from '../firebase';

/**
 * Fetch all the customers from Firestore
 * 
 * @return Promise DocumentData[]
 */
 export async function getCustomers() {
  const customersRef = collection(firestoreInstance, 'customers');
  const querySnapshot = await getDocs(customersRef);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
}

/**
 * Fetch a customers by their ID
 * 
 * @return Promise DocumentData 
 */
 export async function getCustomerById(id) {
  const customerRef = doc(firestoreInstance, 'customers', id);
  const querySnapshot = await getDoc(customerRef);
  if (querySnapshot.exists()) {
    return querySnapshot.data();
  } else {
    console.log('Customer does not exist, ID: ', id);
  }
}