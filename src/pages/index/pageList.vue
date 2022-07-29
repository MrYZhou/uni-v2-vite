<template>
	 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<good-list :list="dataList"></good-list>
	</mescroll-body>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {apiDataUrl} from "@/api/mock.js"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				dataList: [] // 数据列表
			}
		},
		props:{
			// 数据列表
			data:{
				type:Array,
				default:[]
			},
			 // 请求路径
			apiDataUrl:{
				type:String,
				default:''
			},
		},
		watch:{
			apiDataUrl(val){
				if(val){
					// 触发数据请求
					// uni.$emit()
				}
			},
			data(val){
				if(val) this.dataList = data
			}
		},
		methods: {
			mescrollInit(){
				
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				// 此处可以继续请求其他接口
				// if(page.num == 1){
				// 	// 请求其他接口...
				// }
				
				// 如果希望先请求其他接口,再触发upCallback,可参考以下写法
				// if(!this.isInitxx){
				// 	apiGetxx().then(res=>{
				// 		this.isInitxx = true
				// 		this.mescroll.resetUpScroll() // 重新触发upCallback
				// 	}).catch(()=>{
				// 		this.mescroll.endErr()
				// 	})
				// 	return // 此处return,先获取xx
				// }
				
				//联网加载数据
				apiDataUrl(page.num, page.size).then(res=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//this.mescroll.endByPage(res.list.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//this.mescroll.endBySize(res.list.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//this.mescroll.endSuccess(res.list.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					this.mescroll.endSuccess(res.list.length);

					//设置列表数据
					if(page.num == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList=this.dataList.concat(res.list); //追加新数据
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			}
				
			downCallback(page){
			},
			
		}
	}
</script>

<style>
	/*说明*/
	.notice{
		font-size: 26upx;
		padding: 40upx 0;
		border-bottom: 1upx solid #eee;
		text-align: center;
		color:#555;
	}
</style>
