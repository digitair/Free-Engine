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
    let platformsData = {
      "Malt.fr": freelancesStore.getFreelances,
      "Freelance.com": freelancesStore.getFreelanceCom,
      "Upwork.com": freelancesStore.getFreelancesUpwork,
      "Lehibou.com": freelancesStore.getFreelancesLehibou,
      "Arc.dev": freelancesStore.getFreelancesArcdev,
      "Codementor.io": freelancesStore.getFreelancesCodementor,
      "Truelancer.com": freelancesStore.getFreelancesTruelancer,
      "Fixnhour.com": freelancesStore.getFreelancesFixnhour
    }

    if (platforms.length == 0) {
      Object.values(platformsData).forEach(platform => platform(encodedSpecialty))
    } else {
      platforms.forEach(platform => {
        if (platform in platformsData) {
          platformsData[platform](encodedSpecialty);
        }
      });
    }
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
        id ="search-bars"
        sx={{
          minWidth: "200px", 
          marginTop: "1%", 
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start", 
          justifyContent: "flex-start", 
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "50%",
            minWidth: "150px",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            m: 2
          }}
        >
          <TextField
            size="small"
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
            <FormControl sx={{ width: "100%", minWidth: "120px"}}>
              <InputLabel id="demo-multiple-name-label" sx={{marginTop:"-5px"}}>Plateforme (Par defaut: Toutes)</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                size="small"
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
              borderRadius: "5px",
              fontFamily: 'monospace',
              fontWeight: 700,
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
  'Upwork.com',
  'Lehibou.com',
  'Arc.dev',
  'Codementor.io',
  'Truelancer.com',
  'Fixnhour.com'
]