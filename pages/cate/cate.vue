<template>
	<view>
		<view class="scroll-box">
			<!-- 左侧滚屏 -->
			<scroll-view
				scroll-y="true"
				class="left-scroll-view"
				:style="{ height: wh, width: '300rpx' }"
			>
				<view
					:class="['left-scroll-view-item', index === active ? 'active' : '']"
					v-for="(item, index) in cateList"
					:key="cat_id"
					@click="cateClickHandle(index)"
				>
					{{ item.cat_name }}
				</view>
			</scroll-view>
			<!-- 右侧滚屏 -->
			<scroll-view
				:scroll-top="scrollTop"
				scroll-y="true"
				class="right-scroll-view"
				:style="{ height: wh }"
			>
				<!--  二级菜单 -->
				<view
					class="right-scroll-view-item"
					v-for="item in cateListLevel2"
					:key="item.cat_id"
				>
					<!-- 二级菜单标题 -->
					<view class="right-cate-name">/ {{ item.cat_name }} /</view>
					<!-- 三级菜单 -->
					<view class="right-lv3">
						<view
							class="right-lv3-item"
							v-for="item2 in item.children"
							:key="item2.cat_id"
							@click="rightCateClickHandle(item2.cat_id)"
						>
							<image :src="item2.cat_icon" mode="widthFix"></image>
							<text>{{ item2.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 当前设备可视高度
			wh: '',
			// 分类列表
			cateList: [],
			// 活动分类选项
			active: 0,
			// 二级分类数据
			cateListLevel2: [],
			// 距离上方的距离
			scrollTop: 0
		};
	},
	onLoad() {
		// 获取当前设备可视高度
		this.getSystemInfo();
		// 请求分类列表方法
		this.getCateList();
	},
	methods: {
		// 获取当前设备可视高度
		getSystemInfo() {
			const res = uni.getSystemInfoSync();
			this.wh = res.windowHeight + 'px';
		},
		// 请求分类列表
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			if (res.meta.status !== 200) return uni.$showToast();
			// 默认二级列表
			this.cateListLevel2 = res.message[0].children;
			this.cateList = res.message;
		},
		// 分类选项点击回调
		cateClickHandle(index) {
			// 置顶
			this.scrollTop = this.scrollTop === 0 ? 1 :0
			// 根据下标切换二级路由
			this.cateListLevel2 = this.cateList[index].children;
			this.active = index;
		},
		// 右侧分类选项点击回调
		rightCateClickHandle(cid) {
			// 携带id跳转
			uni.navigateTo({
				url:'/subpkg/goods_list/goods_list?cid=' + cid
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-box {
	display: flex;
}
.left-scroll-view-item {
	line-height: 50px;
	text-align: center;
	font-size: 12px;
	&.active {
		position: relative;
		background-color: #fff;
		&::before {
			position: absolute;
			content: '';
			display: block;
			width: 4px;
			height: 30px;
			background-color: #c00000;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
		}
	}
}

.right-scroll-view {
	background-color: #fff;
}
.right-cate-name {
	text-align: center;
	font-weight: 900;
	font-size: 14px;
	line-height: 100rpx;
}
.right-lv3 {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
}
.right-lv3-item {
	width: 33.33%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	image {
		width: 100rpx;
	}
	text {
		font-size: 24rpx;
	}
}
</style>
