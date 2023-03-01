import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Banner from '../components/banner/Banner'
import { SearchBar } from '../components/searchbar/Searchbar'
import { MaltCards } from '../components/cards/freelancesITCards/maltCards/MaltCards'
import { MaltCardsFiltered } from '../components/cards/freelancesITCards/maltCards/MaltCardsFiltered'
import { FreelanceComCards } from '../components/cards/freelancesITCards/freelanceComCards/FreelanceComCards'
import { FreelanceComCardsFiltered } from '../components/cards/freelancesITCards/freelanceComCards/FreelanceComCardsFiltered'
import { UpworkCards } from '../components/cards/freelancesITCards/upworkCards/UpworkCards'
import { FixnhourCards } from '../components/cards/freelancesITCards/fixnhourCards/FixnhourCards'
import { LehibouCards } from '../components/cards/freelancesITCards/lehibouCards/LehibouCards'
import { ArcdevCards } from '../components/cards/freelancesITCards/arcdevCards/ArcdevCards'
import { CodementorCards } from '../components/cards/freelancesITCards/codementorCards.jsx/CodementorCards'
import { TruelancerCards } from '../components/cards/freelancesITCards/truelancerCards/TruelancerCards'
import { SearchFilters } from '../components/filters/searchFilters'
import { useState, useEffect } from 'react'
import { SideMenu } from '../components/sideMenu/SideMenu'
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useFreelancesStore } from '../context/FreelancesContext'
import { observer } from 'mobx-react';
import { MarketplacesLogos } from '../components/marketplacesLogos/MarketplacesLogos'

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
      < MarketplacesLogos/>
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
              className="btn btn-one-home"
              startIcon={<ArrowLeftIcon/>}
              endIcon={<ArrowRightIcon />}
              onClick={displaySideBar}            
              sx={{ml: "2vh", 
                width: "10vw", 
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'white'
              }}
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
            {selectedPlatforms.includes("Upwork.com") ? <UpworkCards /> : ""}
            {selectedPlatforms.includes("Lehibou.com") ? <LehibouCards /> : ""}
            {selectedPlatforms.includes("Arc.dev") ? <ArcdevCards /> : ""}
            {selectedPlatforms.includes("Codementor.io") ? <CodementorCards /> : ""}
            {selectedPlatforms.includes("Fixnhour.com") ? <FixnhourCards /> : ""}
            {selectedPlatforms.includes("Truelancer.com") ? <TruelancerCards /> : ""}
            {selectedPlatforms.length === 0 ? (
              <> 
                <MaltCards /> 
                <FreelanceComCards />
                <UpworkCards />
                <LehibouCards />
                <ArcdevCards />
                <CodementorCards />
                <FixnhourCards />
                <TruelancerCards />
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