import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({story}) {
    //Data from story
    const {
        url,
        title,
        abstract,
        byline,
        published_date,
        multimedia
    } = story;

    //Date formatting
    const date = new Date(published_date);
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZoneName: "short"
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    const handleRedirect = () => {
        window.location.href = url; // Replace with your external link
    };

  return (
    <Card sx={{ minWidth: 400, maxWidth:400 }} onClick={handleRedirect}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={multimedia[0].url}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {abstract}
          </Typography>
          <Typography variant="body4" style={{borderLeft: '1px solid gray', paddingLeft: '5px'}}>
                Published {byline} on {formattedDate}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}