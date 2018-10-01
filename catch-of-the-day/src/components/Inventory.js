import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        addFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    render() {
        return(
            <div className="inventory">
                <h2>Inventory!!!</h2>
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} deleteFish={this.props.deleteFish} fish={this.props.fishes[key]}/>)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;