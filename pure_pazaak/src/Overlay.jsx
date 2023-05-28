import './Overlay.css';
import { useState, useEffect } from 'react';

function Overlay(props){
  
    const [style, setStyle] = useState({});

    useEffect(() => {
      if (props.visible){
        setStyle({"visibility": "visible"});
      }
      else {
        setStyle({"visibility": "hidden"});
      }
    }, [props.visible]);

    return(
        <div className={`Overlay ${props.className}`} style={style}>
          {props.children}
        </div>
    )
}

export default Overlay;