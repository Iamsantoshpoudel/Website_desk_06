

// firebaseConfig.js

const firebaseConfig = {
    apiKey: "AIzaSyCcWUwbXc6r1M14CNfeojVDo7SyFylvrY8",
    authDomain: "website-database-b5b62.firebaseapp.com",
    databaseURL: "https://website-database-b5b62-default-rtdb.firebaseio.com",
    projectId: "website-database-b5b62",
    storageBucket: "website-database-b5b62.appspot.com",
    messagingSenderId: "799535806005",
    appId: "1:799535806005:web:63752dcd35f62feb55a37c",
    measurementId: "G-4F1W5ZS53S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export references to your Firebase Database
const keywordDB = firebase.database().ref('Keyword06');
const formInfoDB = firebase.database().ref('form-info06');

export { keywordDB, formInfoDB };
