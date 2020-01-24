import fetchUtils from './../utils/fetchUtils'

export default {
    state: {
        loading: false,
        viewedPersons: [],
        currentPerson: null,
    },
    mutations: {
        toggleLoadStatus(state){
            state.loading = !state.loading
        },
        addViewedPerson(state, personObj){
            state.viewedPersons.push(personObj)
        },
        setCurrentPersonViewedPersons(state, arrayIndex){
            state.currentPerson = state.viewedPersons[arrayIndex];              
        },
        setCurrentPerson(state, person){
            state.currentPerson = person
        }
    },
    actions: {
        isInViewedPersons(ctx, personId){
            personId = Number(personId)
            for (const [i, person] of ctx.state.viewedPersons.entries()) {                           
                if (person.id == personId)
                    return i               
            }
            return -1   
        },
        async fetchPersonDetail(ctx, personId){
            ctx.commit('toggleLoadStatus')
            const ViewedPersonsIndex = await ctx.dispatch('isInViewedPersons', personId)
            
            if(ViewedPersonsIndex > -1){
                ctx.commit('setCurrentPersonViewedPersons', ViewedPersonsIndex)
            } else {
                const response = await fetch(`https://swapi.co/api/people/${personId}/`)
                const personInfo = await response.json()
                const newPersonObject = {
                    id: personId,
                    info: personInfo
                }
                newPersonObject.info.films = await fetchUtils.fetchFilms(newPersonObject.info.films)
                newPersonObject.info.vehicles = await fetchUtils.fetchVehicles(newPersonObject.info.vehicles)
                newPersonObject.info.starships = await fetchUtils.fetchStarships(newPersonObject.info.starships)
                newPersonObject.info.homeworld = await fetchUtils.fetchHomeworld(newPersonObject.info.homeworld)
                newPersonObject.info.species = await fetchUtils.fetchSpecie(newPersonObject.info.species[0])

                ctx.commit('addViewedPerson', newPersonObject)
                ctx.commit('setCurrentPerson', newPersonObject)
            }
            ctx.commit('toggleLoadStatus')
        }
    },
    getters: {
        getLoadStatus(state){
            return state.loading
        },
        getCurrentPerson(state){
            return state.currentPerson
        },
        getNameViewedPersons(state){
            return state.viewedPersons.map(val => { return {id: val.id, name: val.info.name}})
        }
    }
}