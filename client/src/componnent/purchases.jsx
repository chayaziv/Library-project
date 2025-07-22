import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from "../images/logo.png"
// import { Button} from 'react-bootstrap';
 import {
   Button,
   Box  
 } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getPurchases, upDatePoints } from '../redux/MyPurchasesSlice';
import { useEffect } from 'react';
 
 
export default function ActionAreaCard1() {
 
    const navigate = useNavigate()
    const loction=useLocation()
    const u = useSelector((state) => state.user.user)
   
    const handelChange = async () => {
      navigate("/PackageList")

    }
    const realization = async ({p}) => {
     p.balancedPoints=p.balancedPoints-loction.state.product.points
       const response = await dispatch(upDatePoints(p)).unwrap();
      
    }

  //   const dispatch=useDispatch()
  //   useEffect(() => {
 
  //    console.log(u);
  

  //   try {

  //     const response = dispatch(getPurchases(u))
  //    console.log(response);
     


  //   } catch (error) {
  //     console.error("Error during purchases:", error);

  //   }

  // }, [dispatch])
    
    
    const purchase = u.purchases
    return (<>
    <h1 style={{color:'#D98022',fontFamily:'revert'}}>My Purchases</h1>
   
    
  {purchase&&purchase.map((p,index)=>(
    
        <Card sx={{ maxWidth: 345,
            color:'#D98022'
         }} key={index}>
            <CardActionArea>
                <CardMedia 

                    height="140"
                    
                    alt="Purchases"
                />
                <CardContent >
                    <Typography gutterBottom variant="h5" component="div">                      
                        
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Purchase code :        {p.id}<br/>
                    Purchase date:  {p.purchaseDate}<br/>
                    pointsBalance :         {p.balancedPoints}<br/>
                    <Box component="form" ><Button
                                   type="submit"                           
                                   onClick={()=>realization(p)}                             
                                   variant="contained"
                                   fullWidth
                                   sx={{
                                     marginTop: 2,
                                     padding: 1,
                                     backgroundColor: '#D98022',
                                     '&:hover': {
                                       backgroundColor: '#c0a236',
                                     },
                                     color: '#1a1a1a',
                                   }}
                                 >
                                 FOR PURCHASE
                                 {/* לרכישת החבילה */}
                                 </Button></Box>
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
        </Card>))}
        
        <Button 
            type="submit"
             onClick={handelChange()}
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              padding: 1,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: '#c0a236',
              },
              color: '#1a1a1a',
            }}
          >
            for a new package
          </Button>
        </>
        
    );
}