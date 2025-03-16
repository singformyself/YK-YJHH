// 创建 store
import {defineStore} from 'pinia';
import AMap from 'AMap';
import {ref} from 'vue';
// 定义全局存储的数据
export const useGlobalStore = defineStore('global', () => {
    const locationRef = ref(null);
    const mapRef =  ref(null);
    const setMapRef=(newValue: any)=>{
        mapRef.value = newValue;
    }
    const getMapRef=():AMap=>{
        return mapRef;
    }
    const updateLocationRef = (newValue: any) => {
        locationRef.value = newValue;
    };

    return {
        mapRef,
        setMapRef,
        getMapRef,
        locationRef,
        updateLocationRef
    };
});