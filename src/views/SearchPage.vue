<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- 搜索输入框 -->
      <ion-searchbar id="search" @ionChange="onSearch" placeholder="请输入搜索内容"></ion-searchbar>

      <!-- 搜索结果列表 -->
      <ion-list v-if="searchResults.length > 0">
        <ion-item v-for="(result, index) in searchResults" :key="index" @click="onResultClick(result)">
          <ion-label>{{ result.name }}</ion-label>
        </ion-item>
      </ion-list>

      <!-- 没有搜索结果时的提示 -->
      <div v-else-if="query && searchResults.length === 0" class="no-results">
        没有找到相关结果
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
import {onMounted,onUnmounted, ref} from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useGlobalStore } from '../store/globalStore ';

const store = useGlobalStore();
const { locationRef, mapRef } = store;
const searchResults = ref<string[]>([]);
let placeSearch = null;
onMounted( () => {
  // await AMapLoader.load({
  //   key: '23376e224c66bd2866d51f4930e197bb', // 替换为你的高德地图 API Key
  //   version: '2.0',
  //   plugins: ['AMap.PlaceSearch'],
  // });
  //
  // console.log("=============");
  // placeSearch = new AMap.PlaceSearch({
  //   pageSize: 10, // 单页显示结果条数
  //   pageIndex: 1, // 页码
  // });
// 加载定位插件
  mapRef.value.plugin('AMap.PlaceSearch', () => {
    placeSearch = new AMap.PlaceSearch({
      pageSize: 10, // 单页显示结果条数
      pageIndex: 1, // 页码
    });

  });
})
const onSearch = (event: CustomEvent) => {
  const value = event.detail.value;

  // 这里可以添加实际的搜索逻辑
  if (value) {
    // 示例：模拟搜索结果
    //searchResults.value = ['结果1', '结果2', '结果3'];

    // 使用高德地图插件进行搜索
    if (placeSearch) {
      placeSearch.search(value,(status,result)=>{
        if(status === 'complete'){
          console.log(result);
          searchResults.value=result.poiList.pois;
        }else{
          console.log(status);
        }

      });
    }
  } else {
    searchResults.value = [];
  }
};

</script>

<style scoped>
/* 你的样式 */
.search-icon {
  width: 100px; /* 设置图片宽度 */
  height: 100px; /* 设置图片高度 */
  margin: 20px auto; /* 居中显示 */
  display: block;
}

.no-results {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>