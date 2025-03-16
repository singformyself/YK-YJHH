<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container"></div>
      <ion-card class="fixed-ion-card">
        <ion-card-content>
          <ion-button @click="search" color="light" shape="round" expand="block" style="display: flex;flex-direction: row">
            <ion-img style="width: 28px;opacity: 0.5" src="/search-outline.svg" alt="Search Icon"></ion-img>
            搜索目的地
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import {onMounted, onUnmounted, ref} from "vue";
import {IonPage, IonContent, IonCard, IonCardContent, IonButton, IonImg} from '@ionic/vue';
// 引入 useRouter 函数
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../store/globalStore ';

const store = useGlobalStore();
const { updateLocationRef, getMapRef,setMapRef } = store;
// 获取路由实例
const router = useRouter();

const geolocationConfig = {
  enableHighAccuracy: true, // 是否使用高精度定位，默认：true
  timeout: 10000, // 设置定位超时时间，默认：无穷大
  offset: [10, 180],  // 定位按钮的停靠位置的偏移量
  zoomToAccuracy: true,  // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  position: 'RB' // 定位按钮的排放位置, RB表示右下
};
let map=null;
// 定义定位实例变量
let geolocation = null;
// 定义监听ID变量
let watchId = null;
onMounted(() => {
  // 加载高德地图 JSAPI
  AMapLoader.load({
    key: "23376e224c66bd2866d51f4930e197bb", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["PlaceSearch", "Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
      .then((AMap) => {
        // 创建地图实例
         map = new AMap.Map("container", {
          viewMode: "3D", // 是否为3D地图模式
          zoom: 12, // 初始化地图级别
        });
        // 赋值到全局变量
        setMapRef(map)
        // 加载定位插件
        map.plugin('AMap.Geolocation', () => {
          // 创建定位实例
          geolocation = new AMap.Geolocation(geolocationConfig);
          // 将定位控件添加到地图上
          map.addControl(geolocation);
          // 开始监听位置变化
          watchId = geolocation.watchPosition(handlePositionResult);
        });
      })
      .catch((e) => {
        console.log(e);
      });
});
onUnmounted(function(){
  this.map.destroy()
})


// onUnmounted(() => {
//   // 销毁地图
//   if(this.AMap.map.value){
//     map.destroy()
//   }
//   // 停止监听位置变化
//   if (geolocation && watchId) {
//     geolocation.clearWatch(watchId);
//   }
// });

// 处理定位结果的函数
function handlePositionResult(status:any, result:any) {
  if (status === 'complete') {
    onComplete(result);
    updateLocationRef(result.position)
  } else {
    onError(status);
  }

  // 定位成功的回调函数
  function onComplete(data:any) {
    // data是具体的定位信息
    console.log('当前位置信息:', data);
  }

// 定位出错的回调函数
  function onError(data:any) {
    // 定位出错
    console.log('定位出错:', data);
  }
}
const search=()=>{
  router.push("/search")
}
</script>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
}

/* 卡片样式 */
.fixed-ion-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  bottom: 60px; /* 这里根据实际的底部标签栏高度进行调整 */
  left: 0;
  right: 0;
  margin: 0 auto; /* 如果你想让卡片水平居中 */
  width: calc(100% - 20px); /* 调整宽度以适应屏幕，并留有边距 */
  z-index: 999; /* 保证卡片位于大多数元素之上，但低于底部标签栏 */
}

.ion-color-light {
  opacity: 0.7;
}
</style>
