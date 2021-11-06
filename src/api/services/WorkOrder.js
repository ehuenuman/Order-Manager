import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  updateDoc
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
export async function getOrderById(id) {
  const orderRef = doc(firestoreInstance, 'orders', id.toString());
  const querySnapshot = await getDoc(orderRef);
  if (querySnapshot.exists()) {
    return { id: querySnapshot.id, ...querySnapshot.data() };
  } else {
    console.log('No order with number: ', id);
  }
}

/**
 * Update order state from waiting to on going
 * 
 * @param {number} orderId Order ID
 * @param {object} stages 
 * @param {object} status 
 */
export async function startStage(orderId, stages, status) {
  const orderRef = doc(firestoreInstance, 'orders', orderId);
  const querySnapshot = await updateDoc(
    orderRef,
    {
      'stages': stages,
      'status.lastUpdate': status.lastUpdate,
      'status.stage': status.stage
    }
  );
}

/**
 * Finish a order stage
 * 
 * @param {*} orderId Order ID
 * @param {*} stages Stages object
 * @param {*} status Status object
 */
export async function finishStage(orderId, stages, status) {
  const orderRef = doc(firestoreInstance, 'orders', orderId);
  const querySnapshot = await updateDoc(
    orderRef,
    {
      'stages': stages,
      'status.area': status.area,
      'status.lastUpdate': status.lastUpdate,
      'status.stage': status.stage
    }
  );
}

/**
 * Finish a order marking status as delivered
 * 
 * @param {*} orderId Order ID
 * @param {*} stages Stages object
 * @param {*} status Status object
 */
export async function finishOrder(orderId, stages, status) {
  const orderRef = doc(firestoreInstance, 'orders', orderId);
  const querySnapshot = await updateDoc(
    orderRef,
    {
      'stages': stages,
      'status.lastUpdate': status.lastUpdate,
      'status.stage': status.stage
    }
  );
}
