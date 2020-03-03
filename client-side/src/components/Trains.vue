<template>
    <div>
        <b-button class="add-record">Добавить запись</b-button>
        <div class="count">Всего записей: {{ count }}</div>
        <b-table :items="items" :fields="fields" striped responsive="sm">

        </b-table>
        <b-button v-if="count != items.length" @click="getTrains">Загрузить еще</b-button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Trains",
    data() {
        return {
            fields: ['id', 'type', 'color', 'actions'],
        }
    },
    computed: {
        ...mapState({
            items: state => state.trains.list,
            count: state => state.trains.count,
        })
    },
    methods: {
        getTrains() {
            this.$store.dispatch('trains/getTrains');
        }
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

</style>
