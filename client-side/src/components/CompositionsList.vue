<template>
    <div id="mainPage">
        <b-list-group class="menu">
            <b-list-group-item button :active="currentList == 'routes'" @click="currentList = 'routes'">Маршруты</b-list-group-item>
            <b-list-group-item button :active="currentList == 'compositions'" @click="currentList = 'compositions'">Составы</b-list-group-item>
            <b-list-group-item button :active="currentList == 'trains'" @click="currentList = 'trains'">Поезда</b-list-group-item>
            <b-list-group-item button :active="currentList == 'carriages'" @click="currentList = 'carriages'">Вагоны</b-list-group-item>
            <b-list-group-item button :active="currentList == 'stations'" @click="currentList = 'stations'">Станции</b-list-group-item>
        </b-list-group>
        <component :is="currentList"></component>
    </div>
</template>

<script>

export default {
    name: "CompositionsList",
    data() {
        return {
            currentList: "trains",
        }
    },
    computed: {

    },
    methods: {

    },
    components: {
        compositions: () => import('./Compositions.vue'),
        trains: () => import('./Trains.vue'),
        carriages: () => import('./Carriages.vue'),
        stations: () => import('./Stations.vue'),
        routes: () => import('./Routes.vue'),
    },
    created() {

    }
}

</script>

<style scoped>
#mainPage {
    padding: 2vh 10vh;
    display: grid;
    grid-template-columns: 1fr 5fr;
}


</style>
