<template>
    <v-autocomplete
        label="Search SW Persons"
        flat
        clearable
        hide-no-data
        hide-details
        single-line
        loader-height="3"
        type="text"
        solo
        :items="items"
        @change="viewDetail"
        @update:search-input="getSearchQuery"
        @keydown="keydown"
        v-model="target"
        value="org"
        :loading="loading"
        :disabled="disabled || getLoadStatus"        
    >
        <v-icon slot="prepend-inner" :color="getTheme ? 'white' : 'black'">mdi-magnify</v-icon>
    </v-autocomplete>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return {
            target: null,
            searchQuery: '',
            items: [],
            loading: false,
            disabled: false
        }
    },
    computed: mapGetters(['getTheme', 'getLoadStatus', 'getCurrentPerson']),
    mounted(){
    },  
    methods: {
        ...mapActions(['fetchPersonDetail']),
        viewDetail(){
            if (this.target != null){ 
                if(this.getCurrentPerson != null && this.target == this.getCurrentPerson.id)
                    this.$store.dispatch('fetchPersonDetail', Number(this.target))
                else {
                    this.$store.commit('setCurrentPerson', null)
                    this.$router.push({name: 'detail-person', params: {personId: this.target}})
                    this.items = []
                    this.target = null 
                } 
            }                                  
        },
        getSearchQuery(e){
            this.searchQuery = e                  
        },
        async keydown(e){            
            if(e.key == 'Enter'){
                this.loading = this.getTheme ? 'red' : 'blue'
                this.disabled = true
                const response = await fetch("https://swapi.co/api/people/?search="+this.searchQuery)
                const json = await response.json()
                this.items = json.results.map( t => {
                    return {
                        'text': t.name,
                        'value': t.url.slice(28, t.url.length - 1)
                    }
                })               
                this.loading = false
                this.disabled = false
            }            
        }
    }
}
</script>