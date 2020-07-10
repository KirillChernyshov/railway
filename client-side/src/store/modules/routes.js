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
            //console.log(state.list);
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
            api.getRecords('routes', context.state.list.length, limit)
                .then((result) => {
                    console.log(result.data);
                    context.commit('setData', result.data);
                }).catch((e) => {
                    console.log(e.errorMessage);
                    alert(e);
                });
        },
        addRecord(context, data) {
            api.addRecord('routes', data)
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
                    console.log(result);
                    context.commit('setAddingList', result.data);
                }).catch((e) => {
                    console.log(e.response);
                })
        },
        updateRelations(context, data) {
            console.log(data.data.add);
            api.updateRouteRelations(data.mod, data.data, data.id)
                .then(() => {
                    let limit = context.state.list.length;
                    context.state.list = [];
                    context.dispatch('getRecords', limit);
                }).catch((e) => {
                    console.log(e.response.data.errorMessage);
                });
        },
        getStations(context) {
            api.getRecords('stations', 0, 0)
                .then((result) => {
                    context.commit('setAddingList', result.data.list);
                }).catch((e) => {
                    console.log(e.response);
                })
        },
        deleteRecord(context, id) {
            api.deleteRecord('routes', id)
                .then(() => {
                    let limit = context.state.list.length;
                    context.state.list = [];
                    context.dispatch('getRecords', limit);
                }).catch((e) => {
                    alert(e);
                })
        },
        editRecord(context, data) {
            return new Promise((resolve, reject) => {
                api.editRecord('routes', data)
                    .then((result) => {
                        if(result.data.messageError)
                            reject(result.data.messageError);

                        let limit = context.state.list.length;
                        context.state.list = [];
                        context.dispatch('getRecords', limit);
                        //context.commit("addRecord", result.data);
                        resolve();
                    }).catch((e) => {
                        alert(e, "route/edit");
                        reject(e);
                    })
            });
        },


        getTimetable(context) {
            api.getTimetable()
                .then((result) => {
                    context.commit('setData', { list: result.data });
                    console.log(result.data);
                })
        }
    }
}
