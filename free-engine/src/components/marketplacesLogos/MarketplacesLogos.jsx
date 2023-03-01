import React from 'react'
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export function MarketplacesLogos() {
  return  (
    <>
      <Typography variant="body1" sx={{fontFamily: 'monospace', color: "whitesmoke", display: "flex", justifyContent: "center"}}>
        Nous recherchons sur&nbsp;
        <Box component="span" fontWeight="bold">
          {`${Marketplaces.length}`}
        </Box>
        &nbsp;marketplaces actuellement !
      </Typography>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {Marketplaces.map((marketplace, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
              sx={{ width: "150px", height: "55px", margin: "1vw" }}
              onClick={() => window.open(`${marketplace.link}`, "_blank")}
            >
              <CardMedia
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
                component="img"
                src={marketplace.logo}
                title="Profile picture"
              />
            </Card>
          </Grid>
        ))}
      </div>
    </>
  )
}

const Marketplaces = [
  {
    title: "Malt.fr", 
    logo: "https://dam.malt.com/rebranding2020/malt-logo/malt-banner-logo",
    link: "https://www.malt.fr/"
  },
  {
    title: "Freelance.com",
    logo: "https://www.labellucie.com/wp-content/uploads/2021/12/Freelance.com_logo_labellucie.png",
    link: "https://www.freelance.com/"
  },
  {
    title: "Upwork.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Upwork-logo.svg/langfr-280px-Upwork-logo.svg.png",
    link: "https://www.upwork.com/"
  },
  {
    title: "Lehibou.com",
    logo: "https://www.lehibou.com/bundles/app/images/Logo-Hibou-black-linkedin.png",
    link: "https://www.lehibou.com/"
  },
  {
    title: "Arc.dev",
    logo: "https://d2m21dzi54s7kp.cloudfront.net/wp-content/uploads/2020/10/Arc.dev-1024x499.png",
    link: "https://arc.dev/"
  },
  {
    title: "Codementor.io",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Codementor_CIS.png",
    link: "https://www.codementor.io/"
  },
  {
    title: "Truelancer.com",
    logo: "data:image/png;base64,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",
    link: "https://www.truelancer.com/"
  },
  {
    title: "Fixnhour.com",
    logo: "https://www.fixnhour.com/Content/images/new-fixn-logo.png",
    link: "https://www.fixnhour.com/"
  }
];