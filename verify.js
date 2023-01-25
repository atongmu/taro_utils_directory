/*
 * @Author: codingfly
 * @Description: 类型判断
 * @Date: 2023-01-25 23:48:04
 * @LastEditTime: 2023-01-26 01:34:00
 * @FilePath: \taro_utils_directory\verify.js
 */

import { getType } from './common'

export function isArray(obj) {
    return getType(obj) === 'Array';
}

export function isObject(obj) {
    return getType(obj) === 'Object';
}

export function isString(obj) {
    return getType(obj) === 'String';
}

export function isNumber(obj) {
    return getType(obj) === 'Number' && obj === obj;
}

export function isRegExp(obj) {
    return getType(obj) === 'RegExp';
}

export function isFile(obj) {
    return getType(obj) === 'File';
}

export function isBlob(obj) {
    return getType(obj) === 'Blob';
}

export function isUndefined(obj) {
    return obj === undefined;
}

export function isFunction(obj) {
    return typeof obj === 'function';
}

export function isEmptyObject(obj) {
    return isObject(obj) && Object.keys(obj).length === 0;
}

