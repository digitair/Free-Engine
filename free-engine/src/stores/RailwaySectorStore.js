import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createRailwaySectorStore() {
  return {
    loadingStationOne: null,
    hasErrors: null,
    stationOne: JSON.parse(localStorage.getItem('stationOne')) || [],

    async getStationOne(infos) {
      runInAction(() => {
        this.loadingStationOne = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeStationOneData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingStationOne = false
            this.stationOne = response.data
            localStorage.setItem('stationOne', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}