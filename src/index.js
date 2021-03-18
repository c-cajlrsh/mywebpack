import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import img from './img/a.jpg';
import b from './img/b.jpg';
import './test.css';
import './test1.less';
import 'utils/demo';
class App extends Component{
    render() {
        return (
            <div className={'test'}>爱克模块热替换替换替换
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
}

ReactDOM.render(<App/>, document.getElementById('root'));
