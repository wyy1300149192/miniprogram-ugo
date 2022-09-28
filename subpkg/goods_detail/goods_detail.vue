<template>
	<view v-if="goods.goods_name" class="goods-detail-box">
		<!-- 商品轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item @click="preview(index)" v-for="(item,index) in goods.pics" :key="item.pics_id">
				<image :src="item.pics_big" mode=""></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<view class="goods-price">
				￥{{goods.goods_price}}
			</view>
			<view class="goods-title">
				<view class="title">
					{{goods.goods_name}}
				</view>
				<view class="star">
					<uni-icons type="star" size="25" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="freight">
				<text>快递：免运费</text>
			</view>
		</view>
		<!-- 商品介绍部分 -->
		<rich-text :nodes="goods.goods_introduce" P></rich-text>
		<!-- 商品底部导航区域 -->
		<view class="bottom-nav" >
			<uni-goods-nav fill :options="options" :button-group="buttonGroup" @click="navClick" @buttonClick="" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前商品id
				goods_id: '',
				// 当前商品信息
				goods: {},
				// 底部导航数据
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.goods_id = options.goods_id
			this.getGoodsDetail(this.goods_id)

		},
		methods: {
			// 请求商品详情
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showToast()
				// 解决商品介绍图片空隙的问题
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
					"<img style='display: block'")
				this.goods = res.message
			},
			// 商品轮播图点击回调
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods.pics.map(x => x.pics_big)
				})
			},
			// 底部导航栏点击回调
			navClick(e) {
				if(e.content.text === '购物车') {
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-detail-box {
		padding-bottom: 50px;
	}
	swiper {
		height: 720rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		margin-top: 10rpx;
		background-color: #fff;
		padding: 15rpx;

		.goods-price {
			color: #c00000;
			font-size: 45rpx;
		}

		.goods-title {
			display: flex;
			margin-top: 10rpx;

			.title {
				font-size: 28rpx;
			}

			.star {
				display: flex;
				margin-left: 15rpx;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 200rpx;
				color: gray;
				border-left: 1px solid #dfdfdf;

				text {
					font-size: 25rpx;
				}
			}
		}

		.freight {
			margin-top: 8rpx;

			text {
				font-size: 26rpx;
				color: gray;
			}
		}
		
	}
	.bottom-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
