import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createHotelCompaniesStore() {
  return {
    loadingFoodhoteltech: null,
    hasErrors: null,
    foodhoteltech: JSON.parse(localStorage.getItem('foodhoteltech')) || [],

    async getFoodhoteltech(infos) {
      runInAction(() => {
        this.loadingFoodhoteltech = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeFoodhoteltechData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingFoodhoteltech = false
            this.foodhoteltech = response.data
            localStorage.setItem('foodhoteltech', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}