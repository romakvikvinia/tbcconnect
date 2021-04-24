import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, Box, Button, Typography } from '@material-ui/core/';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

export function TemplateCard() {
  return (
    <Card>
      <CardActionArea>
        <Box textAlign='center'>
          <ImageOutlinedIcon style={{ fontSize: 200 }} />
        </Box>

        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
