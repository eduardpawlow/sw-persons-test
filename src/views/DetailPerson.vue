<template>
    <div>
        <v-row
            justify="center"
            v-if="getLoadStatus || getCurrentPerson == null"
        >
            <loader/>
        </v-row>
        <template v-else>
            <h1 :class="getTheme ? 'darkside' : 'lightside'">Detail Info of {{ getCurrentPerson.info.name }}</h1>
            <hr :class="getTheme ? 'hr-darkside' : 'hr-lightside'">
            <v-row

            >
                <v-col sm="4" md="4" lg="2" class="col-6">
                    Пол: {{getCurrentPerson.info.gender}}
                </v-col>
                <v-col sm="4" md="4" lg="2" class="col-6">
                    Рост: {{getCurrentPerson.info.height}} см
                </v-col>
                <v-col sm="4" md="4" lg="2" class="col-6">
                    Вес: {{getCurrentPerson.info.mass == 'unknown'? 'unknown' : getCurrentPerson.info.mass + ' кг'}}
                </v-col>
                <v-col sm="4" md="4" lg="2" class="col-6">        
                    <span v-if="colorHair == 'none'">Нет волос</span>
                    <template v-else>
                        Цвет волос:
                        <v-icon v-for="(color, i) of colorHair" :color="color" :key="'colorHair-'+i">mdi-circle</v-icon>
                    </template>
                </v-col>
                <v-col sm="4" md="4" lg="2" class="col-6">
                    <span v-if="colorEye == 'none'">Цвет глаз: Unknown</span>
                    <template v-else>
                        Цвет глаз:
                        <v-icon v-for="(color, i) of colorEye" :color="color" :key="'colorEye-'+i">mdi-circle</v-icon>
                    </template>
                </v-col>
                <v-col sm="4" md="4" lg="2" class="col-6">
                    <span v-if="colorSkin == 'none'">Цвет кожи: Unknown</span>
                    <template v-else>
                        Цвет кожи:
                        <v-icon v-for="(color, i) of colorSkin" :color="color" :key="'colorSkin-' + i">mdi-circle</v-icon>
                    </template>
                </v-col>
            </v-row>
            <v-row justify="start">
                <v-col sm="4" md="4" lg="2" class="col-6">
                    Год рождения: {{getCurrentPerson.info.birth_year}}
                </v-col>
                <v-col sm="4" md="4" lg="2" class="col-6">
                    Раса: {{getCurrentPerson.info.species}}
                </v-col>
                <v-col sm="4" md="4" lg="2" class="col-6">
                    Планета: {{getCurrentPerson.info.homeworld}}
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="6" md="6" lg="6" class="col-12 text-left">
                    <h2
                        v-if="getCurrentPerson.info.films.length == 0 "
                        :class="getTheme ? 'darkside' : 'lightside'"
                    >
                        Фильмы
                    </h2>
                    <h2
                        v-else
                        :class="getTheme ? 'darkside' : 'lightside'"
                    >
                        Фильмы - {{getCurrentPerson.info.films.length}}
                    </h2>

                    <p v-if="getCurrentPerson.info.films.length == 0">Отсутствуют!</p>
                    <p v-else v-for="film of getCurrentPerson.info.films" :key="'film-' + film.id" class="">{{film.title}}</p>
                </v-col>
                <v-col sm="6" md="6" lg="6" class="col-12 text-left">
                    <h2
                        v-if="getCurrentPerson.info.vehicles.length == 0"
                        :class="getTheme ? 'darkside' : 'lightside'"
                    >
                        Транспортные средства
                    </h2>
                    <h2
                        v-else
                        :class="getTheme ? 'darkside' : 'lightside'"
                    >
                        Транспортные средства - {{getCurrentPerson.info.vehicles.length}}
                    </h2>                
                    <p v-if="getCurrentPerson.info.vehicles.length == 0" class="">Отсутствуют</p>
                    <p v-else v-for="vehicle of getCurrentPerson.info.vehicles" :key="'vehicle-' + vehicle.id">{{vehicle.title}}</p>
                <!-- </v-col>
                <v-col sm="6" md="4" lg="4" class="col-12"> -->
                    <h2 
                        v-if="getCurrentPerson.info.starships.length == 0"
                        :class="getTheme ? 'darkside' : 'lightside'"
                        >
                        Космические корабли
                        
                    </h2>
                    <h2
                        v-else
                        :class="getTheme ? 'darkside' : 'lightside'"
                    >
                        Космические корабли - {{getCurrentPerson.info.starships.length}}
                    </h2>
                    <p v-if="getCurrentPerson.info.starships.length == 0" class="">Отсутствуют</p>
                    <p v-else v-for="starship of getCurrentPerson.info.starships" :key="'starship-' + starship.id">{{starship.title}}</p>
                </v-col>
            </v-row>
        </template>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Loader from '@/components/Loader'
export default {
    data(){
        return {
            films: []
        }
    },
    async beforeMount(){
        await this.$store.dispatch('fetchPersonDetail',this.$route.params.personId)
    },
    async beforeRouteUpdate (to, from, next) {
        this.$store.dispatch('fetchPersonDetail',to.params.personId)
        next()
    },
    methods:{
         
    },
    computed: {
        ...mapGetters([
            'getTheme',
            'getCurrentPerson',
            'getLoadStatus'
        ]),
        colorHair(){           
            const dict = {blond: 'yellow', auburn:'orange'}
            const resultArray = []
            let hairColor = this.getCurrentPerson.info.hair_color.split(',')
            if (hairColor == 'none' || hairColor == 'n/a')
                return 'none'

            for (const color of hairColor) {
                if (color in dict)
                    resultArray.push(dict[color])
                else
                    resultArray.push(color)
            }
            
            return resultArray
        },
        colorEye(){
            const dict = {hazel:'brown', 'blue-gray': 'rgb(176, 196, 222)'}
            const resultArray = []
            let eyeColor = this.getCurrentPerson.info.eye_color.split(',')         
            if (eyeColor == 'none' || eyeColor == 'n/a')
                return 'none'
                
            for (const color of eyeColor) {
                if (color in dict)
                    resultArray.push(dict[color])
                else
                    resultArray.push(color)
            }            
            return resultArray
        },
        colorSkin(){
            const dict = {
                fair:'#f2d9c5',
                gold:'yellow',
                light:'#f2d9c5',
                'green-tar': 'green',
                pale:'white',
                metal: 'silver',
                dark: 'brown',
                'brown mottle': 'brown',
                'motted green': 'green'
                }

            const resultArray = []
            let skinColor = this.getCurrentPerson.info.skin_color.split(',')         
            if (skinColor == 'unknown' || skinColor == 'n/a')
                return 'none'
                
            for (const color of skinColor) {
                if (color in dict)
                    resultArray.push(dict[color])
                else
                    resultArray.push(color)
            }            
            return resultArray
        }
    },
    components: {
        Loader
    }

}
</script>

<style scoped>


</style>