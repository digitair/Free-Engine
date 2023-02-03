import * as React from 'react';
import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFreelancesStore } from '../../../../context/FreelancesContext';
import { BarLoader } from "react-spinners";

export const FiverrCards = observer(() => {
  const freelancesStore = useFreelancesStore()
  const [freelancesFiverr, setFreelancesFiverr] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    if (freelancesStore.freelancesFiverr.length > 0) {
      setFreelancesFiverr(freelancesStore.freelancesFiverr)
      setTotalPages(Math.ceil((freelancesStore.freelancesFiverr.length - 1) / itemsPerPage))
    }
  }, [freelancesStore.freelancesFiverr, currentPage])

  function getFiverrCards() {
    if (freelancesStore.loadingFiverr) {
      return (
        <Grid display='flex' height='10vh' marginLeft='45%' marginTop='2vh'>
          <BarLoader color="#e2e612" />
        </Grid>
      )
    }
    if (freelancesFiverr) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const actualFreelances = freelancesFiverr.slice(0, -1)
      const currentItems = actualFreelances.filter((_, i) => i >= startIndex && i < endIndex);
      return currentItems.map((freelance, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card key={index} sx={{ maxWidth: 300, margin: "1vh"}} onClick={() => window.open(`https://www.Fiverr.com${freelance[3]}`, '_blank')}>
            <CardMedia
              sx={{ height: 200 }}
              image={`${freelance[4][0]}`}
              title="Profile picture"
            />
            <CardContent sx={{ height: 125 }}>
              <Typography gutterBottom variant="h5" component="div">
                {freelance[1]}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {freelance[2]}
              </Typography>
            </CardContent>
            <Typography variant="body1" color="text.secondary" marginLeft="2vh"> 
              Prix: à partir de { freelance[0] != null ?
              Number.isInteger(freelance[0]) ? freelance[0] : freelance[0].replace(/&nbsp;|<sup>|<\/sup>/g, (match) => {
                  if(match === '&nbsp;') return ' ';
                  if(match === '<sup>') return ',';
                  if(match === '</sup>') return '';
                })
                : ""
              }
            </Typography>
            <CardActions sx={{justifyContent: "center"}}>
              <Button size="small" onClick={() => window.open(`https://www.Fiverr.com${freelance[3]}`, '_blank')}>Voir sur Fiverr.com</Button>
            </CardActions>
          </Card>
        </Grid>
      ));
    } else {
      return <Typography gutterBottom variant="body" component="div" margin={"2vh"} sx={{ color: "grey" }}>
        En attente d'une recherche...
      </Typography>
    }
  }

  return (
    <>
      <Typography gutterBottom variant="body" component="div" marginLeft={"2vh"} sx={{ color: "white" }}>
        {freelancesFiverr == null ? "Attente de résultats" : freelancesStore.freelancesFiverr[freelancesStore.freelancesFiverr.length - 1]} sur Fiverr.com
      </Typography>
      <Grid container spacing={1}>
        {getFiverrCards()}
      </Grid>
      <Typography gutterBottom variant="body" component="div" marginLeft={"2vh"} marginTop={"2vh"} sx={{ color: "white" }}>
        page {currentPage} sur {totalPages} 
      </Typography>
      {currentPage <= totalPages && currentPage >= 2 && 
        <Button onClick={() => setCurrentPage(currentPage - 1)} sx={{ color: "white", marginLeft: "1vh" }}>Page précédente</Button>
      }
      {currentPage < totalPages && 
        <Button onClick={() => setCurrentPage(currentPage + 1)} sx={{ color: "white", marginLeft: "1vh" }}>Page suivante</Button>
      }
    </>
  );
});