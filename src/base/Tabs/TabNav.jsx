import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import styles from './style.less';

@CSSModules(styles, { allowMultiple: true })
class TabNav extends Component {

    getTabs() {
        const {panels, classPrefix, activeIndex} = this.props;
        return React.Children.map(panels, (child) => {
            if (!child) return;
            const order = parseInt(child.props.order, 10);
            let classes = classnames({
                tab: true,
                tabActive: activeIndex === order,
                disabled: child.props.disabled,
            });
            let events = {};
            if (!child.props.disabled) {
                events = {
                    onClick: this.props.onTabClick.bind(this, order),
                }
            }
            const ref = {};
            if (activeIndex === order) {
                ref.ref = 'activeTab';
            }
            return (
                <li
                    role={'tab'}
                    aria-disabled={child.props.disabled ? 'true' : 'false'}
                    aria-selected={activeIndex === order ? 'true' : 'false'}
                    {...events}
                    styleName={classes}
                    key={order}
                    {...ref}
                >
                    {child.props.tab}
                </li>
            )
        });
    };

    render() {
        // const {classPrefix} = this.props;
        const rootClasses = classnames({
            bar: true,
        });
        const classes = classnames({
            nav: true,
        });
        return (
            <div styleName={rootClasses} role={'tablist'}>
                <ul styleName={classes}>
                    {this.getTabs()}
                </ul>
            </div>
        )
    }
}

export default TabNav;
