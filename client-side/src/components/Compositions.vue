<template>
    <div>
        <b-button class="add-record" @click="addRecord()">Добавить запись</b-button>
        <div class="count">Всего записей: {{ count }}</div>
        <b-table :items="items" :fields="fields" striped responsive="sm">
            <template v-slot:cell(trains)="row">
                amount: {{ row.item.Trains.length }}
                <b-button size="sm" variant="primary"  @click="showEditList(row.item.Trains, 'trains', row.item.id)" class="mr-2">E</b-button>
            </template>
            <template v-slot:cell(carriages)="row">
                amount: {{ row.item.Carriages.length }}
                <b-button size="sm" variant="primary" @click="showEditList(row.item.Carriages, 'carriages', row.item.id)" class="mr-2">E</b-button>
            </template>
            <template v-slot:cell(actions)="row">
                <!--<b-button size="sm" variant="primary" @click="showModal('edit', row.item)" class="mr-2">E</b-button>-->
                <b-button size="sm" variant="danger" @click="deleteRecord(row.item.id)" class="mr-2">X</b-button>
            </template>
        </b-table>
        <b-button v-if="count != items.length" @click="getRecords">Загрузить еще</b-button>

        <b-modal id="edit-list"
            :title="editList.getTitle()"
            @ok="editListOkHandler"
            @hide="editList.showAddBtn = true;"
        >
            <b-table :items="editList.items" :fields="editFields" sticky-header striped responsive="sm">
                <template v-slot:cell(actions)="row">
                    <b-button size="sm" variant="danger" @click="setStatus(row.item)" class="mr-2">X</b-button>
                </template>
            </b-table>
            <b-button v-show="editList.showAddBtn" size="sm" variant="success" @click="getFreeList(editList.mod)" class="mr-2">+</b-button>
        </b-modal>

        <b-modal id="add-list"
            :title="editList.getAddTitle()"
            ok-only
            @ok="addListOkHandler"
        >
            <b-table :items="addingList" :fields="editFields" sticky-header striped responsive="sm">
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
    name: "Compositions",
    data() {
        return {
            editList: {
                mod: "trains",
                id: null,
                items: [],
                showAddBtn: true,
                getTitle () {
                    return (this.mod == "trains") ? "Изменить поезда в составе" : "Изменить вагоны в составе";
                },
                getAddTitle () {
                    return (this.mod == "trains") ? "Список свободных поездов" : "Список свободных вагонов";
                }
            },
            fields: ['id', 'trains', 'carriages', 'routeId', 'actions'],
        }
    },
    computed: {
        ...mapState({
            items: state => state.compositions.list,
            count: state => state.compositions.count,
            addingList: state => state.compositions.addingList,
        }),
        editFields() {
            let fields = {
                carriages: ['id', 'type', 'color', 'seats', 'actions'],
                trains: ['id', 'type', 'color', 'actions'],
            }
            return fields[this.editList.mod];
        }
    },
    methods: {
        addRecord() {
            this.$store.dispatch('compositions/addRecord')
        },
        getRecords() {
            this.$store.dispatch('compositions/getRecords');
        },
        deleteRecord(id) {
            this.$store.dispatch('compositions/deleteRecord', id);
        },
        // Edit list logic
        showEditList(data, mod, id) {
            this.editList.id = id;
            this.editList.items = [...data];
            this.editList.mod = mod;
            this.$bvModal.show('edit-list');
            this.$store.dispatch('compositions/getFreeRecords', mod);
        },
        getFreeList(mod) {
            console.log(mod);
            this.$store.dispatch('compositions/getFreeRecords', mod);
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
            this.$store.dispatch('compositions/updateRelations', { data: data, mod: this.editList.mod, id: this.editList.id })
            this.$forceUpdate()
        },
        // Add list logic
        addFreeRecord(item) {
            item._rowVariant = (item._rowVariant) ? '' : 'success';
            //this.editList.items.push(item);
            //this.$bvModal.hide('add-list');

            this.$forceUpdate()
        },
        addListOkHandler() {
            for (let key in this.addingList)
                if (this.addingList[key]._rowVariant)
                    this.editList.items.push(this.addingList[key])

            this.editList.showAddBtn = false;
        }
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
