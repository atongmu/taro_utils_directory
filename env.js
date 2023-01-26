/*
 * @Author: codingfly
 * @Description: 环境变量
 * @Date: 2022-07-04 12:26:32
 * @LastEditTime: 2023-01-27 00:01:08
 * @FilePath: \taro_utils_directory\env.js
 */
let config = {
    development: {
        baseUrl: '',
    },
    test: {
        baseUrl: 'xxx',
    },
    production: {
        baseUrl: '',
    },
};
let env = config[process.env.NODE_ENV];

export default env;