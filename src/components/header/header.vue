<template>
  <div class="header">
  	<div class="content-wrapper">
  		<div class="left-img">
  			<img :src="seller.avatar" width="64" height="64">
  		</div>
  		<div class="content">
  			<div class="title">
  				<span class="brand"></span>
  				<span class="name">{{seller.name}}</span>
  			</div>
  			<div class="desription">
  				{{seller.description}}/{{seller.deliveryTime}}
  			</div>
  			<div v-if="seller.supports" class="support">
  				<span class="ico" :class="supportMap[seller.supports[0].type]"></span>
  				<span class="text" v-on:click="showDetailFunction">{{seller.supports[0].description}}------点击我</span>
  			</div>
  		</div>
  	</div>
  	<div class="gonggao-wrapper">{{seller.bulletin}}</div>
  	<div class="background">
  		<img :src="seller.avatar" width="100%" height="100%">
  	</div>
  	<div v-show="showDetail" class="detail">
  		<span class="detail-close" v-on:click="hiddenDetailFunction">关闭</span>
  	</div>
  </div>
</template>

<script>
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			showDetail: false
		};
	},
	methods: {
		showDetailFunction() {
			this.showDetail = true;
		},
		hiddenDetailFunction() {
			this.showDetail = false;
		}
	},
	created() {
		this.supportMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	}
};
</script>
<style>
.header{color:#fff;position:relative;overflow:hidden;}
.content-wrapper{padding:24px 12px 18px 24px;font-size:0}
.left-img{display:inline-block;vertical-align:top;}
.left-img img{border-radius:2px;}
.content-wrapper .content{display:inline-block;font-size:14px;margin-left:16px;}
.title{margin:2px 0 8px 0;}
.brand{width:30px;height:18px;display:inline-block;vertical-align:top;background-size:30px 18px;background-repeat:no-repeat;background-image:url('brand@2x.png');}
.name{margin:6px;font-size:16px;line-height:18px;font-weight:bold;}
.desription{margin-bottom:10px;font-size:12px;}
.support{}
.support .ico{display:inline-block;width:12px;height:12px;margin-right:10px;background-size:12px 12px;vertical-align:top;}
.discount{background-image:url('discount_1@2x.png');}
.decrease{background-image:url('decrease_1@2x.png');}
.guarantee{background-image:url('guarantee_1@2x.png');}
.invoice{background-image:url('invoice_1@2x.png');}
.special{background-image:url('special_1@2x.png');}
.text{font-size:12px;}
.gonggao-wrapper{height:28px;line-height:28px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 12px;background:rgba(0,0,0,0.5);}
.background{position:absolute;width:100%;height:100%;top:0;left:0;filter:blur(10px);z-index:-1;}
.detail{position:fixed;width:100%;height:100%;z-index:100;top:0;left:0;overflow:auto;background:rgba(0,0,0,.5);}
.detail-close{display:block;text-align:center;padding-top:10px;}
&media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
	.brand{background-image:url('brand@3x.png');}
 	.discount{background-image:url('discount_1@3x.png');}
	.decrease{background-image:url('decrease_1@3x.png');}
	.guarantee{background-image:url('guarantee_1@3x.png');}
	.invoice{background-image:url('invoice_1@3x.png');}
	.special{background-image:url('special_1@3x.png');}
}
</style>
