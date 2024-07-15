import { useState } from "react";
import { FaCarSide } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";

function ServicePanel({ handler, selectService }) {
    const [cheked, setChecked] = useState({service:false, service1:true, service2:false})

    function sendService(e){
        handler(e)
        setChecked(prev => {return {...prev, service:!prev.service}})
    }

    function handleService(e){
        selectService(e)
        if(e.target.name == 'service1'){
            setChecked(prev => {return {service:true, service1:e.target.checked, service2:false}})
        }else{
            setChecked(prev => {return {service:true, service2:e.target.checked, service1:false}})
        }
    }

    

    return (
        <>
            <hr className="mt-2" />
            <div className="flex gap-1 m-2 ">
                <input name="services" onChange={(e) => sendService(e)} type="checkbox" />
                <p className="text-xs font-quicksand text-gray-400 w-full flex ">I require transportation service - additional cost <FaCarSide className="text-blue-400 size-[25px]" /></p>
            </div>
            {
                cheked.service &&
            <div className="flex gap-3 m-2 ">
                <div className="flex gap-1">
                    <input name="service1" id="1" value={45.00} onChange={e => handleService(e)} checked={cheked.service1} type="checkbox" />
                    <p className="text-xs font-quicksand text-gray-400 w-full flex ">from 1 to 3 <IoPeopleSharp className="ml-2 size-4 text-blue-500"/></p>
                </div>
                <div className="flex  items-center gap-1">
                    <input name="service2" id="2" value={65.00} onChange={e => handleService(e)} checked={cheked.service2} type="checkbox" />
                    <p className="text-xs font-quicksand text-gray-400 w-full flex ">from 3 to 6 <IoPeopleSharp className="ml-2 size-4 text-blue-500"/><IoPeopleSharp className="size-4 text-blue-800"/> </p>
                </div>
            </div>
            }
        </>
    );
}

export default ServicePanel;