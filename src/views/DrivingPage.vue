<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/search"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container"></div>
      <!--        <ion-card class="fixed-ion-card">-->
      <!--          <ion-card-content>-->
      <!--            <ion-button @click="search" color="light" shape="round" expand="block" style="display: flex;flex-direction: row">-->
      <!--              <ion-img style="width: 28px;opacity: 0.5" src="/search-outline.svg" alt="Search Icon"></ion-img>-->
      <!--              搜索护航目的地-->
      <!--            </ion-button>-->
      <!--          </ion-card-content>-->
      <!--        </ion-card>-->
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import {onMounted, onUnmounted} from "vue";
import {
  IonPage,
  IonContent,
  IonButtons,
  IonToolbar,
  IonHeader, IonBackButton
} from '@ionic/vue';
// 引入 useRouter 函数
import {useRoute} from 'vue-router';
import {useGlobalStore} from '../store/globalStore ';
// 获取路由实例
const route = useRoute();
const store = useGlobalStore();
let aMap: any = null;
const lng = Number(route.query.lng);
const lat = Number(route.query.lat);
console.log(route.query.lng, route.query.lat);
onMounted(() => {
  // 加载高德地图 JSAPI
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    // 创建地图实例
    aMap = new AMap.Map("container", {
      viewMode: "3D", // 是否为3D地图模式
      zoom: 12, // 初始化地图级别
    });
    const pos = store.getLocation()
    console.log(pos);
    aMap.plugin("AMap.Driving", function () {
      const driving = new AMap.Driving({
        map:aMap,
        policy: 0, //驾车路线规划策略，0是速度优先的策略
      });
      const startLngLat = [pos.lng, pos.lat]; //起始点坐标
      const endLngLat = [lng, lat]; //终点坐标
      driving.search(startLngLat, endLngLat, function (status: string, result: any) {
        if (status === 'complete') {
          console.log(result);
        } else {
          console.log(status);
        }
      });
    });
  }).catch((e) => {
    console.log(e);
  });
});
onUnmounted(() => {
  // 销毁地图
  if (aMap) {
    aMap.destroy()
    //地图对象赋值为null
    aMap = null
//清除地图容器的 DOM 元素
    const container = document.getElementById("container");
    if (container) {
      container.remove();
    }
  }
});
</script>
<style scoped>
#container {
  width: 100vw;
  height: 100vh;
}
</style>