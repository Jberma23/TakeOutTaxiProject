import React, { Component } from 'react';
import Navbar from "./CustNavBar"
import { Header } from "semantic-ui-react"



class CustHeader extends Component {
    state = {}
    render() {
        return (

            <div className="jumbotron" className="sixteen wide column" >
                <div className="row">
                    <Header as='h2' color='teal' textAlign='center' >Takeout TruckStop</Header>
                    <Header as='h5' color='black' textAlign='center' >The Future of Takeout.</Header>
                </div>
                <div className="row">
                    <div >
                        <hr className="my-4" />
                        <Navbar onChange={this.props.onChange} searchTerm={this.props.searchTerm} handleUserLogOut={this.props.handleUserLogOut} />
                    </div>
                </div>
            </div>

        );
    }
}

export default CustHeader;


