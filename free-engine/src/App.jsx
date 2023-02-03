import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { Home } from "./layouts/Home";
import "./app.css"

export const App = observer(() => {
  return (  
    <Router>
      <main>
        <AppRoutes />
      </main>
    </Router>
  )
})

function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Navigate to='/home'/>}/>
      <Route path="/home" element={<Home />}/>
    </Routes>
  )
}