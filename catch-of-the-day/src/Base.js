import Rebase from 're-base';
import Firebase from 'firebase';

// @TODO: Connect a real firebase app
const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyBuoMaHwHDgleAvVbBjKGQdvLtqYvc4dy4",
    authDomain: "hd-catch-of-the-day.firebaseapp.com",
    databaseURL: "https://hd-catch-of-the-day.firebaseio.com"
  });

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is the default export 
export default base;