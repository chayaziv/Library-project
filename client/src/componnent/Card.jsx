import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import{Button} from '@mui/material';
import { fetchLogin } from "../redux/SubscriptionsSlice";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
const handleSubmit = async (e) => {
 
    e.preventDefault();
    if (validateFields()) {

      try {
      
        const response = await dispatch(buyPackage(formData)).unwrap(); // קריאה לפונקציית login
        
console.log(response);

        switch (response.status) {
          case 200:
            navigate("/Login");
            break;
          case 404:
            console.error("not found")
             navigate("/signUp")
            break;
        }

      } catch (error) {
        console.error("Error during login:", error);
        navigate("/signUp")
      }
    };
  }


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard({img:src,PointCount: PointCount,price: Price,Description: Description}) {
//  export default function RecipeReviewCard({img:src}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    
    <Card sx={{ width:"400px",maxWidth: 345,
        backgroundColor:' rgb(219, 189, 149)',marginLeft:'4vh'
     }}onSubmit={handleSubmit}>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
           
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        
        title=  {Description}
      
        
        subheader={PointCount}
        
      />
      <CardMedia
        component="img"
        height="194"
         image={src}
        alt="Paella dish"
        id='img1'
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' ,fontSize:'20px'}}>
          The price is: {Price} 
        </Typography>
      </CardContent>
       <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            marginTop: 2,
                            padding: 1,
                            backgroundColor: 'rgb(219, 189, 149)' ,
                            
                            color: '#1a1a1a',
                        }}
                    >
                        For purchase
                     
                    </Button>
                    
                   
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Description:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {Description}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {/* Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil. */}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {/* Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.) */}
          </Typography>
          <Typography>
            {/* Set aside off of the heat to let rest for 10 minutes, and then serve. */}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
  
}

