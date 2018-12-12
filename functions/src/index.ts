import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const firestore = admin.firestore();

exports.onUserStatusChanged = functions.database
  .ref('/status/{uid}')
  .onUpdate((change, context) => {
    const eventStatus = change.after.val();
    const userStatusFirestoreRef = firestore.doc(`users/${context.params.uid}`);

    return change.after.ref.once('value').then(statusSnapshot => {
      const status = statusSnapshot.val();
      console.log(status, eventStatus);
      if (status.last_changed > eventStatus.last_changed) {
        return null;
      }
      eventStatus.last_changed = new Date(eventStatus.last_changed);
      const newStatus = {
        status: {
          last_changed: eventStatus.last_changed,
          state: eventStatus.state
        }
      };
      return userStatusFirestoreRef.set(newStatus, { merge: true });
    });
  });
