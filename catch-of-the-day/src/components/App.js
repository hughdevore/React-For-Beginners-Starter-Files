import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import '../css/style.css';

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    }

    addFish = (fish) => {
        // Make a copy of the existing state
        const fishes = { ...this.state.fishes };

        // Add the new fish to the fishes variable
        fishes[`fish${Date.now()}`] = fish;

        // Set the new fishes object to state
        this.setState({ fishes });

    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Daily"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        )
    }
}

export default App;