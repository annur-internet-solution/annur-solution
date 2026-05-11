// Firebase SDK
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
setDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_DOMAIN",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_BUCKET",

messagingSenderId: "YOUR_SENDER",

appId: "YOUR_APP_ID"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

window.signup = async function() {

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

try {

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

await setDoc(doc(db,"users",user.uid),{

name:name,
email:email,
createdAt:new Date()

});

alert("✅ Account Created");

window.location.href =
"login.html";

} catch(error){

alert(error.message);

}

}

window.login = async function() {

let email =
document.getElementById("loginEmail").value;

let password =
document.getElementById("loginPassword").value;

try {

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("✅ Login Successful");

window.location.href =
"dashboard.html";

} catch(error){

alert(error.message);

}

}