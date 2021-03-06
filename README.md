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
3. create connection to the collection `const db = firebase.firestore()`
4. tap to the collection, put it in variable, and export it to use in other component

```js
//get gollection
export const laptopCollection = db.collection("collection name");
export const subCollection = db
	.collection("collection name")
	.doc("employee")
	.collection("collection name");

// get documents if the data type is object
export const ssdCollection = db.doc("site/ssd");

//use firebase timestamp
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;
```

## Create

- to create document,

```js
//ADD to db using default id
laptopCollection
	.add({
		...data,
		storage: parseInt(data.storage),
		createdAt: firebaseTimestamp(),
	})
	.then((data) => {
		console.log(data);
	})
	.catch((e) => {
		console.log(e);
	});

//ADD to db and set the id
laptopCollection.doc("name of id you wanna set").set({
	...data,
	storage: parseInt(data.storage),
	createdAt: firebaseTimestamp(),
});
```

## Read

- first create a function to help us loop the data

```js
export const loopdata = (snapshot) => {
	let data = [];
	snapshot.forEach((doc) => {
		data.push({
			...doc.data(),
			id: doc.id,
		});
	});
	return data;
};
```

- read data using helper function

```js
laptopCollection
	.where("storage", ">", 128)
	.where("storage", "<", 2048)
	.orderBy("storage")
	.limit(10)
	.startAt()
	.endAt()
	.get()

	.then((snapshot) => {
		if (snapshot.exist) {
			const laptopdata = loopdata(snapshot);
			setLaptop(laptopdata);
			console.log(laptopdata);
		}
	});
```

## Update

```js
laptopCollection.doc("7wLBXKbrlRCBB8rUQ2gA").update({
	key: "value",
});
```

# Authentication

- enable in firebase console
- add `import "firebase/auth";` and `firebase.auth();` in the `firebase.js` file

## Sign in using email

- create a form that can take input. like a login form

```js
const loginWithEmailAndPassword = (e) => {
	e.preventDefault();

	const { email, password } = user;
	// if statement, if user not registered, register first, or not just login
	if (register) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				storeUserToDB(res);
				res.user.sendEmailVerification().then(console.log("mail sent"));
			})
			.catch((err) => console.log(err));
	} else {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
};
```

## Update Email

```js
const UpdateEmail = () => {
	let getUser = firebase.auth().currentUser;
	// kna bagi current email dengan password
	let credential = firebase.auth.EmailAuthProvider.credential(
		"new@gmail.com",
		"test123"
	);
	if (getUser) {
		getUser.reauthenticateWithCredential(credential).then((res) => {
			getUser.updateEmail("aliff@gmail.com");
		});
	}
};
```

## Update Profile

```js
const UpdateProfile = () => {
	let getUser = firebase.auth().currentUser;
	getUser
		.updateProfile({
			displayName: "steve",
			photoURL: "https://image.jpg",
		})
		.then(() => {
			console.log(getUser);
		});
};
```

## Get Information About current User

```js
const askCurrentUser = () => {
	let getUser = firebase.auth().currentUser;
	if (getUser) {
		getUser.getIdToken().then((res) => {
			console.log(res);
		});
	}
};
```

## Logout

```js
const logout = () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log("user log out");
		});
};
```

## Login with Google

```js
const signinWithGoogle = () => {
	const provider = new firebase.auth.GoogleAuthProvider();

	firebase
		.auth()
		.signInWithPopup(provider)
		.then((res) => {
			storeUserToDB(res);
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};
```

## Add register user to databse

- this action can be done in cloud function

```js
const storeUserToDB = (data) => {
	usersCollection
		.doc(data.user.uid)
		.set({
			email: data.user.email,
		})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};
```

# Storage

- in `firebase.js` connect the app with firebase storage by import `import "firebase/storage";`
- after that make sure there is bucket in the firebase config
- create connection to the bucket in `firebase.js`

```js
//storage
export const storage = firebase.storage();
export const storageRef = storage.ref();
export const userRef = storageRef.child(`images/user/`);
// this will create a new folder name /images/user and when iot get referenced it will save the file in this folder
```

## Upload

- the html file when upload file

```html
<form onSubmit="{handleUpload}">
	<div className="form-group">
		<progress value="{progress}" max="100" />
		<label>File</label>
		<input className="form-control" type="file" onChange="{handleChange}" />
	</div>
	<button type="submit" className="btn btn-primary">Upload file</button>
</form>
```

