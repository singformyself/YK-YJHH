// 创建 store
import {defineStore} from 'pinia';
// 定义全局存储的数据-位置信息
export const useGlobalStore = defineStore('global', () => {
    let location = {lng:116.397428,lat:39.90923};

    const setLocation = (lng:number,lat:number) => {
        location= {lng:lng,lat:lat};
    };
    const getLocation = () => {
        return location;
    };
    return {
        setLocation,
        getLocation
    };
});