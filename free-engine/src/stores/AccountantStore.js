import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createAccountantStore() {
  return {
    loadingLeboncomptable: null,
    loadingBbigger: null,
    hasErrors: null,
    leboncomptable: JSON.parse(localStorage.getItem('leboncomptable')) || [],
    bbigger: JSON.parse(localStorage.getItem('bbigger')) || [],

    async getLeboncomptable(infos) {
      runInAction(() => {
        this.loadingLeboncomptable = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeLeboncomptableData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingLeboncomptable = false
            this.leboncomptable = response.data
            localStorage.setItem('leboncomptable', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getBbigger(infos) {
      runInAction(() => {
        this.loadingBbigger = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeBbiggerData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingBbigger = false
            let datasToFilter = response.data
            this.bbigger = datasToFilter.filter(freelance => !freelance.includes(null))
            localStorage.setItem('bbigger', JSON.stringify(this.bbigger))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}