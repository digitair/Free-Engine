import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createNumericServicesStore() {
  return {
    loadingCcistore: null,
    hasErrors: null,
    ccistore: JSON.parse(localStorage.getItem('ccistore')) || [],

    async getCcistore(infos) {
      runInAction(() => {
        this.loadingCcistore = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeCcistoreData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingCcistore = false
            this.ccistore = response.data
            localStorage.setItem('ccistore', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}