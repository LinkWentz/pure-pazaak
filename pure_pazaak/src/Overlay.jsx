import './Overlay.css';
import { useState, useEffect } from 'react';

function Overlay(props){
  
    const [style, setStyle] = useState({});

    useEffect(() => {
      if (props.for == props.turn){
        setStyle({"visibility": "hidden"});
      }
      else {
        setStyle({"visibility": "visible"});
      }
    }, [props.for, props.turn]);

    return(
        <div className="Overlay" style={style}/>
    )
}

export default Overlay;