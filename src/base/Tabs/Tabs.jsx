import React, {Component} from 'react';
import classnames from 'classnames';
import './style.less';
import TabNav from './TabNav';
import TabContent from './TabContent';

class Tabs extends Component {
    static defaultProps = {
        classPrefix: 'tabs', // class 前缀
        onChange: () => { // 回掉函数
        },
    };

    constructor(props) {
        super(props);
        const currProps = this.props;
        let activeIndex = 0;
        if ('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex;
        } else if ('defaultActiveIndex' in currProps) {
            activeIndex = currProps.defaultActiveIndex;
        }
        this.state = {
            activeIndex,
            prevIndex: activeIndex
        };
        this.handleClick = this.handleClick.bind(this);
    }

    renderTabNav() {
        const {classPrefix, children} = this.props;
        return (
            <TabNav
                key={'tabBar'}
                classPrefix={classPrefix}
                onTabClick={this.handleClick}
                panels={children}
                activeIndex={this.state.activeIndex}
            />
        )
    }

    renderTabContent() {
        const {classPrefix, children} = this.props;
        return (
            <TabContent
                key="tabcontent"
                classPrefix={classPrefix}
                activeIndex={this.state.activeIndex}
                panels={children}
            />
        )
    }

    componentWillReceiveProps(nextProps) {
        if ('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
        }
    }

    handleClick(activeIndex) {
        console.log(activeIndex);
        const prevIndex = this.state.prevIndex;
        console.log(prevIndex);
        if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
            this.setState({
                activeIndex,
                prevIndex,
            });
        }
        this.props.onChange({activeIndex, prevIndex});
    }

    render() {
        const {className} = this.props;
        const cx = classnames(className, 'ui-tabs');
        return (
            <div className={cx}>
                {this.renderTabNav()}
                {this.renderTabContent()}
            </div>
        )
    }
}

export default Tabs;
