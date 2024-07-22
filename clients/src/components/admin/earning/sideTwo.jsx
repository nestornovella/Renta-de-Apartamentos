import { useEffect, useState } from "react";
import SideSection from "../sideSection";
import * as graphic from "./createGraphic";
import axios from 'axios'



function EarningSideTwo({data}) {
    

  

    const { CircleGraphic } = graphic.default
    return (
        <SideSection>
            <div>
                <p className="text-gray-400 text-center">Ganancia de Rentas</p>
            </div>
            {   data &&
                <>
                    <div className=" xl:h-[650px]">
                        <CircleGraphic data={{ mes: data.months,services:data.amounts?.map(e => e.service) ,bruto: data.amounts?.map(e => e.amount), neto: data.amounts?.map(e => e.amount * 0.10 )}} />
                    </div>
                </>
            }
        </SideSection>
    );
}

export default EarningSideTwo;