import React from 'react'
import { createFreelancesStore } from '../stores/FreelancesStore'
import { useLocalObservable } from 'mobx-react'

const FreelancesContext = React.createContext(null)

export const FreelancesProvider = ({children}) => {
  const FreelancesStore = useLocalObservable(() => new createFreelancesStore())

  return (   
    <FreelancesContext.Provider value={FreelancesStore}>
      {children}
    </FreelancesContext.Provider>
  )
}

export const useFreelancesStore = () => React.useContext(FreelancesContext)
