import React, { Component } from 'react'  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";  
import dfm from "../../assets/dfm.PNG";
import et from "../../assets/et.PNG";
import td from "../../assets/td.PNG";
import 'bootstrap/dist/css/bootstrap.min.css';

export class Sliders extends Component {  
    render() {  
        var settings = {  
          dots: true, 
          infinite: true,
          autoplay: true,  
          duration: 1000,  
          centerMode: true,  
          slidesToShow: 1,  
          slidesToScroll: 1,  
          };  
          return (  
            <div style={{backgroundColor:"#293241"}}>  
            <div class='container'style={{alignItems:"center"}} >        
            <div className="row title" style={{marginBottom: "20px"}} >               
            </div>    
            </div>  
            <Slider {...settings} >  
              <div style={{width: "500px"}}>  
              <img  style={{height:"500px"}} src= {dfm} alt= "dont forget me"/>  
              </div>  
              <div style={{width: "500px"}}>  
              <img style={{height:"500px"}} src= {et} alt= "expense tracker" />  
              </div>  
              <div style={{width: "500px"}}>  
              <img  style={{height:"500px"}} src= {td} alt= "travel details"/>  
              </div>  
            </Slider>  
            </div>  
          );  
        }  
      }  
  
export default Sliders  