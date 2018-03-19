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
  				<span class="text">{{seller.supports[0].description}}</span>
  			</div>
  		</div>
  	</div>
  	<div class="gonggao-wrapper">wew</div>
  </div>
</template>

<script>
export default {
	props: {
		seller: {
			type: Object
		}
	},
	created() {
		this.supportMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	}
};
</script>
<style>
.header{color:#fff;background:black;}
.content-wrapper{padding:24px 12px 18px 24px;font-size:0}
.left-img{display:inline-block;vertical-align:top;}
.left-img img{border-radius:2px;}
.content{display:inline-block;font-size:14px;margin-left:16px;}
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
&media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
  .brand{background-image:url('brand@3x.png');}
}
</style>
