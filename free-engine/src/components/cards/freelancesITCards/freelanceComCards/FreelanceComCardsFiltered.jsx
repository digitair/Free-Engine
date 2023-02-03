import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFreelancesStore } from '../../../../context/FreelancesContext';
import { observer } from 'mobx-react';

export const FreelanceComCardsFiltered = observer(({freelanceFiltered}) => {
  const freelancesStore = useFreelancesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const [filteredFreelances, setFilteredFreelances] = useState(null)

  
  useEffect(() => {
    setFilteredFreelances(freelanceFiltered)
  }, [freelanceFiltered])

  useEffect(() => {
    if (filteredFreelances)
      setTotalPages(Math.ceil((filteredFreelances.map(freelance => freelance.length)) / itemsPerPage))
  }, [filteredFreelances])

  function getFreelanceComCards() {
    if (filteredFreelances[0].length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = filteredFreelances[0].filter((_, i) => i >= startIndex && i < endIndex);
      return currentItems.map((freelance, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card key={index} sx={{ maxWidth: 300, margin: "1vh"}} onClick={() => window.open(`https://plateforme.freelance.com${freelance[3]}`, '_blank')}>
            <CardMedia
              sx={{ height: 200 }}
              image={`${freelance[4]}`}
              title="Profile picture"
            />
            <CardContent sx={{ height: 125 }}>
            <Typography variant="body2" color="text.secondary">
              {freelance[5]}
              </Typography>
              <Typography variant="h5" component="div">
                {freelance[1]}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'blue' }}>
                {freelance[2].replace(/&nbsp;/g, "")}
              </Typography>
            </CardContent>
            <Typography variant="body1" color="text.secondary" marginLeft="2vh">
              Prix à la journée: {Number.isInteger(freelance[0]) ? freelance[0] : freelance[0].replace(/\D/g, "")} €
            </Typography>
            <CardActions sx={{justifyContent: "center"}}>
              <Button size="small" onClick={() => window.open(`https://plateforme.freelance.com${freelance[3]}`, '_blank')}>Voir sur Malt.fr</Button>
            </CardActions>
          </Card>
        </Grid>
      ));
    } else {
      return <Typography gutterBottom variant="body" component="div" margin={"2vh"} sx={{ color: "grey" }}>
        Aucun résultat pour cette séléction...
      </Typography>
    }
  }

  if (filteredFreelances) {
    return (
      <>
        <Typography gutterBottom variant="body" component="div" marginLeft={"2vh"} sx={{ color: "white", marginTop: "1vh"}}>
          {freelancesStore.freelanceCom == null ? "Attente de résultats" : freelancesStore.freelanceCom[freelancesStore.freelanceCom.length - 1]} sur Freelance.com
        </Typography>
        <Grid container spacing={1}>
          {getFreelanceComCards()}
        </Grid>
        {filteredFreelances == null ? "" :
          <Typography gutterBottom variant="body" component="div" marginLeft={"2vh"} marginTop={"2vh"} sx={{ color: "white" }}>
            page {currentPage} sur {totalPages}
          </Typography>
        }
        {currentPage <= totalPages && currentPage >= 2 && 
          <Button onClick={() => setCurrentPage(currentPage - 1)} sx={{ color: "white", marginLeft: "1vh" }}>Page précédente</Button>
        }
        {currentPage < totalPages && 
          <Button onClick={() => setCurrentPage(currentPage + 1)} sx={{ color: "white", marginLeft: "1vh" }}>Page suivante</Button>
        }
      </>
    );
  }
});