<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div v-show="totalCount>0" class="num">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">¥ {{totalPrice}}元</div>
                <div class="desc">另需配送费 ¥ {{deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="goClass">{{goPrice}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return [];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        goPrice() {
            if (this.totalPrice === 0) {
                return `¥ ${this.minPrice}元起送`;
            } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差¥ ${diff}元`;
            } else {
                return `去结算`;
            }
        },
        goClass() {
            if (this.totalPrice >= this.minPrice) {
                return 'enough';
            }
        }
    }
};
</script>
<style>
.shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
}

.shopcart .content {
    display: flex;
    background-color: #141d27;
}

.shopcart .content-left {
    flex: 1;
}

.content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-sizing: border-box;
    vertical-align: top;
    background: #141d27;
    line-height: 56px;
}

.content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    background: red;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    color: #fff;
}

.logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    color: #80858a;
    text-align: center;
}

.logo-wrapper .highlight {
    color: #fff;
    background: rgb(0, 160, 220);
}

.icon-shopping_cart {
    font-size: 24px;
}

.content-left .price {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right: 12px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, .7);
}

.content-left .highlight {
    color: #fff;
}

.content-left .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    color: rgba(255, 255, 255, .7);
    font-size: 10px;
}

.shopcart .content-right {
    width: 105px;
    flex: 0 0 105px;
    background: #2b343c;
    line-height: 48px;
    text-align: center;
    color: rgba(255, 255, 255, .7);
    font-size: 12px;
}

.shopcart .enough {
    background: #00b43c;
    font-size: 14px;
    color: #fff;
}
</style>