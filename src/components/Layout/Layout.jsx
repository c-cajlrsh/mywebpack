import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './style.less';

class Layout extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavLink to={'/'}>index</NavLink><br/>
                    <NavLink to={'/child'}>child</NavLink><br/>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;
