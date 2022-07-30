// 搜索商品
export function apiDataUrl(pageNum, pageSize, keyword) {
  return new Promise((resolute, reject) => {
	  debugger
    //延时一秒,模拟联网
    setTimeout(() => {
      try {
        let data = {
          list: [], // 数据列表
          totalCount: 0, // 总数量
          totalPage: 0, // 总页数
          hasNext: false, // 是否有下一页
        };
		let goods =[{goodName:'母婴1',price:99}]
        // 符合关键词的记录
        let keywordList = [];
        if (!keyword || keyword == "全部") {
          // 搜索全部商品
          keywordList = goods;
        } else {
          // 关键词搜索
          if (keyword == "母婴") keyword = "婴"; // 为这个关键词展示多几条数据
          for (let i = 0; i < goods.length; i++) {
            let good = goods[i];
            if (good.goodName.indexOf(keyword) !== -1) {
              keywordList.push(good);
            }
          }
        }

        // 分页
        for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
          if (i >= keywordList.length) break;
          data.list.push(keywordList[i]);
        }

        // 汇总数据
        data.totalCount = keywordList.length;
        data.totalPage = Math.ceil(data.totalCount / pageSize);
        data.hasNext = pageNum < data.totalPage;

        //模拟接口请求成功
        console.log(
          "pageNum=" +
            pageNum +
            ", pageSize=" +
            pageSize +
            ", data.list.length=" +
            data.list.length +
            ", totalCount=" +
            data.totalCount +
            ", totalPage=" +
            data.totalPage +
            ", hasNext=" +
            data.hasNext +
            (keyword ? ", keyword=" + keyword : "")
        );
        resolute(data);
      } catch (e) {
        //模拟接口请求失败
        reject(e);
      }
    }, 1000);
  });
}
