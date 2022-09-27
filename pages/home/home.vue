<template>
	<view>
		<view class="search-box">
			<my-search @click="searchClickHandle"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper
			class="swiper"
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			:circular="true"
		>
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator
					class="swiper-item"
					:url="'/subpkg/goods_detail/goods_detail?id=' + item.goods_id"
				>
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 导航栏 -->
		<view class="nav-list">
			<view
				class="nav-item"
				v-for="item in navList"
				:key="item.name"
				@click="navClickHandle(item)"
			>
				<image :src="item.image_src" class="nav-img" mode=""></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="item in floorList" :key="item.floor_title.name">
				<!-- 标题 -->
				<view class="floor-title"><image :src="item.floor_title.image_src" alt="" /></view>
				<!-- 图片 -->
				<view class="box">
					<view class="left-box">
						<navigator :url="item.product_list[0].url">
							<image
								:src="item.product_list[0].image_src"
								:style="{ width: item.product_list[0].image_width + 'rpx' }"
								mode="widthFix"
							></image>
						</navigator>
					</view>
					<view class="right-box">
						<navigator
							:url="item2.url"
							class="right-box-item"
							v-for="(item2, index) in item.product_list"
							:key="item2.image_src"
							v-if="index !== 0"
						>
							<image
								:src="item2.image_src"
								mode="widthFix"
								:style="{ width: item2.image_width + 'rpx' }"
							></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 轮播图数据列表
			swiperList: [],
			// 导航栏数据列表
			navList: [],
			// 楼层区域列表
			floorList: []
		};
	},
	onLoad() {
		// 调用获取轮播图接口方法
		this.getSwiperList();
		// 调用获取导航栏接口方法
		this.getNavList();
		// 楼层数据请求
		this.getFloorList();
	},
	methods: {
		// 轮播图数据请求
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			if (res.meta.status !== 200) return uni.$showToast();
			this.swiperList = res.message;
		},

		// 导航栏数据请求
		async getNavList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
			if (res.meta.status !== 200) return uni.$showToast();
			this.navList = res.message;
		},

		// 处理导航栏点击回调
		navClickHandle(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		},

		// 楼层数据请求
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
			if (res.meta.status !== 200) return uni.$showToast();

			// 处理url问题
			res.message.forEach(floor => {
				floor.product_list.forEach(prod => {
					prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
				});
			});

			this.floorList = res.message;
		},
		// 搜索按钮的回调
		searchClickHandle() {
			uni.navigateTo({
				url:'/subpkg/search/search'
			})
		}
	}
};
</script>

<style lang="scss">
.swiper {
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
.nav-list {
	display: flex;
	justify-content: space-around;
	.nav-item {
		.nav-img {
			margin: 20rpx 0;
			width: 140rpx;
			height: 140rpx;
		}
	}
}

.floor-title image {
	width: 100%;
	height: 60rpx;
}
.right-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
.box {
	display: flex;
}

.floor-list {
	padding: 10rpx;
}
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
