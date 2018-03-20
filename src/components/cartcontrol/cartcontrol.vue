<template>
    <div class="cartcontrol">
        <div class="cart-decrease icon-remove_circle_outline" v-on:click="cartDecrease($event)" v-show="food.count>0"></div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" v-on:click="addCart($event)"></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    created() {

    },
    methods: {
        cartDecrease(event) {
            if (!event._constructed) {
                return;
            }
            this.food.count--;
        },
        addCart(event) {
            if (!event._constructed) {
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
        }
    }
};
</script>
<style>
.cartcontrol .cart-decrease,
.cart-count,
.cart-add {
    display: inline-block;
}

.cart-count {
    width: 12px;
    vertical-align: top;
    padding-top: 6px;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
}

.cartcontrol .cart-decrease,
.cartcontrol .cart-add {
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 260);
}
</style>