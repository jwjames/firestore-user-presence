import { db, rtdb, auth } from '../src/firebase.js';
import * as firebase from 'firebase';



export const rtdb_and_local_fs_presence = () => {

  var uid = auth.currentUser.uid;
  var userStatusDatabaseRef = rtdb.ref('/status/' + uid);

  var isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  var isOnlineForDatabase = {
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  var userStatusFirestoreRef = db.doc(`users/${uid}/`);

  var isOfflineForFirestore = {
    status: {
      state: 'offline',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }
  };

  var isOnlineForFirestore = {
    status: {
      state: 'online',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }
  };

  rtdb.ref('.info/connected').on('value', function(snapshot) {

      if (snapshot.val() == false) {
          console.log('user is offline');
          userStatusFirestoreRef.set(isOfflineForFirestore, {merge: true});
          return;
      };

      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
          userStatusDatabaseRef.set(isOnlineForDatabase);

          userStatusFirestoreRef.set(isOnlineForFirestore, {merge: true});
      });
  });
}

export const fs_listen_online = () => {
 
  const usersRef = db.collection('users');
  usersRef
      .get()
      .then((snapshot) => {
        if(snapshot.exists) {
          usersRef
          .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
              if (change.type === 'added') {
                  var msg = 'User ' + change.doc.id + ' is online.';
              }

              if (change.type === 'removed') {
                  var msg = 'User ' + change.doc.id + ' is offline.';
              }
            });
          });
        } else {
          console.log('fs_listen_online, snapshot does not exist');
        }
        
      })
      .catch(function(err) {
        console.error('Error from fs_listen_online:');
        console.error(err);
      })
}


