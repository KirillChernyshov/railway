<template>
    <div>
        Hello
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: "compositons",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            
        })
    },
    methods: {

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
