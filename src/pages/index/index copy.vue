<template>
  <view class="content">
    <view class="text-area">
      <!-- 下拉组件 -->
      <pageList ref="list" :data="data"></pageList>
    </view>
  </view>
</template>

// <script setup>
// import pageList from "@/pages/index/pageList.vue";
// import { ref } from "vue";
// let title = ref("hello");
// let url = ref("");
// let data = [{ name: 123 }];
// console.log(data,ref);
// </script>

// <script>
// export default {
//     props: {

//     },
//     data() {
//         return {

//         };
//     },
//     computed: {

//     },
//     created() {

//     },
//     mounted() {

//     },
//     watch: {

//     },
//     methods: {

//     },
//     components: {

//     },
// };
// </script>
<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
