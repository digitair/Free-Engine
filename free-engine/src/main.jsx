import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ContextProvider } from './context/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { App } from './App'
// import { FreelancesProvider } from './context/FreelancesContext'
// import { AccountantProvider } from './context/AccountantContext'
// import { HotelCompaniesProvider } from './context/HotelCompaniesContext'
// import { IndustrialSuppliersProvider } from './context/IndustrialSuppliersContext'
// import { LawyersProvider } from './context/LawyersContext'
// import { NumericServicesProvider } from './context/NumericServicesContext'
// import { RailwaySectorProvider } from './context/RailwaySectorContext'
// import { WorkersProvider } from './context/WorkersContext'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <FreelancesProvider>
//       <AccountantProvider>
//         <HotelCompaniesProvider>
//           <IndustrialSuppliersProvider>
//             <LawyersProvider>
//               <NumericServicesProvider>
//                 <RailwaySectorProvider>
//                   <WorkersProvider>
//                     <App />
//                   </WorkersProvider>
//                 </RailwaySectorProvider>
//               </NumericServicesProvider>
//             </LawyersProvider>
//           </IndustrialSuppliersProvider>
//         </HotelCompaniesProvider>
//       </AccountantProvider>
//     </FreelancesProvider>
//   </React.StrictMode>,
// )
