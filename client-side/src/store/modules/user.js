import api from '../../api/index.js'

export default {
    namespaced: true,
    state: {
        coolMessage: "hahahah",
        name: localStorage.name,
        role: localStorage.role,
        token: localStorage.token,
    },
    getters: {
        isAuthenticated (state) {
            return !!state.token;
        }
    },
    mutations: {
        setUser(state, user) {
            localStorage.name = state.name = user.name;
            localStorage.role = state.role = user.role;
            localStorage.token = state.token = user.token;
            api.setToken(user.token);
        },
        clearStore(state) {
            localStorage.clear();
            state.name = "";
            state.role = "";
            state.token = "";
        }
    },
    actions: {
        login(context, userData) {
            return new Promise((resolve, reject) => {
                api.login(userData)
                    .then(req => {
                        if (req.data.errorMessage)
                            return reject(req.data.errorMessage);
                        if (req.data.user) {
                            context.commit('setUser', req.data.user);
                            return resolve();
                        }
                    })
            });
        },
        logOut(context) {
            api.logOut(context.state.token)
                .then(req => {
                    if (req.data.msg == "success");
                        context.commit('clearStore');
                })
                .catch((e) => {
                    console.log(e);
                    context.commit('clearStore');
                });
        }
    }
}