- the function to store file in state

```jsx
const handleChange = (event) => {
	if (event.target.files[0]) {
		const images = event.target.files[0];
		setImage(images);
	}
};
```

- function to upload image to bucket
- there will be 3 callbacks

1. the state of upload. can be use to make progress bar
2. the handling error
3. handle what to do after uploaded. can be use to get the file url

```jsx
const handleUpload = (e) => {
	e.preventDefault();

	// reference the location of folder in storage
	const uploadTask = userRef.child(`${image.name}`).put(image);

	uploadTask.on(
		"state_changes",
		(snapshot) => {
			const inprogress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			setProgress(inprogress);

			switch (snapshot.state) {
				case snapshot.state:
					console.log(snapshot.state);
					break;
				default:
					console.log(snapshot.state);
			}
		},
		(err) => {
			console.log(err);
		},
		() => {
			console.log(uploadTask.snapshot.ref);
			console.log(uploadTask.snapshot.ref.bucket);
			console.log(uploadTask.snapshot.ref.fullPath);

			uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
				console.log(`file available at ${downloadUrl}`);
				setUrl(downloadUrl);
			});
		}
	);
};
```

## Download Image

- function can be use to read all the image in list

```jsx
const getAll = () => {
	userRef.listAll().then((data) => {
		let imagesArray = [];
		data.items.forEach((element) => {
			element.getDownloadURL().then((url) => {
				imagesArray.push({
					name: element.name,
					link: url,
				});
				console.log(imagesArray);
				setimage(imagesArray);
			});
		});
	});
};
```

## Delete

- this function can be used to delete file from storage

```jsx
const handleDelete = (name) =>
	userRef.child(name).delete(() => {
		console.log("deleted");
		getAll();
	});
```

## Hosting

1. install firebase in terminal `npm install -g firebase-tools`
2. run `firebase login`
3. run `firebase init`
4. run `firebase deploy`

# Rules

## rules for firestore

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

  	//function
  	function signedIn(){
    	return request.auth.uid != null
    }

  	//rules
    match /laptop/{document=**} {
    	allow read: if signedIn() || resource.data.available == true
      allow create, write, update, delete: if signedIn()
    }
    match /users/{userId} {
    	allow read,update,delete: if request.auth.uid == userId
      allow create: if signedIn()
    }

  }
}
```

## rules for storage

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/users/{imageId}{
   		allow read: if true
      allow write: if request.auth != null
    }

    match /users/{userId}/{filename}{
    	allow read: if true
      allow write:
      	if request.auth.uid == userId &&
        request.resource.size < 1 * 1024 * 1024 &&
        request.resource.contentType == 'image/png'
    }
  }
}
```

# Cloud Function

- initiate it in the firebase console
- run `npm install -g firebase-tools`
- run `firebase init` and `firebase deploy` and choose the function option
- this will create a firebase new folder name functtion in the project
- in the function folder there will be index.js file where the code for function is written

## Initiate function

- to initiate function first we need to import the function library
- the firebase admin library is used to connect firebase function with the firebase storage

```js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
```

## http function

```js
exports.conatacts = functions.https.onRequest(async (req, res) => {
	const { name, phone } = req.query;

	const addContact = await admin.firestore().collection("contacts").add({
		name,
		phone,
	});

	res.json({ result: `${addContact.id}` });
});
```

## trigger function

```js
exports.addDate = functions.firestore
	.document("contacts/{contactId}")
	.onCreate((snapshot, context) => {
		const timestamp = admin.firestore.FieldValue.serverTimestamp();
		return admin
			.firestore()
			.doc(`contacts/${context.params.contactId}`)
			.update({
				dataAdded: timestamp,
			});
	});
```

## callable function

-to use the function, firrt need to create an instance from the function in the `firebase.js` file

```js firebase
import "firebase/firebase-functions";
export const functions = firebase.functions();
```

- the next step is to create the function.

```js index.js
exports.addLog = functions.https.onCall(async (data, context) => {
	const log = {
		message: data.message,
		time: admin.firestore.FieldValue.serverTimestamp(),
	};

	const addLog = await admin.firestore().collection("logs").add(log);
	return `result ${addLog.id}`;
});
```

- and to use the function is create an trigger or by calling the function

```js
const handleClickFunction = () => {
	console.log("trigger");
	const addLog = functions.httpsCallable("addLog");

	addLog({
		message: "this is new log message",
	}).then((res) => {
		console.log(res);
	});
};
```
