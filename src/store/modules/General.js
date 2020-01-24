export default {
    state:{
        darkTheme: false,
        textSideBtn: 'darkside' 
    },
    mutations:{
        toggleTheme(state){
            state.darkTheme = !state.darkTheme
            state.textSideBtn = state.textSideBtn == 'darkside'? 'lightside' : 'darkside'
        },
        toggleTextSideBtn(state){
            state.textSideBtn = state.textSideBtn == 'darkside'? 'lightside' : 'darkside'
        }
    },
    getters:{
        getTheme(state){
            return state.darkTheme
        },
        getTextSideBtn(state){
            return state.textSideBtn
        }
    }
}