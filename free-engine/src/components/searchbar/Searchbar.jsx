import * as React from 'react';
import { useState } from 'react';
import { observer } from "mobx-react-lite"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import { useFreelancesStore } from '../../context/FreelancesContext';
import "./searchbar.css"

export const SearchBar = observer (() => {
  const freelancesStore = useFreelancesStore()
  const [specialty, setSpecialty] = useState("")
  const [platforms, setPlatforms] = useState([]);

  function getFreelances(specialty, platforms) {
    let encodedSpecialty = encodeURI(specialty)
    if (platforms.length == 0) {
      freelancesStore.getFreelances(encodedSpecialty)
      freelancesStore.getFreelanceCom(encodedSpecialty)
      freelancesStore.getFiverrFreelances(encodedSpecialty)
      freelancesStore.getFreelancesComeup(encodedSpecialty)
    }
    platforms.includes("Malt.fr") ? freelancesStore.getFreelances(encodedSpecialty) : ""
    platforms.includes("Freelance.com") ? freelancesStore.getFreelanceCom(encodedSpecialty) : ""
    platforms.includes("Fiverr.com") ? freelancesStore.getFiverrFreelances(encodedSpecialty) : ""
    platforms.includes("Comeup.com") ? freelancesStore.getFreelancesComeup(encodedSpecialty) : ""
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPlatforms(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Container 
        sx={{ minWidth: "200px", 
          marginTop: "2%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          flexDirection: "row"
        }}
      >
        <Box
          sx={{
            width: "40%",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            m: 2
          }}
        >
          <TextField 
            fullWidth label="Recherchez un freelance par spécialité" 
            id="fullWidth"
            value={specialty}
            onChange={(e) => {setSpecialty(e.target.value)}}
          />
        </Box>
        <Box 
          sx={{ m: 2, width: "30%"}}
        >
          <div>
            <FormControl sx={{ width: "100%"}}>
              <InputLabel id="demo-multiple-name-label">Plateforme (Par defaut: Toutes)</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={platforms}
                onChange={handleChange}
                input={<OutlinedInput label="Platformes" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                sx={{ borderRadius: "5px", backgroundColor: "white"}}
              >
                {marketplaces.map((marketplace) => (
                  <MenuItem
                    key={marketplace}
                    value={marketplace}
                  >
                    <Checkbox checked={platforms.indexOf(marketplace) > -1} />
                    <ListItemText primary={marketplace} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
        <Box sx={{m: 2}}>
          <Button variant="contained" 
            endIcon={<SendIcon />}
            sx={{ 
              Width: "auto", 
              minWidth: "120px",
              height: "40px", 
              backgroundColor: "rgba(73,115,255,1)",
              borderRadius: "5px"
            }}
            onClick={() => {getFreelances(specialty, platforms)}}
          >
            Chercher
          </Button>
        </Box>
      </Container>
    </>
  );
});

const marketplaces = [
  'Malt.fr',
  'Freelance.com',
  'Fiverr.com',
  'Comeup.com'
]