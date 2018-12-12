**[Possibly still in-progress, but it currently 100% works]**

# Firestore with Firebase User Presence 

Working files from an app I built that leverages Google Cloud Functions to connect a Firestore user collection to a separate Firebase data structure, to make use of Firebase's `onDisconnect` class. 

You'll have to fill in the src/firebase.js config with your own information. 

## Google Cloud DB architecture:
**Firestore:**
- Collection name: `users`
- Document: `[id of user]`
- Field: `status: { state: "offline"}`

**Firebase (Real Time Database):**

`status --> [id of user] --> last_changed: [server timestamp value], state: "offline"`




###### From the Google Firestore docs:

*Cloud Firestore doesn't natively support presence, but you can leverage other Firebase products to build a presence system.*

*Solution: Cloud Functions with Realtime Database*

*To connect Cloud Firestore to Firebase Realtime Database's native presence feature, use Cloud Functions.*

*Use Realtime Database to report connection status, then use Cloud Functions to mirror that data into Cloud Firestore.*

