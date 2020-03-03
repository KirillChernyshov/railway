import api from '../../api/index.js'

export default {
    namespaced: true,
    state: {
        trains: [ { type: "sjdlfs"} ],
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        getCompositions(context) {
            api.getTrains(context.rootState.user.token)
                .then((req) => {
                    req
                });
        }
    }
}
