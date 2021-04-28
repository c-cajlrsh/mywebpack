import React from 'react';
import {BrowserRouter, Switch, Route, Redirect, HashRouter} from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import Home from 'components/Home/Home';
import Child from 'components/Child/Child';
import NotFound from 'common/NotFound/NotFound';

const routers = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/child',
        component: Child,
        routes: [
            {
                path: '/child/bus',
                component: () => <h2>bar</h2>
            },
            {
                path: '/child/cart',
                component: () => <h2>cart</h2>
            }
        ]
    },
    {
        component: NotFound,
    }
];
const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={props => (
        <route.component {...props} routes={route.routes}/>
    )}/>
);
export default () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    {/*<Route path={'/'} exact component={Home}/>
                    <Route path={'/child'} component={Child}/>
                    <Route component={NotFound}/>*/}
                    {/*{
                        routers.map(({path, exact, component}, index) => (
                            <Route key={index} path={path} exact={exact} component={component}/>
                        ))
                    }*/}
                    {
                        routers.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route}/>
                        ))
                    }
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}
