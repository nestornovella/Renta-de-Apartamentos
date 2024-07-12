import { useEffect, useState } from "react";
import SideSection from "../sideSection";
import * as graphics from "./createGraphic";
import axios from 'axios'




function EarningSideOne({data}) {
    console.log("🚀 ~ EarningSideOne ~ data:", data)
    const { LineGraphic } = graphics.default
    


   

    return (

        <SideSection>


            <div>
                <p className="text-gray-400 text-center">section one</p>
            </div>
            {
                data &&
                <div className="flex flex-col gap-2 xl:h-[650px]">
                    <div className="xl:h-[50%]">
                        <LineGraphic data={{ mes: data.months, bruto: data.amounts, neto: data.amounts?.map(e => e * 0.10 )}} type="line" />
                    </div>
                    <div className="xl:h-[50%]">
                        <LineGraphic data={{ mes: data.months, bruto: data.amounts, neto: data.amounts?.map(e => e * 0.10 )}} />
                    </div>
                </div>
            }

        </SideSection>
    );
}

export default EarningSideOne;