<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar
				@input="input"
				cancelButton="none"
				radius="17"
				placeholder="搜索"
			></uni-search-bar>
		</view>
		<!-- 搜索列表 -->
		<view class="search-list">
			<view class="search-list-item" v-for="item in searchList" :key="item.goods_id" @click="searchItemClickHandle(item.goods_id)">
				<text>{{ item.goods_name }}</text>
				<uni-icons type="forward" size="20"></uni-icons>
			</view>

		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons @click="clearHistoryHandle" type="trash-filled" size="20"></uni-icons>
			</view>
			<view class="history-list">
				<view class="history-list-item" v-for="item in historyList" :key="item" >
					<uni-tag :text="item" @click="clickHistoryHandle(item)"></uni-tag>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 定时器
			timer: null,
			// 搜索值
			searchVal: '',
			// 搜索列表
			searchList: [],
			// 搜索历史列表
			historyList:[]
		};
	},
	onLoad() {
		// 加载本地历史标签
		this.historyList = JSON.parse(uni.getStorageSync('searchHistory') || '[]')
	},
	methods: {
		input(e) {
			// 防抖节流处理
			clearTimeout(this.timer);
			this.timer = setTimeout(async() => {
				this.searchVal = e.trim();
				// 如果搜索值不为空请求搜索列表
				if (this.searchVal.length !== 0) {
					await this.getSearchList();
					// 增加历史标签
					this.historyListAdd()
				} else{
					this.searchList = []
				}
			}, 500);
		},
		// 请求搜索列表
		async getSearchList() {
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', {
				query: this.searchVal
			});
			if (res.meta.status !== 200) return uni.$showToast();
			this.searchList = res.message.goods;
		},
		// 搜索项目点击回调
		searchItemClickHandle(goods_id) {
			uni.navigateTo({
				url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods_id 
			})
		},
		// 增加历史标签方法
		historyListAdd() {
			this.historyList = this.historyList.filter(item => item !== this.searchVal)
			this.historyList.unshift(this.searchVal)
			// 历史标签存入本地缓存
			uni.setStorageSync('searchHistory',JSON.stringify(this.historyList))
		},
		// 清空搜索历史记录
		clearHistoryHandle() {
			this.historyList = []
			uni.removeStorageSync('searchHistory')
		},
		// 历史记录项目点击回调
		clickHistoryHandle(name) {
			uni.navigateTo({
				url:'/subpkg/goods_list/goods_list?query=' + name
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.search-list {
		padding: 0 13rpx;
	}
.search-list-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	line-height: 100rpx;
	border-bottom: 1px solid #ebe8eb;
	text {
		width: 95%;
		font-size: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.history-box {
	padding: 0 15rpx;
}
.history-title {
	display: flex;
	justify-content: space-between;
	line-height: 80rpx;
	font-size: 26rpx;
	border-bottom: 1px solid #e5e5e5;
}
::v-deep .uni-tag {
		background-color: #e5e5e5;
		border: 0;
		color: #000;
		font-size: 29rpx;
		font-weight:normal
	}
.history-list {
	display: flex;
	flex-wrap: wrap;
	.history-list-item {
		margin-top: 18rpx;
		margin-left: 10rpx;
	}
	
}
</style>
