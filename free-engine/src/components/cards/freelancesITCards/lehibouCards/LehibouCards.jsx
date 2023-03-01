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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./../cards.css"

export const LehibouCards = observer(() => {
  const freelancesStore = useFreelancesStore();
  const [freelancesLehibou, setFreelancesLehibou] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    if (freelancesStore.freelancesLehibou.length > 0) {
      setFreelancesLehibou(freelancesStore.freelancesLehibou)
      setTotalPages(Math.ceil((freelancesStore.freelancesLehibou.length - 1) / itemsPerPage))
    }
  }, [freelancesStore.freelancesLehibou, currentPage, freelancesStore.pricesRange])

  function getLehibouCards() {
    if (freelancesStore.loadingLehibou) {
      return (
        <Grid display='flex' height='10vh' marginLeft='45%' marginTop='2vh'>
          <BarLoader color="#e2e612" />
        </Grid>
      )
    }
    if (freelancesLehibou) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = freelancesLehibou.filter((_, i) => i >= startIndex && i < endIndex);
      return currentItems.map((freelance, index ) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card key={index} sx={{ minWidth: 270, maxWidth: 300, margin: "1vh"}} onClick={() => window.open(`https://www.Lehibou.com${freelance[2]}`, '_blank')}>
            <CardMedia
              sx={{ height: 200 }}
              image={`${freelance[3]}`}
              title="Profile picture"
            />
            <CardContent sx={{ height: "150px" }}>
            <Typography variant="body2" color="text.secondary">
                {freelance[4]}
              </Typography>
              <Typography variant="h5" component="div">
                {freelance[0]}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'blue' }}>
                {freelance[1]}
              </Typography>
            </CardContent>

            <Typography variant="body1" color="text.secondary" marginLeft="2vh">
              Prix disponnibles sur lehibou.com
            </Typography>
            <CardActions sx={{justifyContent: "center"}}>
              <Button size="small" onClick={() => window.open(`https://www.Lehibou.com${freelance[2]}`, '_blank')}>Voir sur Lehibou.fr</Button>
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
      <Typography gutterBottom variant="body" component="div" sx={{ color: "white", ml: "2vh", mt: "3vh"}}>
        {freelancesLehibou == null ? "Attente de résultats" : freelancesStore.freelancesLehibou.length } profils par page sur Lehibou.fr
      </Typography>
      {freelancesLehibou == null ? "" :
        <Typography gutterBottom variant="body" component="div" marginLeft={"2vh"} marginTop={"1vh"} sx={{ color: "white" }}>
          page {currentPage} sur {totalPages}
        </Typography>
      }
      <Grid container spacing={1}
        sx={{ mb: "1vh" }}
      >
        {getLehibouCards()}
      </Grid>
      {currentPage <= totalPages && currentPage >= 2 && 
        <Button 
          className="btn btn-one" 
          onClick={() => setCurrentPage(currentPage - 1)} 
          sx={{ 
            color: "white", 
            marginLeft: "1vh",
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
          startIcon={<ArrowBackIosNewIcon/>}
        >
          Précédent
        </Button>
      }
      {currentPage < totalPages && 
        <Button 
          className="btn btn-one" 
          onClick={() => setCurrentPage(currentPage + 1)} 
          sx={{ 
            width: "130px",
            color: "white", 
            marginLeft: "1vh",
            fontFamily: 'monospace',
            fontWeight: 700, 
          }}
          endIcon={<ArrowForwardIosIcon/>}
        >
          Suivant
        </Button>
      }
    </>
  );
});