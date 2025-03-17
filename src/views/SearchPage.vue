<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <!-- 搜索输入框 -->
    <ion-searchbar class="searchBar" araria-hidden="false" id="search" @ionChange="onSearch"
                   placeholder="请输入地址搜索"></ion-searchbar>
    <ion-content :fullscreen="true" class="ion-padding">
      <!-- 搜索结果列表 -->
      <ion-list v-if="searchResults.length > 0" :aria-hidden="searchResults.length === 0">
        <ion-item v-for="(result, index) in searchResults" :key="index" @click="onResultClick(result)">
          <ion-label>
            <h3>{{ result.name }}</h3>
            <p style="font-size: small">{{ result.address }} <span v-if="result.disable">距离：{{
                result.distance
              }}</span></p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- 没有搜索结果时的提示 -->
      <div v-else-if="query && searchResults.length === 0" class="no-results" :aria-hidden="searchResults.length > 0">
        --没有找到相关结果--
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
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  loadingController
} from '@ionic/vue';
import AMapLoader from "@amap/amap-jsapi-loader";
import {onMounted, onUnmounted, ref} from 'vue';
import {useGlobalStore} from '../store/globalStore ';
// 引入 useRouter 函数
import {useRouter} from "vue-router";
// 获取路由实例
const router = useRouter();
const store = useGlobalStore();
const {getLocation} = store;
const searchResults = ref<any[]>([]);
let placeSearch: any = null;
const query = ref("")
onMounted(() => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0',
    plugins: ['AMap.PlaceSearch', 'AMap.Geolocation'],
  }).then((AMap) => {
    placeSearch = new AMap.PlaceSearch({
      pageSize: 10, // 单页显示结果条数
      pageIndex: 1, // 页码
    });
  });
})
onUnmounted(() => {
  if (placeSearch) {
    // 释放插件资源
    placeSearch = null
  }
});
const onSearch = async (event: CustomEvent) => {
  const value = event.detail.value;
  const loading = await loadingController.create({
    message: '加载中...',
    duration: 10000,
  });

  loading.present();
  // 这里可以添加实际的搜索逻辑
  if (value) {
    // 示例：模拟搜索结果
    //searchResults.value = ['结果1', '结果2', '结果3'];

    // 使用高德地图插件进行搜索
    if (placeSearch) {
      // const pos = getLocation()
      // if (pos.lng != 0 && pos.lat != 0) {
      //   placeSearch.searchNearBy(value, new AMap.LngLat(pos.lng, pos.lat), (status: string, result: any) => {
      //     if (status === 'complete') {
      //       console.log(result);
      //       searchResults.value = result.poiList.pois;
      //     } else {
      //       console.log(status);
      //     }
      //     loading.dismiss();
      //   });
     // } else {
        placeSearch.search(value, (status: string, result: any) => {
          if (status === 'complete') {
            console.log(result);
            searchResults.value = result.poiList.pois;
          } else {
            console.log(status);
          }
          loading.dismiss();
        });
      //}

    }
  } else {
    searchResults.value = [];
  }
};
const onResultClick = ((result: any) => {
  router.push("/driving?lng=" + result.location.lng + "&lat=" + result.location.lat)
})
</script>

<style scoped>
.no-results {
  text-align: center;
  color: #999;
  padding: 20px;
}

.searchBar {
  background: #FFF;
  z-index: 999;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}
</style>