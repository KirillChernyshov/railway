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
        addRecord(state, record) {
            state.list.unshift(record);
        }
    },
    actions: {
        getRecords(context, limit) {
            api.getRecords('trains', context.state.list.length, limit)
                .then((result) => {
                    context.commit('setData', result.data)
                }).catch((e) => {
                    console.log(e.errorMessage);
                    alert(e);
                });
        },
        deleteRecord(context, id) {
            api.deleteRecord('trains', id)
                .then(() => {
                    let limit = context.state.list.length;
                    context.state.list = [];
                    context.dispatch('getRecords', limit);
                }).catch((e) => {
                    alert(e);
                })
        },
        addRecord(context, data) {
            return new Promise((resolve, reject) => {
                api.addRecord('trains', data)
                    .then((result) => {
                        if(result.data.messageError)
                            reject(result.data.messageError);

                        let limit = context.state.list.length;
                        context.state.list = [];
                        context.dispatch('getRecords', limit+1);
                        //context.commit("addRecord", result.data);
                        resolve();
                    }).catch((e) => {
                        alert(e, "trains/addRecord");
                        reject(e);
                    })
            });
        },
        editRecord(context, data) {
            return new Promise((resolve, reject) => {
                api.editRecord('trains', data)
                    .then((result) => {
                        if(result.data.messageError)
                            reject(result.data.messageError);

                        let limit = context.state.list.length;
                        context.state.list = [];
                        context.dispatch('getRecords', limit);
                        //context.commit("addRecord", result.data);
                        resolve();
                    }).catch((e) => {
                        alert(e, "trains/addCarriage");
                        reject(e);
                    })
            });
        }
    }
}
