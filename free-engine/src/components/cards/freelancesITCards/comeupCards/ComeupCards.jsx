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

export const ComeupCards = observer(() => {
  const freelancesStore = useFreelancesStore()
  const [freelancesComeup, setFreelancesComeup] = useState(null)
  const [comeupFormatNumber, setComeupFormatNumber] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    if (freelancesStore.freelancesComeup.length > 0) {
      setFreelancesComeup(freelancesStore.freelancesComeup)
      setComeupFormatNumber(freelancesStore.freelancesComeup[freelancesStore.freelancesComeup.length - 1].replace(/([&nbsp])\w+([;])/g, ""))
      setTotalPages(Math.ceil((freelancesStore.freelancesComeup.length - 1) / itemsPerPage))
    }
  }, [freelancesStore.freelancesComeup, currentPage])

  function getComeupCards() {
    if (freelancesStore.loadingComeup) {
      return (
        <Grid display='flex' height='10vh' marginLeft='45%' marginTop='2vh'>
          <BarLoader color="#e2e612" />
        </Grid>
      )
    }
    if (freelancesComeup) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const actualFreelances = freelancesComeup.slice(0, -1)
      const currentItems = actualFreelances.filter((_, i) => i >= startIndex && i < endIndex);
      return currentItems.map((freelance, index ) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card key={index} sx={{ maxWidth: 300, margin: "1vh"}} onClick={() => window.open(`https://comeup.com${freelance[3]}`, '_blank')}>
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
                {freelance[1] != null ? freelance[1] : `Infos sur Comeup.com`}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {freelance[2] != null ? freelance[2].replace(/<span class="visually-hidden">(.*?)<\/span>/g, '') : `Développeur web`}
              </Typography>
            </CardContent>
            <Typography variant="body1" color="text.secondary" marginLeft="2vh">
              Prix à partir de: {freelance[0] != null ? 
                Number.isInteger(freelance[0]) ? freelance[0] : freelance[0].replace(/\D/g, "") 
                : "Non communiqué"} €
            </Typography>
            <CardActions sx={{justifyContent: "center"}}>
              <Button size="small" onClick={() => window.open(`https://comeup.com${freelance[3]}`, '_blank')}>Voir sur Comeup.com</Button>
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
        {comeupFormatNumber == null ? "Attente de résultats" : comeupFormatNumber} sur Comeup.com
      </Typography>
      <Grid container spacing={1}>
        {getComeupCards()}
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