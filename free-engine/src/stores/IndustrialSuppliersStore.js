import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createIndustrialSuppliersStore() {
  return {
    loadingUsinenouvelle: null,
    loadingDirectindustry: null,
    hasErrors: null,
    usinenouvelle: JSON.parse(localStorage.getItem('usinenouvelle')) || [],
    directindustry: JSON.parse(localStorage.getItem('directindustry')) || [],

    async getUsinenouvelle(infos) {
      runInAction(() => {
        this.loadingUsinenouvelle = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeUsinenouvelleData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingUsinenouvelle = false
            this.usinenouvelle = response.data
            localStorage.setItem('usinenouvelle', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getDirectindustry(infos) {
      runInAction(() => {
        this.loadingDirectindustry = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeDirectindustryData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingDirectindustry = false
            this.directindustry = response.data
            localStorage.setItem('directindustry', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}