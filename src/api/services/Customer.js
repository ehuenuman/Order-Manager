import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
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

/**
 * Create a new customer from given data.
 * @param data 
 * @returns new customer ID
 */
export async function createCustomer(data) {
  const customersRef = collection(firestoreInstance, 'customers');

  const newCustomer = {
    name: data.customerName,
    bin: data.customerIdDocument,
    address: {
      line1: data.customerAddress,
      line2: '',
      city: data.customerCity,
      suburb: data.customerSuburb,
      postalCode: data.customerPostalCode
    },
    contact: {
      name: data.contactName,
      surname: data.contactSurname,
      email: data.contactEmail,
      phone: data.contactPhone
    }
  };

  const customerRef = await addDoc(customersRef, newCustomer);
  
  return customerRef.id
}