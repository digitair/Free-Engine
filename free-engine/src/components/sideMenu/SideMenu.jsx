import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import { useFreelancesStore } from '../../context/FreelancesContext';
import { observer } from 'mobx-react';

export const SideMenu = observer(({ selectedPlatforms, setSelectedPlatforms, selectedCities, setSelectedCities }) => {
  const [priceOrder, setPriceOrder] = useState('');
  const freelancesStore = useFreelancesStore();

  const handlePlatformSelect = (platform) => {
    if (platform.checked) {
       setSelectedPlatforms([...selectedPlatforms, platform.parentElement.title])
    } else {
       setSelectedPlatforms(selectedPlatforms.filter(p=>p !== platform.parentElement.title))
    }
  };

  useEffect(() => {
    setSelectedPlatforms(selectedPlatforms)
    setSelectedCities(selectedCities)
  }, [selectedPlatforms, selectedCities])

  const handlePriceChange = (event) => {
    setPriceOrder(event.target.value)
    if (event.target.value == "croissant") {
      freelancesStore.getCroissantPrices()
    } else if (event.target.value == "décroissant") {
      freelancesStore.getDescendingPrices()
    }
  };

  const handleCitySelect = (city) => {
    if (city.checked) {
      setSelectedCities([...selectedCities, city.parentElement.title])
    } else {
      setSelectedCities(selectedCities.filter(p=>p !== city.parentElement.title))
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Afficher plateforme</FormLabel>
          <FormGroup>
            {marketplaces.map(marketplace => (
              <FormControlLabel
                key={marketplace}
                control={
                  <Checkbox onChange={(e) => handlePlatformSelect(e.target)} title={marketplace} />
                }
                label={marketplace}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <FormControl sx={{ mb: 2 }}>
        <FormLabel id="demo-controlled-radio-buttons-group">Ordre de prix</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={priceOrder}
          onChange={handlePriceChange}
        >
          <FormControlLabel value="croissant" control={<Radio />} label="croissant" />
          <FormControlLabel value="décroissant" control={<Radio />} label="décroissant" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Afficher par ville</FormLabel>
          <FormGroup>
            {cities.map(city => (
              <FormControlLabel
                key={city}
                control={
                  <Checkbox onChange={(e) => handleCitySelect(e.target)} title={city} />
                }
                label={city}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>      
    </>
  );
});

const cities = [
  "Annecy",
  "Bordeaux",
  "Grenoble",
  "Lille",
  "Lyon",
  "Marseille",
  "Montpellier",
  "Nantes",
  "Nice",
  "Paris",
  "Rennes",
  "Strasbourg",
  "Toulouse",
  "Tours"
];

const marketplaces = [
  "Malt.fr",
  "Freelance.com",
  "Fiverr.com",
  "Comeup.com"
]
