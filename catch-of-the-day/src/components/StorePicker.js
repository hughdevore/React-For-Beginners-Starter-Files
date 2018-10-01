import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import '../css/style.css';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    static propTypes = {
        history: PropTypes.object
    }

    myInput = React.createRef();

    handleSubmit = (event) => {
        // Stop the form from submitting
        event.preventDefault();

        // Get text from input
        const storeName = this.myInput.value.value;

        // Change URL to "store/whatever-they-entered"
        this.props.history.push(`/store/${storeName}`)

        console.log(this);
    }

    render() {
        return(
            <Fragment>
                <form className="store-selector" onSubmit={this.handleSubmit}>
                    <h2>Please Enter A Store</h2>
                    <input 
                        ref={this.myInput}
                        type="text" 
                        required 
                        placeholder="Store Name"
                        defaultValue={getFunName()} />
                    <button type="submit">Visit Store</button>
                </form>
            </Fragment>
        )
    }
}

export default StorePicker;