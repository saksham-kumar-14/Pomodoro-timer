import React, { useState } from "react";

function change_settings(mode,hours,minutes,seconds,set_settings,settings,set_form_appear,set_subform_appear){
    let arr = []
    hours = parseInt(hours); 
    minutes = parseInt(minutes); 
    seconds = parseInt(seconds); 
    const time = hours*3600 + minutes*60 + seconds; 

    if(time>0){
        for(let i=0;i<settings.length;i++){
            let obj = settings[i]; 
            if(obj.id === mode.id){
                obj.value = time;  
            }
    
            arr.push(obj) 
        }
        set_settings(arr);  
        set_form_appear(false); 
        set_subform_appear(false);
    } 

}
const ChangeSettings=({settings,set_settings})=>{
    const [form_appear,set_form_appear] = useState(false);
    const [change,set_change] = useState("short-work-time"); 
    const [subform_appear,set_subform_appear] = useState(false); 
    const[new_hrs,set_new_hrs] = useState(0); 
    const[new_mins,set_new_mins] = useState(0); 
    const[new_secs,set_new_secs] = useState(0); 

    return(
        <>

        <div className="change-settings-prev">
            <div className="change-settings">
                <span className="change-settings-heading">Change Settings</span>
                <button onClick={()=>{set_form_appear(true)}} className="change-settings-btn">Change</button>


                {form_appear &&
                <>
                <button onClick={()=>{set_form_appear(false);set_subform_appear(false)}} className="cancel-settings-btn">Cancel</button>
                 <div className="change-settings-form">
                        <label className="settings-form-heading">Change settings of : </label>
                        {settings.map((e)=>{
                            let btn_text;
                            if(e.id==="short-work-time"){btn_text="Short Work"}
                            else if(e.id==="short-break"){btn_text="Short Break"}
                            else if(e.id==="long-work-time"){btn_text="Long Work"}
                            else{btn_text="Long Break"}

                            let btn_class; 
                            if(e.id===change.id){btn_class="change-settings-form-btn-selected"}
                            else{btn_class="change-settings-form-btn"} 
                            return(
                                <button onClick={()=>{set_change(e);set_subform_appear(true)}} className={btn_class}>
                                    {btn_text}
                                </button>
                            )
                        })}
                    </div>
                </>
                }
                
                {subform_appear && <div className="change-subsettings-form">
                        <input className="sub-settings-inputs" onChange={(e)=>{set_new_hrs(e.target.value)}} type="number" placeholder="Hours"></input>
                        <input className="sub-settings-inputs" onChange={(e)=>{set_new_mins(e.target.value)}} type="number" placeholder="Minutes"></input> 
                        <input className="sub-settings-inputs" onChange={(e)=>{set_new_secs(e.target.value)}} type="number" placeholder="Seconds"></input> <br/>

                        <div className="sub-settings-btn-div">  
                            <button className="sub-settings-btn" onClick={()=>{change_settings(change,new_hrs,new_mins,new_secs,set_settings,settings,set_form_appear,set_subform_appear)}}>Submit</button>
                        </div>  
                    
                    </div>}

            </div>
        </div>

        </>
    )
}

export default ChangeSettings
