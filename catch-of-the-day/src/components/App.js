import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import '../css/style.css';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../Base';

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        const params = this.props.match;

        // Reinstate local storage
        const localStorageRef = localStorage.getItem(params.storeId);

        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // Make a copy of the existing state
        const fishes = { ...this.state.fishes };

        // Add the new fish to the fishes variable
        fishes[`fish${Date.now()}`] = fish;

        // Set the new fishes object to state
        this.setState({ fishes });

    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes})
    }

    addToOrder = (key) => {
        // Take a copy of state 
        const order = {...this.state.order};

        // Add to the order or update the number in the order
        order[key] = order[key] + 1 || 1; 

        // Update the order
        this.setState({order})
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Daily"/>
                    <ul className="fishes">
                       {Object.keys(this.state.fishes).map(key => <Fish 
                       key={key} 
                       index={key}
                       details={this.state.fishes[key]} 
                       addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes}/>
                <Inventory loadSampleFishes={this.loadSampleFishes} addFish={this.addFish} />
            </div>
        )
    }
}

export default App;