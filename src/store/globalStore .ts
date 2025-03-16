// 创建 store
import {defineStore} from 'pinia';
// 定义全局存储的数据-位置信息
export const useGlobalStore = defineStore('global', () => {
    let location = {lng:0,lat:0};

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