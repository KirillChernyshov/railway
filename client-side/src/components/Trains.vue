<template>
    <div>
        <b-button class="add-record" @click="showModal('add')">Добавить запись</b-button>
        <div class="count">Всего записей: {{ count }}</div>
        <b-table :items="items" :fields="fields" striped responsive="sm">
            <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="primary" @click="showModal('edit', row.item)" class="mr-2">E</b-button>
                <b-button size="sm" variant="danger" @click="deleteRecord(row.item.id)" class="mr-2">X</b-button>
            </template>
        </b-table>
        <b-button v-if="count != items.length" @click="getTrains">Загрузить еще</b-button>

        <b-modal id="modal"
            :title="modalTitle"
            ok-title="Ок"
            cancel-title="Отмена"
            @ok="handleOk"
            @show="resetModal"
        >
            <b-form
                @submit.stop.prevent="handleSubmit"
                class="add-form"
            >
                <b-form-group
                    label="ID:"
                    v-if="modal.data.id"
                >
                    <b-form-input
                        type="text"
                        required
                        v-model="modal.data.id"
                        disabled
                    />
                </b-form-group>
                <b-form-group
                    label="Type:"
                >
                    <b-form-input
                        ref="type"
                        :state="modal.typeState"
                        type="text"
                        required
                        placeholder="Введите тип поезда"
                        v-model="modal.data.type"
                    />
                </b-form-group>
                <b-form-group
                    label="Цвет:"
                >
                    <b-form-input
                        ref="color"
                        :state="modal.colorState"
                        type="text"
                        required
                        placeholder="Введите цвет поезда"
                        v-model="modal.data.color"
                    />
                </b-form-group>
                <span class="error-message">{{ modal.msg }}</span>
            </b-form>
        </b-modal>

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Trains",
    data() {
        return {
            modal: {
                mod: "",
                data: {
                    id: "",
                    type: "",
                    color: "",
                },
                typeState: null,
                colorState: null,
            },
            fields: ['id', 'type', 'color', 'compositionId', 'actions'],
        }
    },
    computed: {
        ...mapState({
            items: state => state.trains.list,
            count: state => state.trains.count,
        }),
        modalTitle() {
            return (this.modal.mod == "add") ? "Добавить поезд" : "Редактировать поезд";
        },
    },
    methods: {
        showModal(mod, data) {
            this.modal.mod = mod;

            if (mod == "edit")
                this.modal.data = {...data};
            else
                this.resetModalData();

            this.$bvModal.show('modal');
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();

            if (!this.checkValid())
                return;

            if (this.modal.mod == "add")
                this.handleAddSubmit();
            else if (this.modal.mod == "edit")
                this.handleEditSubmit();
        },
        handleAddSubmit() {
            this.$store.dispatch('trains/addRecord', this.modal.data)
                .then(() => {
                    this.$bvModal.hide('modal');
                })
                .catch((e) => {
                    this.modal.typeState = null;
                    this.modal.colorState = null;
                    this.modal.msg = e;
                });
        },
        handleEditSubmit() {
            this.$store.dispatch('trains/editRecord', this.modal.data)
                .then(() => {
                    this.$bvModal.hide('modal');
                })
                .catch((e) => {
                    this.modal.typeState = null;
                    this.modal.colorState = null;
                    this.modal.msg = e;
                });
        },
        checkValid() {
            let valid = 0;
            valid += this.modal.typeState = this.$refs.type.checkValidity();
            valid += this.modal.colorState = this.$refs.color.checkValidity();
            return valid == 2;
        },
        resetModal() {
            for (let key in this.modal) {
                if (key == "data" || key == "mod")
                    continue;
                this.modal[key] = null;
            }
        },
        resetModalData() {
            for (let key in this.modal.data) {
                this.modal.data[key] = null;
            }
        },
        getTrains() {
            this.$store.dispatch('trains/getRecords');
        },
        deleteRecord(id) {
            this.$store.dispatch('trains/deleteRecord', id);
        },
    },
    created() {
        this.getTrains();
    }
}

</script>

<style scoped>
.add-record {
    float: right;
}

.count {
    float: right;
    margin-right: 2vh;
    margin-top: 1vh;
}

.mr-2 {
    height: 4vh;
}

.error-message {
    color: red;
}

</style>
