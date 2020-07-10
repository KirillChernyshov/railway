<template>
    <div id="mainPage">
        <h3 class="count" @click="test">Расписание</h3>
        <b-table :items="localItems" :fields="fields" striped responsive="sm">
            <template v-slot:cell(show_details)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>

            <template v-slot:row-details="row">
                <b-table :items="row.item.stations" responsive="sm" dark>

                </b-table>
            </template>

        </b-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    name: "CompositionsList",
    data() {
        return {
            fields: ['name', 'startDate', 'show_details'],
            localItems: [],
        }
    },
    computed: {
        ...mapState({
            items: state => state.routes.list,
        }),
    },
    methods: {
        test() {
            console.log(moment('05:05:00', 'hh:mm:ss').format());

        }
    },
    components: {

    },
    watch: {
        items (val) {
            if (!val)
                return;
            let date;

            this.localItems = val.map((item) => ({
                name: item.name,
                startDate: moment(item.startDate).format('DD-MM-YYYY'),
                stations: item.stations.map((station) => ({
                    name: station.name,
                    city: station.city,
                    //time: station.Route_Station.time,
                    arrival: station.Route_Station.time,
                    departure: station.Route_Station.delay,
                    //departuree: station.Route_Station.delay,
                    //order: station.Route_Station.order,
                })).sort((a, b) => {
                    return a.order - b.order
                }),
            }));
            //console.log(this.localItems[0]._date, this.localItems[0]._date)
            this.localItems = this.localItems.map((item) => ({
                ...item,
                _date: date = moment(item.startDate),
                stations: item.stations.map((station) => ({
                    ...station,
                    arrival: date.add(moment.duration(station.arrival)).format('DD-MM-YYYY HH:mm'),
                    departure: date.add(moment.duration(station.departure)).format('DD-MM-YYYY HH:mm'),
                }))
            }));
        },
    },
    created() {
        this.$store.dispatch('routes/getTimetable');
    }
}

</script>

<style scoped>
#mainPage {
    padding: 2vh 10vh;
}

</style>
