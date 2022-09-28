<template>
	<view>
		<view class="goods-list-item" @click="click">
			<view class="left-item">
				<image :src="goods.goods_small_logo || defaultPic" mode=""></image>
			</view>
			<view class="right-item">
				<view class="title">
					{{goods.goods_name}}
				</view>
				<view class="price">
					￥{{goods.goods_price | tofixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				// 默认商品图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

			};
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.goods-list-item {
		display: flex;
		padding: 10rpx;
		border-bottom: 1px solid #eaeaea;

		.left-item {
			image {
				width: 230rpx;
				height: 200rpx;
			}
		}

		.right-item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 10rpx;

			.title {
				font-size: 24rpx;
				font-weight: bold;
			}

			.price {
				color: #c00000;

			}
		}
	}
</style>
