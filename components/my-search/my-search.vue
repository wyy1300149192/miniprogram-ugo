<template>
	<view class="mysearch-container" :style="{ 'background-color': backCol }">
		<view class="mysearch" :style="{ 'border-radius': (radius + 'px') }" @click="searchClick">
			<view class="my-search-text">
				<uni-icons type="search"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'search',
	props: {
		backCol: {
			type: String,
			default: '#c00000'
		},
		radius: {
			type: Number,
			default: 17
		}
	},
	methods: {
		// 搜索点击回调
		searchClick() {
			this.$emit('click')
		}
	}
};
</script>

<style lang="scss" scoped>
.mysearch-container {
	display: flex;
	padding: 0 10px;
	align-items: center;
	background-color: #c00000;
	height: 50px;
	.mysearch {
		width: 100%;
		height: 34px;
		background-color: #fff;
		text-align: center;
		line-height: 34px;
		text {
			margin-left: 5px;
		}
	}
}
</style>
