import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Banner from '../components/banner/Banner'
import { SearchBar } from '../components/searchbar/Searchbar'
import { MaltCards } from '../components/cards/freelancesITCards/maltCards/MaltCards'
import { MaltCardsFiltered } from '../components/cards/freelancesITCards/maltCards/MaltCardsFiltered'
import { FreelanceComCards } from '../components/cards/freelancesITCards/freelanceComCards/FreelanceComCards'
import { FreelanceComCardsFiltered } from '../components/cards/freelancesITCards/freelanceComCards/FreelanceComCardsFiltered'
import { FiverrCards } from '../components/cards/freelancesITCards/fiverCards/FiverrCards'
import { ComeupCards } from '../components/cards/freelancesITCards/comeupCards/ComeupCards'
import { SearchFilters } from '../components/filters/searchFilters'
import { useState, useEffect } from 'react'
import { SideMenu } from '../components/sideMenu/SideMenu'
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useFreelancesStore } from '../context/FreelancesContext'
import { observer } from 'mobx-react';

import "./home.css"

export const Home = observer(() => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedCities, setSelectedCities] = useState([])
  const [displayFilteredCards, setDisplayFilteredCards] = useState(false)
  const freelancesStore = useFreelancesStore();
  const [maltCardsFilter, setMaltCardsFilter] = useState(null)
  const [freelanceComCardsFilter, setFreelanceComCardsFilter] = useState(null)
  const filteredMalt = []
  const filteredFreelanceCom = []

  useEffect(() => {
    var element = document.getElementById("platform-cards")
    if (selectedCities.length > 0) {
      filterMaltCards()
      filterFreelanceComCards()
      setMaltCardsFilter(filteredMalt)
      setFreelanceComCardsFilter(filteredFreelanceCom)
      setDisplayFilteredCards(true)
      element.classList.add("hide")
    } else {
      setDisplayFilteredCards(false)
      element.classList.remove("hide")
    }
  },[selectedCities, selectedPlatforms, freelancesStore.priceOrdered])

  function displaySideBar() {
    var element = document.getElementById("sidebar")
    var pageElement = document.getElementById("main-content")
    element.classList.toggle("active")

    if (element.classList.contains("active")) {
      element.style.left = "0"
      pageElement.style.transition = "margin-left 0.2s ease-in-out";
      pageElement.style.marginLeft = "15%"
    } else {
      element.style.left = "-100%"
      pageElement.style.marginLeft = ""
      pageElement.style.transition = "margin-left 0.2s ease-in-out";
    }
  }
  
  function filterMaltCards() {
    const mulitpleCitiesPatern = new RegExp(selectedCities.join('|'), 'i')
    const newFiltered = freelancesStore.freelancesMalt.filter(
      freelance => mulitpleCitiesPatern.test(freelance[5])
    )
    filteredMalt.push(filteredMalt.concat(newFiltered))
  }

  function filterFreelanceComCards() {
    const mulitpleCitiesPatern = new RegExp(selectedCities.join('|'), 'i')
    const newFiltered = freelancesStore.freelanceCom.filter(
      freelance => mulitpleCitiesPatern.test(freelance[5])
    )
    filteredFreelanceCom.push(filteredFreelanceCom.concat(newFiltered))
  }

  return (
    <>
      <Navbar/>
      <Banner />
      <div className="layout">
        <SearchBar />
        <div className="sideBar" id="sidebar">
          <SideMenu 
            selectedPlatforms={selectedPlatforms} 
            setSelectedPlatforms={setSelectedPlatforms}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          />
        </div>
        <div className="main-content" id="main-content">
          <div className="filter-button">
            <Button 
              variant="contained"
              startIcon={<ArrowLeftIcon/>}
              endIcon={<ArrowRightIcon />}
              onClick={displaySideBar}            
              sx={{ml: "1%"}}
            > 
              Filtres 
            </Button>
          </div>
          <div className="search-filters">
            <SearchFilters 
              selectedPlatforms={selectedPlatforms} 
              setSelectedPlatforms={setSelectedPlatforms}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
            />
          </div>
          <div id="platform-cards">
            {selectedPlatforms.includes("Malt.fr") ? <MaltCards /> : ""}
            {selectedPlatforms.includes("Freelance.com") ? <FreelanceComCards /> : ""}
            {selectedPlatforms.includes("Fiverr.com") ? <FiverrCards /> : ""}
            {selectedPlatforms.includes("Comeup.com") ? <ComeupCards /> : ""}
            {selectedPlatforms.length === 0 ? (
              <> 
                <MaltCards /> 
                <FreelanceComCards />
                <FiverrCards />
                <ComeupCards /> 
              </>
            ) : ""}
          </div>
          {displayFilteredCards ?
            <>
              <MaltCardsFiltered freelanceFiltered={maltCardsFilter} />
              <FreelanceComCardsFiltered freelanceFiltered={freelanceComCardsFilter} />
            </>
          : ""}
        </div>
      </div>
    </>
  )
})