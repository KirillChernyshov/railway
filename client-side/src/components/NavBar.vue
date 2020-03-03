<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/compositions" v-if="userRole == 10">Составы</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="!userName" right @click="$bvModal.show('login-modal')">Login</b-nav-item>

                    <b-nav-item-dropdown v-else :text="userName" right>
                        <b-dropdown-item @click="logOut">logOut</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>

        <b-modal id="login-modal"
            title="Авторизация"
            ok-title="Войти"
            cancel-title="Отмена"
            @ok="handleOk"
            @show="resetModal"
        >
            <b-form
                @submit.stop.prevent="handleSubmit"
                class="login-form"
            >
                <b-form-group
                    label="Email адрес:"
                >
                    <b-form-input
                        ref="email"
                        :state="login.emailState"
                        type="email"
                        required
                        placeholder="Введите email"
                        v-model="login.email"
                    />
                </b-form-group>
                <b-form-group
                    label="Пароль:"
                >
                    <b-form-input
                        ref="password"
                        :state="login.passwordState"
                        type="password"
                        required
                        placeholder="Введите пароль"
                        v-model="login.password"
                    />
                </b-form-group>
                <b-spinner v-if="login.spiner" variant="success" type="grow" label="Spinning"></b-spinner>
                <span class="error-message">{{ login.msg }} {{ userName }}</span>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "NavBar",
    data() {
        return {
            login: {
                emailState: null,
                passwordState: null,
                email: '',
                password: '',
                msg: '',
            },
        }
    },
    computed: {
        ...mapState({
            userName: state => state.user.name,
            userRole: state => state.user.role,
        })
    },
    methods: {
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();

            if (!this.checkValid())
                return;

            this.handleSubmit();
        },
        checkValid() {
            let valid = 0;
            valid += this.login.emailState = this.$refs.email.checkValidity();
            valid += this.login.passwordState = this.$refs.password.checkValidity();
            return valid == 2;
        },
        handleSubmit() {
            this.login.msg = "";
            this.login.spiner = true;
            this.$store.dispatch('user/login', { email: this.login.email, password: this.login.password })
                .then(() => {
                    this.$bvModal.hide('login-modal');
                })
                .catch((e) => {
                    this.login.spiner = false;
                    this.login.emailState = null;
                    this.login.passwordState = null;
                    this.login.msg = e;
                });
        },
        resetModal() {
            this.login.emailState = null;
            this.login.passwordState = null;
            this.login.email = null;
            this.login.password = null;
            this.login.name = null;
            this.login.spiner = false;
        },
        logOut() {
            this.$store.dispatch('user/logOut')
        }
    }
}

</script>

<style scoped>

.login-form {
    min-height: 205px;
}

.error-message {
    color: red;
}
</style>
