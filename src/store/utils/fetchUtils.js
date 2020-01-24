export default {
    async fetchFilms(filmsUrls){
        const resultArray = []
        for (const film of filmsUrls) {        
            const res = await fetch(film)
            const json = await res.json()
            resultArray.push({
                id: json.episode_id,
                title: `Star Wars: Episode ${json.episode_id} - ${json.title}` 
            })
        }            
        resultArray.sort((a, b) => {
            return a.id - b.id
        })

        return resultArray
    },
    async fetchVehicles(vehiclesUrls){
        const resultArray = []
        for (const vehicle of vehiclesUrls) {        
            const res = await fetch(vehicle)
            const json = await res.json()
            resultArray.push({
                id: json.url.slice(30, json.url.length-1),
                title: `${json.name} - ${json.model}` 
            })
        }

        return resultArray
    },
    async fetchStarships(starshipsUrls){
        const resultArray = []
        for (const starship of starshipsUrls) {        
            const res = await fetch(starship)
            const json = await res.json()
            resultArray.push({
                id: json.url.slice(31, json.url.length-1),
                title: `${json.name} - ${json.model}` 
            })
        }
        return resultArray           
    },
    async fetchHomeworld(url){
        const res = await fetch(url)
        const json = await res.json()
        return json.name
    },
    async fetchSpecie(url){
        const res = await fetch(url)
        const json = await res.json()
        return json.name
    }
}