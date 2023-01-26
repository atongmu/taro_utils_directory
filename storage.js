/*
 * @Author: codingfly
 * @Description: 缓存
 * @Date: 2022-11-23 21:05:21
 * @LastEditTime: 2023-01-26 23:56:56
 * @FilePath: \taro_utils_directory\storage.js
 
 */

import Taro from "@tarojs/taro";
const postfix = '_expiry' // 缓存有效期后缀   

const storage = {

    /**  
     * 设置缓存   
     * @param  {[type]} k [键名]  
     * @param  {[type]} v [键值]  
     * @param  {[type]} t [时间、单位秒]  
     */
    set(k, v, t) {
        Taro.setStorageSync(k, v)
        const seconds = parseInt(t)
        if (seconds > 0) {
            let timestamp = Date.parse(new Date())
            timestamp = timestamp / 1000 + seconds
            Taro.setStorageSync(k + postfix, timestamp + '')
        } else {
            Taro.removeStorageSync(k + postfix)
        }
    },

    /**  
     * 获取缓存   
     * @param  {[type]} k   [键名]  
     * @param  {[type]} def [获取为空时默认]  
     */
    get(k, def) {
        const deadtime = parseInt(Taro.getStorageSync(k + postfix))
        if (deadtime) {
            if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
                if (def) {
                    return def
                } else {
                    return false
                }
            }
        }
        const res = Taro.getStorageSync(k)
        if (res) {
            return res
        }
        if (def == undefined || def == "") {
            def = false
        }
        return def
    },

    /**
     * 删除指定缓存
     * @param {Object} k
     */
    remove(k) {
        Taro.removeStorageSync(k)
        Taro.removeStorageSync(k + postfix)
    },

    /**  
     * 清理所有缓存  
     * @return {[type]} [description]  
     */
    clear() {
        Taro.clearStorageSync()
    }
}
export default { storage }