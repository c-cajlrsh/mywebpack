import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import './style.less';
import {childPath} from 'utils/router';
import Aike from 'components/Aike/Aike';

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        <route.component {...props} routes={route.routes}/>
    )}/>
);

class Child extends Component {
    render() {
        console.log(this.props.routes);
        return (
            <div>
                Child
                {/*<NavLink to={childPath(this, 'aa')}>Aike</NavLink>
                <Switch>
                    <Route path={childPath(this, 'aa')} component={Aike}/>
                </Switch>*/}
                <ul>
                    <li><NavLink to="/child/bus">Bus</NavLink></li>
                    <li><NavLink to="/child/cart">Cart</NavLink></li>
                </ul>
                <Switch>
                    {
                        this.props.routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route}/>
                        ))
                    }
                </Switch>
            </div>
        )
    }
}

export default Child;
