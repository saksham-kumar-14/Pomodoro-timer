import React, { useEffect, useState } from "react";
import settings_api from "./timer_settings_api"; 
import ChangeSettings from "./change_settings";

function change_mode(mode_id,time,set_current_time,settings,set_settings){
    set_current_time(time); 
    let arr = []
    for(let i=0;i<settings.length;i++){
        let obj = settings[i];
        if(obj.id == mode_id){ 
            obj.selected = true; 
        }else{
            obj.selected = false; 
        }
        arr.push(obj); 
    }
    set_settings(arr); 
    console.log(arr);  
}

function give_time(current_time){
    const hrs = Math.floor(current_time/3600); 
    const mins = Math.floor(current_time/60 - hrs*60); 
    const secs = Math.floor(current_time - mins*60 - hrs*3600); 
    const result = hrs.toString() + ":" + mins.toString() + ":" + secs.toString(); 
    return result 
}

const Body=()=>{
    const [settings,set_settings] = useState(settings_api);
    const [current_time,set_current_time] = useState(1500);  
    const[start,set_start] = useState(false); 

    useEffect(()=>{
        if(current_time>0){
            setTimeout(()=>{
                if(start){
                    set_current_time(current_time-1); 
                }
            },1000)
        }
            
    })

    return(
        <>

        <div className="timer-body-prev">
            <div className="timer-body">
                <div className="timer-btns">
                    {settings.map((element)=>{
                        let btn_text; let class_name; 
                        if(element.id === "short-work-time"){btn_text="Short Work";
                            if(element.selected){
                                class_name="timer-btn-selected"
                            }else{class_name="timer-btn"}}
                        else if(element.id === "short-break"){btn_text="Short Break";
                            if(element.selected){
                                class_name="timer-btn-selected"
                            }else{class_name="timer-btn"}}
                        else if(element.id === "long-work-time"){btn_text="Long Work";
                            if(element.selected){
                                class_name="timer-btn-selected"
                            }else{class_name="timer-btn"}}
                        else{btn_text="Long Break";
                            if(element.selected){
                                class_name="timer-btn-selected";
                            }else{
                                class_name="timer-btn"; 
                            }}
                        return(
                            <button onClick={()=>{
                                if(!start){
                                    change_mode(element.id,element.value,set_current_time,settings,set_settings)
                                }else{
                                    set_start(false); 
                                    alert("Your timer has been stopped.")
                                }
                                }} className={class_name}>{btn_text}</button>
                        )
                    })}
                </div>
        
                <div className="timer-counter">
                    {give_time(current_time)}
                </div>

                <button onClick={()=>{
                    if(start){set_start(false);}
                    else{set_start(true);}
                }} className="start-btn">
                    {!start && <span>START</span>}
                    {start && <span>STOP</span>}
                </button>

            </div>  
        </div>

        <ChangeSettings settings={settings} set_settings={set_settings} /> 

        </>
    )
}


export default Body 

