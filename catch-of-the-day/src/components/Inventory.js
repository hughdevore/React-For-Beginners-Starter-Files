import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Login from './Login';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import base, {firebaseApp} from '../Base';

class Inventory extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        addFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler(user);
            }
        })
    }

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }
 
    authHandler = async authData => {

        // Look up the current store in the firebase DB
        const store = await base.fetch(this.props.storeId, {
            context: this
        });

        // Claim it if there's no owner
        if(!store.owner) {
            // Save it as our own store
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }

        // Set the state of the inventory component to reflect the current user
        // Also, account for the shape of google's user data on refresh
        this.setState({ 
            uid: authData.uid ? authData.uid : authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null })
    }

    render() {
        const logout = <button onClick={this.logout}>Logout</button>

        // Check if they are logged in
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate}/>;
        }

        // Check if they are not the owner of the store
        if(this.state.uid !== this.state.owner) {
             return (
                <div>
                    <p>Sorry, only the store owner can manage the inventory.</p>
                    {logout}
                </div>
             );
        }

        // They must be the owner, render the inventory
        return(
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} deleteFish={this.props.deleteFish} fish={this.props.fishes[key]}/>)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;