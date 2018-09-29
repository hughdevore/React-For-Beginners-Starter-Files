import Rebase from 're-base';
import Firebase from 'firebase';

// @TODO: Connect a real firebase app
const firebaseApp = Firebase.initializeApp({
    apiKey: 'Find all of this in firebase (Video 18)',
    authDomain: 'wow.com',
    databaseURL: 'www.fakeurl.com'
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is the default export 
export default base;