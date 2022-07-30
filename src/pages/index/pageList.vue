<template>
  <mescroll-body
    ref="mescrollRef"
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
  >
    <view v-for="(item, index) in dataList" :key="index">
      {{ item }}
    </view>
  </mescroll-body>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import CompatibleApi from "./compatibleApi.js"
export default {
  mixins: [MescrollMixin,CompatibleApi], // 使用mixin
  data() {
    return {
      dataList: [], // 数据列表
    };
  },
  props: {
    // 数据列表
    data: {
      type: Array,
      default: [],
    },
    // 请求路径
    apiUrl: {
      type: String,
      default: "",
    },
  },
  watch: {
    apiUrl(val) {
      if (val) {
        // 触发数据请求
        // uni.$emit()
      }
    },
    data(val) {
      if (val) this.dataList = data;
    },
  },
  methods: {
    upCallback(page) {
      setTimeout(() => {
        try {
          var params = {};
          params.page = page.num; // 页码, 默认从1开始
          params.perPage = page.size; // 页长, 默认每页10条

          var res = { list: [], page: {} };
          let curDataList = res.list;
          var pageData = res.page;

          //方法一(推荐): 后台接口有返回列表的总页数 totalPage
          //this.mescroll.endByPage(res.list.length, totalPage); //必传参数(当前页的数据个数, 总页数)

          //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
          //this.mescroll.endBySize(res.list.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

          //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
          //this.mescroll.endSuccess(res.list.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

          //设置列表数据
          if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
          this.dataList = this.dataList.concat(curDataList); //追加新数据

          this.mescroll.endByPage(curDataList.length, pageData.pageNum);
          console.log(
            "mescroll-body pageData.curPage: ",
            pageData.curPage,
            " pageData.pageNum: ",
            pageData.pageNum
          );
        } catch (e) {
          //  请求失败,隐藏加载状态
          console.log("上拉加载更多出错了");
          this.mescroll.endErr();
        }
      }, 1000);
    },
    mescrollInit(page) {
      console.log(page, "mescrollInit");
      // 初始化一些额外options请求
      this.initBase()
    },
    downCallback(page) {
      console.log(page, "downCallback");
    },
  },
};
</script>

<style></style>
