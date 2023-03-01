import * as React from 'react';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { useFreelancesStore } from '../../context/FreelancesContext';
import { observer } from 'mobx-react';
import "./searchFilters.css"

export const SearchFilters = observer(({ selectedPlatforms, setSelectedPlatforms, selectedCities, setSelectedCities }) => {
  const freelancesStore = useFreelancesStore();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [priceOrder, setPriceOrder] = useState('');
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [hourMinValue, setHourMinValue] = useState('');
  const [hourMaxValue, setHourMaxValue] = useState('');
  const [dayMinValue, setDayMinValue] = useState('');
  const [dayMaxValue, setDayMaxValue] = useState('');

  const handlePriceRangeChange = (type) => {

    const Hmin = parseInt(hourMinValue || 0);
    const Hmax = parseInt(hourMaxValue || 5000);
    const Dmin = parseInt(dayMinValue || 0);
    const Dmax = parseInt(dayMaxValue || 50000);
    
    let newMinValue = minValue;
    let newMaxValue = maxValue;

    if (type === 'hour') {
      if (isNaN(Hmin) && isNaN(Hmax)) {
        newMinValue = 0
        newMaxValue = 500;
      }
    
      if (!isNaN(Hmin)) {
        newMinValue = Hmin;
      }
    
      if (!isNaN(Hmax)) {
        newMaxValue = Hmax;
      }
    
      setMinValue(newMinValue);
      setMaxValue(newMaxValue);
    } else if (type === 'day') {
        if (isNaN(Dmin) && isNaN(Dmax)) {
          newMinValue = 0
          newMaxValue = 5000;
        }
      
        if (!isNaN(Dmin)) {
          newMinValue = Dmin;
        }
      
        if (!isNaN(Dmax)) {
          newMaxValue = Dmax;
        }

      setMinValue(newMinValue);
      setMaxValue(newMaxValue);
    }

    if (type === 'hour') {
      freelancesStore.getHourPricesRange(newMinValue, newMaxValue);
    } else if (type === 'day') {
      freelancesStore.getDayPricesRanges(newMinValue, newMaxValue);
    }
  };

  const handlePriceChange = (event) => {
    setPriceOrder(event.target.value)
    if (event.target.value == "croissant") {
      freelancesStore.getCroissantPrices()
    } else if (event.target.value == "décroissant") {
      freelancesStore.getDescendingPrices()
    }
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(platform)
  }

  const handleCitySelect = (city) => {
    setSelectedCities(city)
  };

  useEffect(() => {
    setSelectedPlatforms(selectedPlatforms)
    setSelectedCities(selectedCities)
  }, [selectedPlatforms, selectedCities])

  return (
    <>
      <Box sx={{ ml: "10vw", mb: "2vh"}}>
        <Typography 
          variant= "body" 
          sx= {{ color: "white"}}
        >
          Filtres:
        </Typography>
        <Container id="filters"
          sx={{
            mt: 1,
            ml: -3.5,
            display: "flex", 
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Stack sx={{ width: "100%", maxWidth: "250px"}}>
            <Autocomplete
              multiple
              limitTags={1}
              id="checkboxes-tags-demo"
              size="small"
              options={cities}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => handleCitySelect(value.map(e => e.title))}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Trier par villes (Malt et freelance.com)" 
                  placeholder="Choisir dans la liste" 
                  sx={{ borderRadius: "5px", backgroundColor: "white"}}
                />
              )}
            />
            <Box sx={{mb: 2}}></Box>
            <Autocomplete
              limitTags={1}
              multiple
              id="checkboxes-tags-demo"
              size="small"
              options={MarketplaceFilters}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => handlePlatformSelect(value.map(e => e.title))}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 0 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Afficher uniquement: " 
                  placeholder="Choisir les plateformes" 
                  sx={{ borderRadius: "5px", backgroundColor: "white"}}
                />
              )}
            />
          </Stack>
          <Stack sx={{  maxWidth: "250px"}}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
              }}
            >
            </Box>
          </Stack>
          <Stack sx={{ width: "30%", maxWidth: "250px" }}>
            <FormControl 
              sx={{ 
                ml: 4,
                width: "auto", 
                minWidth: "100px",
                backgroundColor: "whitesmoke",
                borderRadius: "5px"
              }} 
              size= "small"
            >
              <InputLabel id="demo-select-small">Trier par prix</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={priceOrder}
                label="priceOrder"
                onChange={handlePriceChange}
              >
                <MenuItem value={"croissant"}>Prix croissants</MenuItem>
                <MenuItem value={"décroissant"}>Prix décroissants</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" 
              endIcon={<SendIcon />}
              sx={{
                ml: 4,
                mt: 2,
                mr: 2,
                width: "auto", 
                minWidth: "100px",
                height: "40px", 
                backgroundColor: "rgba(73,115,255,1)",
                borderRadius: "5px",
                fontFamily: "monospace",
                fontWeight: 600,
                zIndex: 1
              }}
              onClick={() => {}}
            >
              Filtrer
            </Button>
          </Stack>
        </Container>
      </Box>
      <Box sx={{ ml: "10vw", mb: "2vh"}}>
        <Container sx={{display: "flex", mb: "2vh", ml: -2, mt: 2}}>
          <Typography variant= "body" sx={{color: "white"}}>Prix à la journée</Typography>
        </Container>
        <TextField
          label="Minimum"
          id="dayMinTextField"
          size="small"
          value={dayMinValue}
          onChange={(e) => setDayMinValue(e.target.value)}
          sx={{width: "40%", mr: 2,backgroundColor: "white", borderRadius: "5px", maxWidth: "250px"}}
        />
        <TextField
          label="Maximum"
          id="dayMaxTextField"
          size="small"
          value={dayMaxValue}
          onChange={(e) => setDayMaxValue(e.target.value)}
          sx={{width: "40%", mr: 2, backgroundColor: "white", borderRadius: "5px", maxWidth: "250px"}}
        />
        <Button 
          className="btn btn-one-filters" 
          onClick={() => handlePriceRangeChange("day")} 
          sx={{ 
            width: "110px",
            height: "30px",
            color: "white", 
            fontFamily: 'monospace',
            fontWeight: 600,
            mt: 1,
          }}
        >
          - Trier -
        </Button>
      </Box>
      <Box sx={{ ml: "10vw"}}>
        <Container sx={{display: "flex", mb: "2vh", ml: -2}}>
          <Typography variant= "body" sx={{color: "white"}}>Prix à l'heure</Typography>
        </Container>
        <TextField
          label="Minimum"
          id="hourMinTextField"
          size="small"
          value={hourMinValue}
          onChange={(e) => setHourMinValue(e.target.value)}
          sx={{width: "40%", mr: 2,backgroundColor: "white", borderRadius: "5px", maxWidth: "250px"}}
        />
        <TextField
          label="Maximum"
          id="hourMaxTextField"
          size="small"
          value={hourMaxValue}
          onChange={(e) => setHourMaxValue(e.target.value)}
          sx={{width: "40%", mr: 2,backgroundColor: "white", borderRadius: "5px", maxWidth: "250px"}}
        />
        <Button 
          className="btn btn-one-filters"
          onClick={() => handlePriceRangeChange("hour")} 
          sx={{ 
            width: "110px",
            height: "30px",
            color: "white", 
            fontFamily: 'monospace',
            fontWeight: 600,
            mt: 1
          }}
        >
          - Trier -
        </Button>
      </Box>
    </>
  );
});

const cities = [
  { title: 'Annecy'},
  { title: 'Bordeaux'},
  { title: 'Grenoble'},
  { title: 'Lille'},
  { title: 'Lyon'},
  { title: 'Marseille'},
  { title: 'Montpellier'},
  { title: 'Nantes'},
  { title: 'Nice'},
  { title: 'Paris'},
  { title: 'Strasbourg'},
  { title: 'Rennes'},
  { title: 'Toulouse'},
  { title: 'Tours'}
];

const MarketplaceFilters = [
  {title: "Malt.fr"},
  {title: "Freelance.com"},
  {title: "Upwork.com"},
  {title: "Lehibou.com"},
  {title: "Arc.dev"},
  {title: "Codementor.io"},
  {title: "Truelancer.com"},
  {title: "Fixnhour.com"}
];