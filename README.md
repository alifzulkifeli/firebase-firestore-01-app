# Initilize app

1. create react app and other library like router
2. create firebase sdk
3. run `npm install --save firebase`
4. create folder name `utils` and put `firebase.js`
5. initialize firebase

```js firebase.js
import firebase from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyDYD_hyxdz-4yrZqtjDALCy40anplMDzGg",
	authDomain: "learning-32082.firebaseapp.com",
	projectId: "learning-32082",
	storageBucket: "learning-32082.appspot.com",
	messagingSenderId: "832343973154",
	appId: "1:832343973154:web:ab3adbfa1e096e70aa997b",
	measurementId: "G-12D3NM54FB",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
```

6. add firebase to the root `index.js` file by adding `import firebase from './utils/firebase';`

# Firestore

1. create a databse in firestore at firebase website
2. in `firebase.js` import firestore `import 'firebase/firestore'`
3. create connection to the collection `export const db = firebase.firestore()`
4. to use the db object, import in the component `import { db } from '../utils/firebase';`
5. trace the bug
