import React from "react"; 
import Body from "./Components/body";
import styles from "./Styles/styles.css"; 

const App=()=>{

  return(
    <>
      <div className="heading-section">
        <h1 className="heading">Pomodoro Timer</h1>
        <hr/>
      </div>
      
      <Body/>
    </>
  )
}

export default App 





