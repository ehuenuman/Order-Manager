import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  orderBy,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { firestoreInstance } from '../firebase';
import { createCustomer } from './Customer';

/**
 * Fetch all the orders ordered descent by their creation date
 * 
 * @returns Object of orders
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
 * @param {number} id ID of the order to look
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
  await updateDoc(
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
 * @param {number} orderId Order ID
 * @param {object} stages Stages
 * @param {object} status Status
 */
export async function finishStage(orderId, stages, status) {
  const orderRef = doc(firestoreInstance, 'orders', orderId);
  await updateDoc(
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
 * Finish a order marking its status as delivered
 * 
 * @param {string} id Order ID
 * @param {object} stages Stages
 * @param {object} status Status
 */
export async function finishOrder(id, stages, status) {
  const orderRef = doc(firestoreInstance, 'orders', id);
  await updateDoc(
    orderRef,
    {
      'stages': stages,
      'status.lastUpdate': status.lastUpdate,
      'status.stage': status.stage
    }
  );
}

/**
 * Create new order from data
 * 
 * @param {object} data 
 * @returns Status query
 */
export async function createOrder(data) {
  var newOrder = {
    number: 0,
    creationDate: new Date(),
    deadline: data.orderDeadline,
    description: data.orderDetails,
    areas: {
      design: (data.orderArea.indexOf("orderAreaDesign") !== -1),
      print: (data.orderArea.indexOf("orderAreaPrint") !== -1),
      workshop: (data.orderArea.indexOf("orderAreaWorkshop") !== -1),
      installation: (data.orderArea.indexOf("orderAreaInstallation") !== -1)
    },
    fee: {
      paid: (isNaN(parseInt(data.orderPaidFee))) ? 0 : parseInt(data.orderPaidFee),
      toPaid: parseInt(data.orderToPaidFee),
      total: parseInt(data.orderTotalFee)
    },
    status: {
      lastUpdate: new Date(),
      onTime: true,
      stage: 'isWaiting'
    },
    customer: {
      id: data.customerId,
      name: data.customerName
    }
  };
  var firstStage = newOrder.areas.design ? 'design'
    : newOrder.areas.print ? 'print'
    : newOrder.areas.workshop ? 'workshop'
    : 'installation';

  newOrder.status['area'] = firstStage;
  var stages = {};
  stages[firstStage] = {
    isWaiting: new Date(),
    isOnGoing: false,
    isFinish: false
  };
  newOrder['stages'] = stages;

  await getLastOrderId()
    .then(number => (newOrder.number = number + 1))
    .then(async () => {
      if (data.customerId.length === 0) {
        await createCustomer(data).then(customerId => {
          console.log('Cliente nuevo', customerId);
          newOrder.customer.id = customerId;
        });
      } else {
        console.log('Cliente existe');
      }
    })
    .then(async () => {
      const orderRef = doc(firestoreInstance, 'orders', (newOrder.number).toString());
      await setDoc(orderRef, newOrder);
    });
  return 'success';
}

/**
 * Fetch the last customer ID created
 * 
 * @returns Order ID
 */
export async function getLastOrderId() {
  const ordersRef = collection(firestoreInstance, 'orders');
  const q = query(ordersRef, orderBy('number', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs[0].data().number
}
