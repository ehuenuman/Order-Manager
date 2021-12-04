const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.checkOrderDeadline = functions.pubsub.schedule("every day 00:00")
    .timeZone("Pacific/Auckland")
    .onRun((context) => {
      const today = new Date();
      const ordersRef = admin.firestore().collection("orders");
      const querySnapshot = ordersRef
          .where(
              "status.stage",
              "in",
              ["isWaiting", "isOnGoing", "isReady"])
          .where("status.onTime", "==", true)
          .where("deadline", "<", today)
          .get();

      querySnapshot.then((delayedOrders) => {
        if (delayedOrders.empty) {
          functions.logger.log("No exist delayed orders so far");
          return;
        }

        delayedOrders.forEach((doc) => {
          ordersRef.doc(doc.id).update({
            "status.onTime": false,
          });
        });
      });
    });
