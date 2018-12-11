[in-progress, but it 100% works]

Working files from an app I built that leverages Google Cloud Functions to connect a Firestore user collection to a separate Firebase collection, making use of Firebase's `onDisconnect` class.

From the Google Firestore docs: 

*Cloud Firestore doesn't natively support presence, but you can leverage other Firebase products to build a presence system.*

*Solution: Cloud Functions with Realtime Database*

*To connect Cloud Firestore to Firebase Realtime Database's native presence feature, use Cloud Functions.*

*Use Realtime Database to report connection status, then use Cloud Functions to mirror that data into Cloud Firestore.*

