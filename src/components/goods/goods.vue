<template>
    <div class="goods">
        <div class="menu-wrapper" ref="meunWrapper">
            <ul>
                <li v-for="(item,key) in goods" :key="item.name" class="left-li" :class="{'current': currentIndex===key}" @click="_selectMeun(key, $event)">
                    <span class="text">
                    <span class="icon"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="item in goods" :key="item.name" class="foot-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" :key="food.name" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="price">
                                    <span>{{food.price}}元</span>
                                    <span v-show="food.oldPrice">{{food.oldPrice}}元</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <v-cartcontrol :food="food"></v-cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shopcart>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scolY: 0
        };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scolY >= height1 && this.scolY < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    created() {
        this.$http.get('/api/goods').then(response => {
            // 成功
            // get body data
            response = response.body;
            const ERR_OK = 0;
            if (response.errno === ERR_OK) {
                this.goods = response.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            }
        }, response => {
            // erro
        });
    },
    methods: {
        _selectMeun(index, event) {
            if (!event._constructed) { // 判断pc的事件 解决手机端两次派发事件 onclick两次
                return;
            }
            let foodList = this.$refs.foodWrapper.getElementsByClassName('foot-list-hook');
            let el = foodList[index];
            this.foodScroll.scrollToElement(el, 300);
        },
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.meunWrapper, {
                click: true
            });
            this.foodScroll = new BScroll(this.$refs.foodWrapper, {
                probeType: 3,
                click: true
            });
            this.foodScroll.on('scroll', (pos) => {
                this.scolY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodWrapper.getElementsByClassName('foot-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        }
    },
    components: {
        'v-shopcart': shopcart,
        'v-cartcontrol': cartcontrol
    }
};
</script>
<style>
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
}

.goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
}

.foods-wrapper {
    flex: 1
}

.left-li {
    text-align: center;
    height: 56px;
    display: block;
    border-bottom: 1px solid #ccc;
}

.current {
    background: #fff;
}

h1.title {
    height: 26px;
    line-height: 26px;
    background-color: #ccc;
    font-size: 12;
    padding-left: 20px;
    margin: 0
}

.food-item {
    display: flex;
    margin: 18px;
}

.food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
}

.food-item .content {
    flex: 1;
    position: relative;
}

.food-item .content .name {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    margin: 2px 0 8px 0;
    color: rgb(7, 17, 27);
}

.food-item .content .desc {
    margin-bottom: 8px;
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
}

.food-item .content .price {
    color: red;
    font-size: 10px;
    font-weight: bold;
}

.cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 4px;
}
</style>