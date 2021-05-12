import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.less';

@CSSModules(styles, { allowMultiple: true })
class Aike extends Component {
    render() {
        return (
            <div className={'aike'}>
                <p><strong>原始图标</strong></p>
                <i className="icon icon-del"></i>
                <p><strong>可以变色的图标</strong></p>
                <i className="icon"><i className="icon icon-del"></i></i>
            </div>
        )
    }
}

export default Aike;
