<template>
    <div>
        <b-button class="add-record" @click="showModal('add')">Добавить запись</b-button>
        <div class="count">Всего записей: {{ count }}</div>
        <b-table :items="items" :fields="fields" striped responsive="sm">
            <template v-slot:cell(composition)="row">
                {{ (row.item.composition) ? row.item.composition.id : '' }}
                <b-button v-if="!row.item.composition" size="sm" variant="success" @click="getFreeList(editList.mod = 'compositions'); editList.id = row.item.id" class="mr-2">+</b-button>
                <b-button v-else size="sm" variant="danger" @click="removeComposition(row.item.id)" class="mr-2">X</b-button>
            </template>
            <template v-slot:cell(stations)="row">
                {{ row.item.stations.length }}
                <b-button size="sm" variant="success" @click="showEditList(row.item.stations, 'stations', row.item.id)" class="mr-2">+</b-button>
            </template>
            <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="primary" @click="showModal('edit', row.item)" class="mr-2">E</b-button>
                <b-button size="sm" variant="danger" @click="deleteRecord(row.item.id)" class="mr-2">X</b-button>
            </template>
        </b-table>
        <b-button v-if="count != items.length" @click="getRecords()">Загрузить еще</b-button>

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
                    label="Name:"
                >
                    <b-form-input
                        ref="name"
                        :state="modal.nameState"
                        type="text"
                        required
                        placeholder="Введите название маршрута"
                        v-model="modal.data.name"
                    />
                </b-form-group>
                <b-form-group
                    label="Время выхода:"
                >
                    <b-form-datepicker
                        v-model="modal.data.startDate"
                    />
                    <b-button v-if="modal.data.startDate" size="sm" variant="danger" @click="modal.data.startDate = null" class="mr-2">x</b-button>
                </b-form-group>
                <span class="error-message">{{ modal.data.startDate }}</span>
            </b-form>
        </b-modal>

        <b-modal id="add-station-modal"
            title="Добавление станции"
            ok-title="Ок"
            cancel-title="Отмена"
            @ok="addRouteStation"
            @hide="resetAddModalData"
        >
            <b-form
                @submit.stop.prevent="handleSubmit"
                class="add-form"
            >
                <div v-if="stationModal.data.station">{{ stationModal.data.station.id }}/{{stationModal.data.station.name}}/{{stationModal.data.station.city}}</div>
                <b-button v-else size="sm" variant="success" @click="showAddStation()" class="mr-2">+</b-button>
                <b-form-group
                    label="Order"
                >
                    <b-form-input
                        type="number"
                        required
                        v-model="stationModal.data.order"
                        disabled
                    />
                </b-form-group>
                <b-form-group
                    label="Время"
                >
                    <b-form-timepicker
                        required
                        v-model="stationModal.data.time"
                    />
                </b-form-group>

                <b-form-group
                    label="Задержка"
                >
                    <b-form-timepicker
                        required
                        v-model="stationModal.data.delay"
                    />
                </b-form-group>

                <b-form-group
                    label="Дистанция"
                >
                    <b-form-input
                        type="number"
                        required
                        v-model="stationModal.data.dist"
                    />
                </b-form-group>

                <span class="error-message">{{ modal.msg }}</span>
            </b-form>
        </b-modal>

        <b-modal id="edit-list"
            :title="editList.getTitle()"
            @ok="editListOkHandler"
            @hide="editList.showAddBtn = true;"
            size="lg"
        >
            <b-table :items="editList.items" :fields="editFields" sticky-header striped responsive="sm">
                <template v-slot:cell(actions)="row">
                    <b-button size="sm" variant="danger" @click="setStatus(row.item)" class="mr-2">X</b-button>
                </template>
            </b-table>
            <b-button v-show="editList.showAddBtn" size="sm" variant="success" @click="showStationModal()" class="mr-2">+</b-button>
        </b-modal>

        <b-modal id="add-station-list"
            title="Станции"
            ok-only
        >
            <b-table :items="stationsList" :fields="stationFields" sticky-header striped responsive="sm">
                <template v-slot:cell(actions)="row">
                    <b-button size="sm" variant="success" @click="addStation(row.item)" class="mr-2">+</b-button>
                </template>
            </b-table>
        </b-modal>

        <b-modal id="add-list"
            :title="editList.getAddTitle()"
            ok-only
        >
            <b-table :items="addingList" :fields="editFields" sticky-header striped responsive="sm">
                <template v-slot:cell(trains)="row">
                    {{ row.item.Trains.length }}
                </template>
                <template v-slot:cell(carriages)="row">
                    {{ row.item.Carriages.length }}
                </template>
                <template v-slot:cell(actions)="row">
                    <b-button size="sm" variant="success" @click="addFreeRecord(row.item)" class="mr-2">+</b-button>
                </template>
            </b-table>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Routes",
    data() {
        return {
            modal: {
                mod: "",
                data: {
                    id: "",
                    name: "",
                    startDate: "",
                },
                nameState: null,
            },
            editList: {
                mod: "compositions",
                id: null,
                items: [],
                showAddBtn: true,
                getTitle() {
                    return `Редактирование станций маршрута ${this.id}`
                },
                getAddTitle () {
                    return (this.mod == "compositions") ? "Список свободных составов" : "Список свободных вагонов";
                }
            },
            stationModal: {
                data: {
                    station: null,
                    order: null,
                    time: null,
                    delay: null,
                    dist: null,
                },
            },
            stationsList: [],
            fields: ['id', 'name', 'composition', 'startDate', 'stations', 'actions'],
            stationFields: ['id', 'name', 'city', 'actions' ],
        }
    },
    computed: {
        ...mapState({
            items: state => state.routes.list,
            count: state => state.routes.count,
            addingList: state => state.routes.addingList,
        }),
        modalTitle() {
            return (this.modal.mod == "add") ? "Добавить маршрут" : "Редактировать маршрут";
        },
        editFields() {
            let fields = {
                compositions: ['id', 'trains', 'carriages', 'actions'],
                stations: ['id', 'name', 'city', 'order', 'time', 'delay', 'dist', 'actions'],
            }
            return fields[this.editList.mod];
        }
    },
    methods: {
        // modal logic
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
            this.$store.dispatch('routes/addRecord', this.modal.data)
                .then(() => {
                    this.$bvModal.hide('modal');
                })
                .catch(() => {
                    this.resetModal();
                });
        },
        handleEditSubmit() {
            this.$store.dispatch('routes/editRecord', this.modal.data)
                .then(() => {
                    this.$bvModal.hide('modal');
                })
                .catch(() => {
                    this.resetModal();
                });
        },
        checkValid() {
            let valid = 0;
            valid += this.modal.nameState = this.$refs.name.checkValidity();
            //valid += this.modal.colorState = this.$refs.city.checkValidity();
            return valid == 1;
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
        //main logic
        addRecord() {
            this.$store.dispatch('routes/addRecord')
        },
        getRecords() {
            this.$store.dispatch('routes/getRecords');
        },
        deleteRecord(id) {
            this.$store.dispatch('routes/deleteRecord', id);
        },
        removeComposition(id) {
            this.$store.dispatch('routes/updateRelations', { data: { compositionId: null }, mod: 'composition', id: id })
        },
        // Edit list logic
        showEditList(data, mod, id) {
            this.editList.items = data.map((item) => {return { ...item, ...item.Route_Station } });
            //console.log("tst", this.editList.items);
            this.editList.id = id;
            this.editList.mod = mod;
            this.$bvModal.show('edit-list');
            this.$store.dispatch('routes/getStations', this.editList.id)
        },
        getFreeList(mod) {
            this.$store.dispatch('routes/getFreeRecords', mod);
            this.showAddBtn = true;
            this.$bvModal.show('add-list');
        },
        setStatus(item) {
            if (item._rowVariant == 'success') {
                let list = this.editList.items;
                let n = list.indexOf(item);
                list.splice(n, 1);
            }
            else
                item._rowVariant = (item._rowVariant == 'danger') ? '' : 'danger';
            //this.editList.items.push({id: 1, color: 'Test', type: 'test'})

            this.$forceUpdate()
            //if (item._rowVariant == 'success')
        },
        editListOkHandler() {
            let data = {
                del: [],
                add: [],
            }

            for (let item of this.editList.items) {
                if (item._rowVariant == 'success')
                    data.add.push(item);
                else if (item._rowVariant == 'danger')
                    data.del.push(item);

            }
            if (!data.del.length && !data.add.length)
                return;
            this.$store.dispatch('routes/updateRelations', { data: data, mod: 'stations', id: this.editList.id })
            this.$forceUpdate()
        },
        // Add list logic
        showAddModal() {
            this.$bvModal.show('add-list');
        },
        addFreeRecord(item) {
            this.$store.dispatch('routes/updateRelations', { data: { compositionId: item.id }, mod: 'composition', id: this.editList.id })
            this.$bvModal.hide('add-list');
        },
        addListOkHandler() {
            for (let key in this.addingList)
                if (this.addingList[key]._rowVariant)
                    this.editList.items.push(this.addingList[key])

            this.editList.showAddBtn = false;
        },
        resetAddModalData() {
            for (let key in this.stationModal.data) {
                this.stationModal.data[key] = null;
            }
        },
        // Add Station Logic
        showStationModal() {
            if (this.editList.items.length)
                this.stationModal.data.order = parseInt(this.editList.items[this.editList.items.length-1].order) + 1 + "";
            else
                this.stationModal.data.order = 0;
            //this.$forceUpdate()
            console.log("tst");
            this.$bvModal.show('add-station-modal');
        },
        showAddStation() {
            this.stationsList = this.addingList.filter((item) => !(this.editList.items.find((obj) => obj.id == item.id)))
            this.$bvModal.show('add-station-list');
        },
        addStation(item) {
            this.stationModal.data.station = item;
            console.log(this.stationModal.data.station);
            this.$forceUpdate()
            this.$bvModal.hide('add-station-list');
        },
        addRouteStation() {
            //bvModalEvt.preventDefault();

            let data = this.stationModal.data;
            let check = 0;

            check += !data.station;
            check += !data.time;
            check += !data.delay;
            check += !data.dist;
            //check += !data.order;

            if (check)
                return;

            this.editList.items.push({ ...this.stationModal.data, ...this.stationModal.data.station, _rowVariant: 'success' })
            this.$bvModal.hide('add-station-modal');
        },
    },
    watch: {

    },
    mounted() {
        this.getRecords();
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
