<template>
    <div id="app">
        <v-header v-bind:seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view v-bind:seller="seller"></router-view>
    </div>
</template>
<script>
import header from 'components/header/header';
export default {
    data() {
            return {
                seller: {}
            };
        },
        created() {
            this.$http.get('/api/seller').then(response => {
                // 成功
                // get body data
                response = response.body;
                const ERR_OK = 0;
                if (response.errno === ERR_OK) {
                    this.seller = response.data;
                }
            }, response => {
                // erro
            });
        },
        components: {
            'v-header': header
        }
};
</script>
<style>
.tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.tab .tab-item {
    flex: 1;
    text-align: center;
}

.border-1px {
    position: relative;
}

.border-1px:after {
    display: block;
    width: 100%;
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
}

.tab-item a {
    display: block;
    font-size: 16px;
    color: rgb(77, 85, 93);
}

.tab-item a.active {
    color: rgb(240, 20, 20);
}

&media (-webkit-min-device-pixel-ratio:1.5),
(min-device-pixel-ratio:1.5) {
    .border-1px::after {
        -webkit-transform: scaleY(0.7);
        transform: scaleY(0.7);
    }
}

&media (-webkit-min-device-pixel-ratio:2),
(min-device-pixel-ratio:2) {
    .border-1px::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}
</style>