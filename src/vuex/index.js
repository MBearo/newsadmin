import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // token:"9SoQjTk7rsUSF0fSLZdYW0AJb0jVBkN8LIyClNFw9ICRHKAsVUpcVpPRHrlH",
        token: localStorage.token,
        user: {
            img: 'http://img2.cache.netease.com/game/img17/blizzard/img/new_icon_7.png',
            desc: '',
            id: 102,
            male: '',
            name: "u_nQVQUZ0rzE9t",
            nick: '',
            tag: []
        },
        scrollY: 0,
        articleNew: true,
        article: {
            cover: '',
            title: '',
            share: '',
            contents: ''
        },
        articleId: localStorage.articleId,
        editArticleId: localStorage.editArticleId
    },
    actions: {

    },
    mutations: {
        Scroll_M(state, {
            result
        }) {
            state.scrollY = result
        },
        User_M(state, {
            result
        }) {
            state.token = result.data.data.token;
            state.user = result.data.data.user;
        },
    },
    getters: {},
    modules: {}
})

