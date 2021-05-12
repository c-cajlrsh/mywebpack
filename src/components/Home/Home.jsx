import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Aike from '../Aike/Aike';
import './style.less';
import Tabs from 'base/Tabs/Tabs';
import TabPane from 'base/Tabs/TabPane'

class Home extends Component {
    render() {
        const {match} = this.props;
        return (
            <div>
                <div className={'home'}>
                    <Tabs defaultActiveIndex={0} className={'tabs-bar'}>
                        <TabPane order={'0'} tab={'tab 1'}>第一个tab内容</TabPane>
                        <TabPane order={'1'} tab={'tab 2'}>第二个tab内容</TabPane>
                        <TabPane order={'2'} tab={'tab 3'}>第三个tab内容</TabPane>
                    </Tabs>
                </div>
                {/*<Switch>
                    <Route path={`${match.path}`} exact component={Aike}/>
                </Switch>*/}
            </div>
        )
    }
}

export default Home;
