import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CredentialsSignInPage from './componnent/login'
import  StateTextFields from './componnent/signUp'
import { Route, Routes } from 'react-router-dom'
import Package1 from './componnent/package'
import RecipeReviewCard from './componnent/Card'
import ListP from './componnent/ListP'
import SignUp from './componnent/signUp'
import Login from './componnent/login'
//import Purchases from './componnent/purchases'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
    <div id='d'>
      
      
      <Routes>
      <Route path="login" element={<Login/>} />
        
        <Route path="signUp" element={<SignUp/>} />
         {/* < Route path="package" element={<Package1 />} /> */}

         <Route path='ListP' element={<ListP/>} /> 
          {/* <Route path='purchases' element={<ActionAreaCard1/>}/>   */}

         <Route path='/' element={<CredentialsSignInPage />} />
         {/* <Route path='Card' element={<RecipeReviewCard />} /> */}
         
        {/* <Route path='/' element={<CredentialsSignInPage />} /> */}
       
        <Route path="*" element={<h1>not found</h1>}></Route>

      
      </Routes>
</div>
    </>
  )
}

export default App
