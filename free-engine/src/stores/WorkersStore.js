import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createWorkersStore() {
  return {
    loadingIziByEdf: null,
    loadingYoojo: null,
    loadingJemepropos: null,
    loadingAladom: null,
    hasErrors: null,
    iziByEdf: JSON.parse(localStorage.getItem('iziByEdf')) || [],
    yoojo: JSON.parse(localStorage.getItem('yoojo')) || [],
    jemepropos: JSON.parse(localStorage.getItem('jemepropos')) || [],
    aladom: JSON.parse(localStorage.getItem('aladom')) || [],

    async getIziByEdf(infos) {
      runInAction(() => {
        this.loadingIziByEdf = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeIziByEdfData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingIziByEdf = false
            this.iziByEdf = response.data
            localStorage.setItem('iziByEdf', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getYoojo(infos) {
      runInAction(() => {
        this.loadingYoojo = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeYoojoData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingYoojo = false
            this.yoojo = response.data
            localStorage.setItem('yoojo', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getJemepropos(infos) {
      runInAction(() => {
        this.loadingJemepropos = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeJemeproposData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingJemepropos = false
            this.jemepropos = response.data
            localStorage.setItem('jemepropos', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getAladom(infos) {
      runInAction(() => {
        this.loadingAladom = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeAladomData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingAladom = false
            this.aladom = response.data
            localStorage.setItem('aladom', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}