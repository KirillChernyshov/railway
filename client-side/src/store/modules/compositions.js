import api from '../../api/index.js'

export default {
    namespaced: true,
    state: {
        list: [],
        count: 0,
    },
    getters: {

    },
    mutations: {
        setData(state, data) {
            state.list = state.list.concat(data.list);
            state.count = data.count;
        },
        clearData(state) {
            state.list = [];
        }
    },
    actions: {
        getRecords(context, limit) {
            api.getRecords('compositions', context.state.list.length, limit)
                .then((result) => {
                    console.log(result.data.list);
                    context.commit('setData', result.data);
                }).catch((e) => {
                    console.log(e.errorMessage);
                    alert(e);
                });
        },
        getFreeRecords(context, mod) {
            api.getFreeRecords(mod)
                .then((result) => {
                    console.log(result)
                }).catch((e) => {
                    console.log(e.response);
                })
        }
    }
}
