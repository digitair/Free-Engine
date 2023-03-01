import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createFreelancesStore() {
  return {
    loadingMalt: null,
    loadingUpwork: null,
    loadingFreelanceCom: null,
    loadingFixnhour: null,
    loadingLehibou: null,
    loadingArcdev: null,
    loadingCodementor: null,
    loadingTruelancer: null,
    hasErrors: null,
    freelancesMalt: JSON.parse(localStorage.getItem('freelancesMalt')) || [],
    freelancesUpwork: JSON.parse(localStorage.getItem('freelancesUpwork')) || [],
    freelanceCom: JSON.parse(localStorage.getItem('freelanceCom')) || [],
    freelancesFixnhour: JSON.parse(localStorage.getItem('freelancesFixnhour')) || [],
    freelancesLehibou: JSON.parse(localStorage.getItem('freelancesLehibou')) || [],
    freelancesArcdev: JSON.parse(localStorage.getItem('freelancesArcdev')) || [],
    freelancesCodementor: JSON.parse(localStorage.getItem('freelancesCodementor')) || [],
    freelancesTruelancer: JSON.parse(localStorage.getItem('freelancesTruelancer')) || [],
    priceOrdered: false,
    pricesRange: false,

    removeLettersFromPrices(array) {
      let lastItem = array.pop()
      array.map(freelance => {
        if (Number.isInteger(freelance[0])) {
          return freelance;
        } else if (Array.isArray(freelance) && freelance.length > 0 && freelance[0] != null) {
          return parseInt(freelance[0].replace(/\D/g, "")); //removes all non-integers
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
      let arrays = [this.freelancesMalt, this.freelanceCom];

      arrays = arrays.map(array => this.removeLettersFromPrices(array))
      arrays = arrays.map(array => this.changeStringToInteger(array))
      arrays = arrays.map(array => this.sortCroissantPrices(array))
      arrays = arrays.map(array => this.moveFirstItemToLast(array))
      this.sortCroissantPrices(this.freelancesUpwork)
      this.sortCroissantPrices(this.freelancesFixnhour)
      this.sortCroissantPrices(this.freelancesTruelancer)
      this.priceOrdered = !this.priceOrdered
      return
    },

    getDescendingPrices() {
      let arrays = [this.freelancesMalt, this.freelanceCom];

      arrays = arrays.map(array => this.removeLettersFromPrices(array))
      arrays = arrays.map(array => this.changeStringToInteger(array))
      arrays = arrays.map(array => this.sortDescendingPrices(array))
      this.sortDescendingPrices(this.freelancesUpwork)
      this.sortDescendingPrices(this.freelancesFixnhour)
      this.sortDescendingPrices(this.freelancesTruelancer)
      this.priceOrdered = !this.priceOrdered
      return
    },

    pricesRangeRemoveMalt(array, minValue, maxValue) {
      let lastItem = array.pop()
      const newArray = array.filter(innerArray => innerArray[0] >= minValue && innerArray[0] <= maxValue);
      array = newArray
      array.push(lastItem)
      this.freelancesMalt = array
      return array
    },

    pricesRangeRemoveFreelanceCom(array, minValue, maxValue) {
      let lastItem = array.pop()
      const newArray = array.filter(innerArray => innerArray[0] >= minValue && innerArray[0] <= maxValue);
      array = newArray
      array.push(lastItem)
      this.freelanceCom = array
      return array
    },

    pricesRangeRemoveUpwork(array, minValue, maxValue) {
      array = JSON.parse(localStorage.getItem('freelancesUpwork'))
      const newArray = array.filter(innerArray => innerArray[0] >= minValue && innerArray[0] <= maxValue);
      array = newArray
      this.freelancesUpwork = newArray
      return array
    },

    pricesRangeRemoveFixnhour(array, minValue, maxValue) {
      array = JSON.parse(localStorage.getItem('freelancesFixnhour'))
      const newArray = array.filter(innerArray => innerArray[0] >= minValue && innerArray[0] <= maxValue);
      array = newArray
      this.freelancesFixnhour = newArray
      return array
    },

    pricesRangeRemoveTruelancer(array, minValue, maxValue) {
      array = JSON.parse(localStorage.getItem('freelancesTruelancer'))
      const newArray = array.filter(innerArray => innerArray[0] >= minValue && innerArray[0] <= maxValue);
      array = newArray
      this.freelancesTruelancer = newArray
      return array
    },

    getDayPricesRanges(minValue, maxValue) {
      this.freelancesMalt = JSON.parse(localStorage.getItem('freelancesMalt'))
      this.freelanceCom = JSON.parse(localStorage.getItem('freelanceCom'))

      this.removeLettersFromPrices(this.freelancesMalt)
      this.removeLettersFromPrices(this.freelanceCom)

      this.changeStringToInteger(this.freelancesMalt)
      this.changeStringToInteger(this.freelanceCom)

      this.pricesRangeRemoveMalt(this.freelancesMalt, minValue, maxValue)
      this.pricesRangeRemoveFreelanceCom(this.freelanceCom, minValue, maxValue)
      this.pricesRange = !this.pricesRange
      return
    },

    getHourPricesRange(minValue, maxValue) {
      console.log(minValue, maxValue)
      this.pricesRangeRemoveUpwork(this.freelancesUpwork, (minValue * 100), (maxValue * 100))
      this.pricesRangeRemoveFixnhour(this.freelancesFixnhour, (minValue * 100), (maxValue * 100))
      this.pricesRangeRemoveTruelancer(this.freelancesTruelancer, (minValue), (maxValue))
      this.pricesRange = !this.pricesRange
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

    async getFreelancesUpwork(infos) {
      runInAction(() => {
        this.loadingUpwork = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeUpworkData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingUpwork = false
            let datasToFilter = response.data
            let firstItem = datasToFilter.shift()
            let priceFiltered = datasToFilter.map(freelance => {
              if (typeof freelance[0] === "string") {
                freelance[0] = parseInt(freelance[0].replace(/\D/g, "")); 
              }
              return freelance
            });
            this.freelancesUpwork = priceFiltered
            localStorage.setItem('freelancesUpwork', JSON.stringify(this.freelancesUpwork))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getFreelancesFixnhour(infos) {
      runInAction(() => {
        this.loadingFixnhour = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeFixnhourData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingFixnhour = false
            let datasToFilter = response.data
            let firstItem = datasToFilter.shift()
            let priceFiltered = datasToFilter.map(freelance => {
              if (typeof freelance[0] === "string") {
                freelance[0] = parseInt(freelance[0].replace(/\D/g, "")); 
              }
              return freelance
            });
            this.freelancesFixnhour = priceFiltered
            localStorage.setItem('freelancesFixnhour', JSON.stringify(this.freelancesFixnhour))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },
    
    async getFreelancesLehibou(infos) {
      runInAction(() => {
        this.loadingLehibou = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeLehibouData`,{
          params: {
              argument: infos
          }
        }) 
        
          runInAction(() => {
            this.loadingLehibou = false
            this.freelancesLehibou = response.data
            localStorage.setItem('freelancesLehibou', JSON.stringify(this.freelancesLehibou))
          })
          
      } catch(error) {
        console.error(error)
      }
    },

    async getFreelancesArcdev(infos) {
      runInAction(() => {
        this.loadingArcdev = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeArcdevData`,{
          params: {
              argument: infos
          }
        }) 
        
          runInAction(() => {
            this.loadingArcdev = false
            this.freelancesArcdev = response.data
            localStorage.setItem('freelancesArcdev', JSON.stringify(this.freelancesArcdev))
          })
          
      } catch(error) {
        console.error(error)
      }
    },

    async getFreelancesCodementor(infos) {
      runInAction(() => {
        this.loadingCodementor = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeCodementorData`,{
          params: {
              argument: infos
          }
        }) 
        
          runInAction(() => {
            this.loadingCodementor = false
            this.freelancesCodementor = response.data.slice(0, -1)
            localStorage.setItem('freelancesCodementor', JSON.stringify(this.freelancesCodementor))
          })
          
      } catch(error) {
        console.error(error)
      }
    },

    async getFreelancesTruelancer(infos) {
      runInAction(() => {
        this.loadingTruelancer = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeTruelancerData`,{
          params: {
              argument: infos
          }
        }) 
        
          runInAction(() => {
            this.loadingTruelancer = false
            let datasToFilter = response.data
            let firstItem = datasToFilter.shift()
            let priceFiltered = datasToFilter.map(freelance => {
              if (typeof freelance[0] === "string") {
                freelance[0] = parseInt(freelance[0].replace(/\D/g, "")); 
              }
              return freelance
            });
            this.freelancesTruelancer = priceFiltered
            console.log(this.freelancesTruelancer)
            localStorage.setItem('freelancesTruelancer', JSON.stringify(this.freelancesTruelancer))
          })
          
      } catch(error) {
        console.error(error)
      }
    }
  }
}