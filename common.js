/*
 * @Author: codingfly
 * @Description: 工具
 * @Date: 2023-01-25 23:48:07
 * @LastEditTime: 2023-01-26 01:34:09
 * @FilePath: \taro_utils_directory\common.js
 */
import Taro from "@tarojs/taro";

/**
 * 样式合并的方法
 * @param  {...any} args 
 * @returns 
 */
export const cs = (...args) => {
    const length = args.length;
    let classNames = [];
    for (let i = 0; i < length; i++) {
        const v = args[i];
        if (!v) {
            continue;
        }
        if (isString(v)) {
            classNames.push(v);
        } else if (isArray(v)) {
            classNames = classNames.concat(v);
        } else if (isObject(v)) {
            Object.keys(v).forEach((k) => {
                if (v[k]) {
                    classNames.push(k);
                }
            });
        }
    }
    return [...new Set(classNames)].join(' ');
}

/**
 * 判断类型函数
 * @param {*} obj 
 * @returns 
 */
export const getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * 格式化日期格式 (用于兼容ios Date对象)
 */
export const formatDate = (time) => {
    // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    return time.replace(/\-/g, "/");
}

/**
* 遍历对象
*/
export const objForEach = (obj, callback) => {
    Object.keys(obj).forEach((key) => {
        callback(obj[key], key)
    });
}


/**
 * 显示成功提示框
 */
export const showSuccess = (msg, callback) => {
    Taro.showToast({
        title: msg,
        icon: 'success',
        mask: true,
        duration: 1500,
        success() {
            callback && callback()
        }
    })
}

/**
 * 显示失败提示框
 */
export const showError = (msg, callback) => {
    Taro.showModal({
        title: '友情提示',
        content: msg,
        showCancel: false,
        success(res) {
            callback && callback()
        }
    })
}

/**
 * 显示纯文字提示框
 */
export const showToast = (msg, duration = 1500, mask = true) => {
    Taro.showToast({
        title: msg, // 提示的内容
        icon: 'none',
        mask, // 是否显示透明蒙层，防止触摸穿透
        duration // 提示的延迟时间，单位毫秒，默认：1500  
    })
}
/**
 * 显示对话框
 */
export const showModal = (msg, callback) => {
    Taro.showModal({
        title: '提示',
        content: msg,
        success: ({ confirm }) => callback(confirm)
    })
}
/**
 * 跳转到指定页面url
 * 支持tabBar页面
 * @param {string}  url   页面路径
 * @param {object}  query 页面参数
 * @param {string}  modo  跳转类型(默认navigateTo)
*/
export const goTo = (url, query = {}, modo = 'navigateTo') => {
    if (!url || url.length == 0) {
        return false
    }
    // tabBar页面, 使用switchTab
    if (util.inArray(url, getTabBarLinks())) {
        Taro.switchTab({
            url: `/${url}`
        })
        return true
    }
    // 生成query参数
    const queryStr = !util.isEmpty(query) ? '?' + util.urlEncode(query) : ''
    // 普通页面, 使用navigateTo
    modo === 'navigateTo' && Taro.navigateTo({
        url: `/${url}${queryStr}`
    })
    // 特殊指定, 使用redirectTo
    modo === 'redirectTo' && Taro.redirectTo({
        url: `/${url}${queryStr}`
    })
    return true
}


/**
 * 加载更多列表数据
 * @param {Object} resList 新列表数据
 * @param {Object} oldList 旧列表数据
 * @param {int} pageNo 当前页码
 */
export const getEmptyPaginateObj = () => {
    return util.deepClone(paginate)
}

/**
 * 加载更多列表数据
 * @param {Object} resList 新列表数据
 * @param {Object} oldList 旧列表数据
 * @param {int} pageNo 当前页码
 */
export const getMoreListData = (resList, oldList, pageNo) => {
    // 如果是第一页需手动制空列表
    if (pageNo == 1) oldList.data = []
    // 合并新数据
    return oldList.data.concat(resList.data)
}