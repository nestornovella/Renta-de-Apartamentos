import { useEffect, useState } from "react";
import SideSection from "../sideSection";
import * as graphics from "./createGraphic";
import axios from 'axios'

function fetchnYear() {
    return axios.get('http://localhost:3000/rent/earnings?year=2024')
        .then(response => response.data)
        .then(response => response.data)

}

const valore = {
    mes: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    neto: [1000, 2300, 6000, 4000, 3500, 2800, 5000, 4500, 3000, 5500, 7000, 8000],
    bruto: [1900, 3900, 1900, 4200, 3800, 3000, 5200, 4800, 3500, 6000, 7500, 8500],
    gasto: [900, 1300, 200, 200, 300, 200, 500, 300, 500, 500, 500, 700]
};


function EarningSideOne() {
    const { LineGraphic } = graphics.default
    const [data, setData] = useState(null)


    useEffect(() => {
        fetchnYear()
            .then(response => setData({ mes: response.months, bruto: response.amounts, neto: response.amounts.map(e => e * Math.random()*2) }))
    }, [])

    return (

        <SideSection>


            <div>
                <p className="text-gray-400 text-center">section one</p>
            </div>
            {
                data &&
                <>
                    <div>
                        <LineGraphic data={data} type="line" />
                    </div>
                    <div>
                        <LineGraphic data={data} />
                    </div>
                </>
            }

        </SideSection>
    );
}

export default EarningSideOne;