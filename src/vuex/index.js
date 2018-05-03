import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import urls from './urls'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // token:"9SoQjTk7rsUSF0fSLZdYW0AJb0jVBkN8LIyClNFw9ICRHKAsVUpcVpPRHrlH",
        token: {
            Id:''
        },
        user: {
            img: 'http://img2.cache.netease.com/game/img17/blizzard/img/new_icon_7.png',
            desc: '',
            id: 102,
            male: '',
            name: "",
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
        editArticleId: localStorage.editArticleId,
        category: []
    },
    actions: {
        LoginAction({
            commit,
            state
        }) {
            axios
                .post(
                    urls.urls + "Graduation/ReadData",
                    qs.stringify({
                        batch: true,
                        object: 'news'
                    })
                )
                .then(result => {
                    commit('NewsList_M', {
                        result
                    });
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        CategoryAction({
            commit,
            state
        }) {
            axios
                .post(
                    urls.urls + "Graduation/ReadData",
                    qs.stringify({
                        batch: true,
                        object: 'category'
                    })
                )
                .then(result => {
                    commit('Category_M', {
                        result
                    });
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        
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
            console.log(result)
            state.token = result.data.data;
           // state.user = result.data.data.user;
        },
        Category_M(state, {
            result
        }) {
            state.category = result.data.data.list;
        },
    },
    getters: {},
    modules: {}
})

