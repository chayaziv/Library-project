
 import { useDispatch, useSelector } from 'react-redux';
import RecipeReviewCard from './Card';
import { getPackages} from '../redux/packageListSlice';
 import { CircularProgress, Link } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useEffect } from 'react';

export default function ListP() {
    const images = ['../../b3.webp','../../b2.webp','../../b4.webp','../../1743.jpg'];
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getPackages());
    }, [dispatch]);
    
    const {packages}= useSelector(state=> state.package
); 

console.log("packages in ggg",packages);

    // if (loading) return <CircularProgress sx={{ color: orange[800] }} />;
    // if (error) return <p>Error: {error}</p>;

    return (
        <>
        
            <div id='list'>
               
                {packages&&packages.map((p,index) => (
                    <>
                  
                    <RecipeReviewCard
                        img={images[index]}
                        PointCount={p.pointCount}
                        price={p.price}
                        Description={p.description }
                        key={p.packageCodePackageCode }
                    />
                    </>
                ))}
            </div>
            
            
        </>
    );
}







// import  React from 'react'
// import RecipeReviewCard from './Card'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'



//  function ListP() {
//   //const [count, setCount] = useState(0)

//    return (
//     <>
  
    
    
    
   
//         <div id='Rec'>
//         <RecipeReviewCard img={'../../b3.webp'}/>
//         <RecipeReviewCard img={'../../b2.webp'}/>
//         <RecipeReviewCard img={'../../b4.webp'}/>
       
        
       
//        </div> 
       

      
      
//        </>
//    )
// }


// export default ListP

