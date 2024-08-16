import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'

const App = () => {

  const[showNavbar,setShowNavbar]=useState(false);

  useEffect(()=>{
    const handleScroll=()=>{
      if (window.scrollY < 200) {
        setShowNavbar(true); // Show navbar when at the top of the page
      } else if (window.scrollY > 6000) {
        setShowNavbar(true); // Show navbar when scrolling past 600px
      } else if (window.scrollY > 200) {
        setShowNavbar(false); // Hide navbar between 200px and 600px
      }
    };
    window.addEventListener('scroll',handleScroll);
    return()=>{
      window.removeEventListener('scroll',handleScroll);
    };
  },[]);
  return (
    <div>App
            {showNavbar && <Navbar />} 
      <div style={{height:'15000px',width:'300px',background:'orange'}}>
         hi
      </div>
    </div>
  )
}

export default App
