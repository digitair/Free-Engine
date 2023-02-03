import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createLawyersStore() {
  return {
    loadingMeetlaw: null,
    loadingJustifit: null,
    hasErrors: null,
    meetlaw: JSON.parse(localStorage.getItem('meetlaw')) || [],
    justifit: JSON.parse(localStorage.getItem('justifit')) || [],


    async getMeetlaw(infos, cityInfos) {
      runInAction(() => {
        this.loadingMeetlaw = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeMeetlawData`,{
          params: {
              argument: infos,
              city: cityInfos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingMeetlaw = false
            this.meetlaw = response.data
            localStorage.setItem('meetlaw', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getJustifit(infos) {
      runInAction(() => {
        this.loadingJustifit = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeJustifitData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingJustifit = false
            this.justifit = response.data
            localStorage.setItem('justifit', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}