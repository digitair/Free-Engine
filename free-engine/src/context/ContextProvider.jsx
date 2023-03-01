import React from 'react'
import { FreelancesProvider } from './FreelancesContext'

export const ContextProvider = ({ children }) => {
  return (
    <FreelancesProvider>
      {children}
    </FreelancesProvider>
  )
}