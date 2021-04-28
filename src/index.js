import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import img from './assets/images/a.jpg';
import b from './assets/images/b.jpg';
import Router from 'router/config';

/*class App extends Component{
    render() {
        return (
            <div className={'test'}>爱克模块热替换替换替换sourceMapfg
                <img src={img} style={{width: '100px', height: '100px'}} alt=""/>
                <img src={b} style={{width: '100px', height: '100px'}} alt=""/>
                {
                    [1,2,3,5,8].map((item, index) => {
                        return (<div className={'ss'} key={index}>{item}</div>)
                    })
                }
            </div>
        )
    }
}*/


ReactDOM.render(
    <Router />,
    document.getElementById('root'));
