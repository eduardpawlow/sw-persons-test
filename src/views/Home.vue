<template>
    <div>
        <v-row>
            <v-col class="text-center">
                <h1 :class="getTheme ? 'darkside' : 'lightside'">Давным-давно, в далёкой-далёкой галактике…</h1>
                <hr :class="getTheme ? 'hr-darkside' : 'hr-lightside'">
            </v-col>
        </v-row>
        <v-row v-if="getNameViewedPersons == 0">
            <v-col class="text-center">
                <h2 :class="(getTheme? 'darkside' : 'lightside') +'-title'">Изученных персонажей нет!</h2>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-chip
                    x-large
                    :color="getTheme? '#d82929' : '#428e12'"
                    v-for="(person,i) of getNameViewedPersons"
                    :key="i"
                    :to="`/person/${person.id}/`"
                    class="chips"
                >
                    {{ person.name }}
                </v-chip>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: mapGetters(['getTheme','getNameViewedPersons','getTextSideBtn'])
}
</script>

<style scoped>
    .chips {
        color: white;
        margin: 5px 10px; 
    }
    .darkside-title{
        color: grey;
        font-weight: normal;
    }
    .lightside-title{
        color: black;
        font-weight: normal;
    }
</style>