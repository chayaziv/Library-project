
import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import RecipeReviewCard from './Card';
import { useEffect } from 'react';
import { getPackages } from '../redux/packageListSlice';

import { addPackage,deletePackage } from '../redux/store/actions/packegeAction';
import '../componnent/package.css'
// import {newPackage} from '../redux/store/actions/packegeAction'
const Package1 = () => {
const packages = useSelector(state=>state.packageReducer.packages)

console.log(packages);


const dispatch = useDispatch();
  useEffect(() => {
        dispatch(getPackages());
    }, [dispatch]);
    
return(<>
{/* <div 
 
// sx={{display:'grid',gridTemplateColumns:{sm:'1fr 1fr'},gap:8}}
 id='bb'>
{packag.map(pack=>
    <ul key={pack.id} >
    <div id='pp'>
    <ul id='p' style={{color:pack.color}}>{pack.price}</ul>
    <div id='pb'>
    <button onClick={()=>dispath(deletePackage(pack.id))} id='l1'>To remove</button>
    <button onClick={() => dispath(addPackage(newPackage))} id='l2'>To add</button>
    </div>
    </div>
    </ul> 
)}
</div> */}
 <div id='list'>
                
                
                {packages&&packages.map((p,index) => (
                    
                    
                    <RecipeReviewCard 
                        // img={images[index]}
                        PointCount={p.PointCount}
                        price={p.Price}
                        Description={p.Description }
                        key={index}
                    />
                    
                ))}
            </div>
</>)
}

export default Package1;
