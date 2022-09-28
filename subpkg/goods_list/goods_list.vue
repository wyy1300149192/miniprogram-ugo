<template>
	<view>
		<view class="goods-list">
				<my-goods @click="goodsClickHandle(item.goods_id)" v-for="item in goodslist" :key="item.goods_id" :goods="item"></my-goods>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 商品列表请求数据
			queryObj: {
				query: '',
				cid: '',
				pagenum: 1,
				pagesize: 10
			},
			// 列表总数
			total: 0,
			// 商品列表
			goodslist: [],
			// 节流阀
			isLoading:false
		};
	},
	onLoad(option) {
		// 获取关键字
		this.queryObj.query = option.query || '';
		// 获取分类id
		this.queryObj.cid = option.cid || '';
		// 获取商品列表
		this.getGoodsList();
	},
	onPullDownRefresh() {
		this.queryObj.pagenum = 1
		this.queryObj.pagesize = 10
		this.total = 0
		this.isLoading = false
		this.goodslist = []
		this.getGoodsList(() => uni.stopPullDownRefresh())
	},
	onReachBottom() {
		// 判断数据是否加载完成
		if(this.queryObj.pagenum * this.queryObj.pagesize > this.total) return uni.$showToast('到底啦!')
		// 判断是否在请求数据
		if(this.isLoading) return 
		this.queryObj.pagenum++
		this.getGoodsList()
	},
	methods: {
		// 获取商品列表
		async getGoodsList(sp) {
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
			this.isLoading = true
			if (res.meta.status !== 200) return uni.$showToast();
			this.goodslist = [...this.goodslist,...res.message.goods];
			this.total = res.message.total;
			this.isLoading = false
			sp && sp()
		},
		// 商品点击回调
		goodsClickHandle(goods_id) {
			uni.navigateTo({
				url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	
</style>
