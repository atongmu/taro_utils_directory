# 目录说明
 - index.js 公共方法
  - common.js 常用方法
  - verify.js 常用类型判断
 - storage.js 缓存数据方法
 - validate.js 用户输入内容验证类
 - env.js 环境变量





 
const storage = require('@/utils/storage');  
import storage from '@/utils/storage'  
使用方法 【  
    一、设置缓存  
        string    storage.set('k', 'string你好啊');  
        json      storage.set('k', { "b": "3" }, 2);  
        array     storage.set('k', [1, 2, 3]);  
        boolean   storage.set('k', true);  
    二、读取缓存  
        默认值    storage.get('k')  
        string    storage.get('k', '你好')  
        json      storage.get('k', { "a": "1" })  
    三、移除/清理    
        移除: storage.remove('k');  
        清理：storage.clear();   
】  
@type {String}
