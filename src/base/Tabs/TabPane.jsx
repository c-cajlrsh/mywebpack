import React, {Component} from 'react';
import classnames from 'classnames'

class TabPane extends Component {
    render() {
        const {classPrefix, className, isActive, children} = this.props;
        const classes = classnames({
            [className]: className,
            [`${classPrefix}-panel`]: true,
            [`${classPrefix}-active`]: isActive,
        });
        return (
            <div
                role={'tabpanel'}
                className={classes}
                aria-hidden={!isActive}
            >
                {children}
            </div>
        )
    }
}

export default TabPane;
