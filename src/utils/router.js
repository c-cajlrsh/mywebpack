/**
 * 返回子路由路径
 * 只能在路由页面使用
 * @param _this
 * @param str
 * @returns {string}
 */
export function childPath(_this, str) {
    const {match} = _this.props;
    if (arguments.length <= 1) {
        return `${match.path}`;
    } else {
        return `${match.path}/${str}`
    }
}
