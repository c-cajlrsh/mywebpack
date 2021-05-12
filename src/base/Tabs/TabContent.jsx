import React, {Component, cloneElement} from 'react';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import styles from './style.less';
import './style.less';

@CSSModules(styles, { allowMultiple: true })
class TabContent extends Component {
    getTabPanes() {
        const {classPrefix, activeIndex, panels} = this.props;
        return React.Children.map(panels, (child) => {
            if (!child) return;
            const order = parseInt(child.props.order, 10);
            const isActive = activeIndex === order;
            return React.cloneElement(child, {
                classPrefix,
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`
            });
        });
    }

    render() {
        const {classPrefix} = this.props;
        const classes = classnames({
            content: true,
        });
        return (
            <div styleName={classes} className={'font'}>
                {this.getTabPanes()}
            </div>
        )
    }
}

export default TabContent;
