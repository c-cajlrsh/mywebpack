import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames'

import styles from './style.less';

@CSSModules(styles, { allowMultiple: true })
class TabPane extends Component {
    render() {
        const {className, isActive, children} = this.props;
        const classes = classnames({
            panel: true,
            contentActive: isActive,
        });
        return (
            <div
                role={'tabpanel'}
                styleName={classes}
                aria-hidden={!isActive}
            >
                {children}
            </div>
        )
    }
}

export default TabPane;
