import { useEffect, useState } from "react";
import SideSection from "../sideSection";
import * as graphic from "./createGraphic";
import axios from 'axios'



function EarningSideTwo({data}) {
    

  

    const { CircleGraphic } = graphic.default
    return (
        <SideSection>
            <div>
                <p className="text-gray-400 text-center">section two</p>
            </div>
            {   data &&
                <>
                    <div>
                        <CircleGraphic data={data} />
                    </div>
                </>
            }
        </SideSection>
    );
}

export default EarningSideTwo;