import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: [],
  },
  getters: {
  },
  mutations: {
    setCharacters(state, payload){
      state.characters = payload
    },
    setCharactersFilter(state, payload){
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({commit}){

      try{
         await  fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(dt => {
          const data =  dt.results
          commit('setCharacters', data)
          commit('setCharactersFilter', data)

        })

      }catch(error){
        console.log(error)
      }
    },

    filterByStatus({commit, state}, status){
      const results = state.characters.filter((character)=>{
           return character.status.includes(status)
          })
          commit('setCharactersFilter', results)
    },

    filterByName({commit, state}, name){
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character)=>{
        const characterName = character.name.toLowerCase()
        
        if(characterName.includes(formatName)){
          return character
        }
      })
      commit('setCharactersFilter', results)
    }
  },
  modules: {
  }
})
