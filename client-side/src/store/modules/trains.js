import api from '../../api/index.js'

export default {
    namespaced: true,
    state: {
        list: [ ],
        count: 0,
    },
    getters: {

    },
    mutations: {
        setData(state, data) {
            state.list = state.list.concat(data.list);
            state.count = data.count;
        },
    },
    actions: {
        getTrains(context) {
            api.getTrains(context.state.list.length)
                .then((result) => {
                    console.log(result.data.count);
                    context.commit('setData', result.data)
                }).catch((e) => {
                    console.log("sdfsdfskdhfj");
                    alert(e);
                });
        }
    }
}
