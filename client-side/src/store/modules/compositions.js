import api from '../../api/index.js'

export default {
    namespaced: true,
    state: {
        list: [],
        count: 0,
        addingList: [],
    },
    getters: {

    },
    mutations: {
        setData(state, data) {
            state.list = state.list.concat(data.list);
            //console.log(state.list.trains.length);
            state.count = data.count;
        },
        clearData(state) {
            state.list = [];
        },
        setAddingList(state, data) {
            state.addingList = data;
        }
    },
    actions: {
        getRecords(context, limit) {
            api.getRecords('compositions', context.state.list.length, limit)
                .then((result) => {
                    console.log(result.data);
                    context.commit('setData', result.data);
                }).catch((e) => {
                    console.log(e.errorMessage);
                    alert(e);
                });
        },
        addRecord(context) {
            api.addRecord('compositions')
                .then(() => {
                    let limit = context.state.list.length;
                    context.state.list = [];
                    context.dispatch('getRecords', limit+1);
                    //context.commit("addRecord", result.data);
                }).catch((e) => {
                    console.log(e.response.errorMessage);
                });
        },
        getFreeRecords(context, mod) {
            api.getFreeRecords(mod)
                .then((result) => {
                    context.commit('setAddingList', result.data);
                }).catch((e) => {
                    console.log(e.response);
                })
        },
        updateRelations(context, data) {
            api.updateCompositionRelations(data.mod, data.data, data.id)
                .then(() => {
                    let limit = context.state.list.length;
                    context.state.list = [];
                    context.dispatch('getRecords', limit);
                }).catch((e) => {
                    console.log(e.response.errorMessage);
                });
        }
    }
}
