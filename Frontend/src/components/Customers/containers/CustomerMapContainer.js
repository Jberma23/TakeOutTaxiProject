import React, { Component } from 'react';
import GoogleMap from "../../Map/components/Map"

class CustomerMapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trucks: props.trucks
        }
    }


    render() {
        return (
            <div >
                <GoogleMap handleSelectedTruck={this.props.handleSelectedTruck} trucks={this.props.trucks} handlePinClick={this.props.handlePinClick} currentUser={this.props.currentUser} apiKey={this.props.apiKey} favoriteTrucks={this.props.favoriteTrucks} favorites={this.props.favorites.filter(e => e.length >= 1)} userFav={this.props.currentUser.favorites} />
            </div>
        );
    }

}

export default CustomerMapContainer;









