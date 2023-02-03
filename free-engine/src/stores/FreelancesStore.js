import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createFreelancesStore() {
  return {
    loadingMalt: null,
    loadingFiverr: null,
    loadingFreelanceCom: null,
    loadingComeup: null,
    hasErrors: null,
    freelancesMalt: JSON.parse(localStorage.getItem('freelancesMalt')) || [],
    freelancesFiverr: JSON.parse(localStorage.getItem('freelancesFiverr')) || [],
    freelanceCom: JSON.parse(localStorage.getItem('freelanceCom')) || [],
    freelancesComeup: JSON.parse(localStorage.getItem('freelancesComeup')) || [],
    priceOrdered: false,

    removeLettersFromPrices(array) {
      let lastItem = array.pop()
      array.map(freelance => {
        if (Number.isInteger(freelance[0])) {
          return freelance;
        } else if (Array.isArray(freelance) && freelance.length > 0 && freelance[0] != null) {
          return freelance[0].replace(/\D/g, ""); //removes all non-integers
        }
      });
      array.push(lastItem)
      return array
    },
  
    changeStringToInteger(arrayWithStrings) {
      let lastItem = arrayWithStrings.pop()
      arrayWithStrings.map(string => {
        if (Number.isInteger(string[0]) && string.length > 0) {
          return string;
        } else if (Array.isArray(string) && string.length > 0 && string[0] != null) {
          return string[0] = parseInt(string[0]);
        }
      });
      arrayWithStrings.push(lastItem)
      return arrayWithStrings
    },
    
    sortCroissantPrices(array) {
      return array.sort((freelance1, freelance2) => freelance1[0] - freelance2[0]);
    },
    
    sortDescendingPrices(array) {
      return array.sort((freelance1, freelance2) => freelance2[0] - freelance1[0]);
    },
  
    moveFirstItemToLast(array) {
      array.filter(freelance => !freelance.includes(null))
      let itemToMove = array.shift();
      array.push(itemToMove);
      return array;
    },
  
    getCroissantPrices() {
      let arrays = [this.freelancesMalt, this.freelanceCom, this.freelancesFiverr];
      arrays = arrays.map(array => this.removeLettersFromPrices(array))
      arrays = arrays.map(array => this.changeStringToInteger(array))
      arrays = arrays.map(array => this.sortCroissantPrices(array))
      arrays = arrays.map(array => this.moveFirstItemToLast(array))
      this.priceOrdered = !this.priceOrdered
      return
    },

    getDescendingPrices() {
      let arrays = [this.freelancesMalt, this.freelanceCom, this.freelancesFiverr];
      arrays = arrays.map(array => this.removeLettersFromPrices(array))
      arrays = arrays.map(array => this.changeStringToInteger(array))
      arrays = arrays.map(array => this.sortDescendingPrices(array))
      this.priceOrdered = !this.priceOrdered
      return
    },

    async getFreelances(infos) {
      runInAction(() => {
        this.loadingMalt = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeMaltData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingMalt = false
            this.freelancesMalt = response.data
            localStorage.setItem('freelancesMalt', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getFiverrFreelances(infos) {
      runInAction(() => {
        this.loadingFiverr = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeFiverrData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingFiverr = false
            let datasToFilter = response.data
            this.freelancesFiverr = datasToFilter.filter(freelance => !freelance.includes(null))
            localStorage.setItem('freelancesFiverr', JSON.stringify(this.freelancesFiverr))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getFreelanceCom(infos) {
      runInAction(() => {
        this.loadingFreelanceCom = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeFreelanceComData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingFreelanceCom = false
            let datasToFilter = response.data
            this.freelanceCom = datasToFilter.filter(freelance => !freelance.includes(null))
            localStorage.setItem('freelanceCom', JSON.stringify(this.freelanceCom))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getFreelancesComeup(infos) {
      runInAction(() => {
        this.loadingComeup = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeComeupData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingComeup = false
            let datasToFilter = response.data
            this.freelancesComeup = datasToFilter.filter(freelance => !freelance.includes(null))
            localStorage.setItem('freelancesComeup', JSON.stringify(this.freelancesComeup))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}