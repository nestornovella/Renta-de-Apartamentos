import SideSection from "../sideSection";
import Graphic from "./createGraphic";


const valore = {
    mes: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    neto: [1000, 2300, 6000, 4000, 3500, 2800, 5000, 4500, 3000, 5500, 7000, 8000],
    bruto: [1900, 3900, 1900, 4200, 3800, 3000, 5200, 4800, 3500, 6000, 7500, 8500],
    gasto: [900, 1300, 200, 200, 300, 200, 500, 300, 500, 500, 500, 700]
};


function EarningSideOne() {
    return (
        <SideSection>
            <div>
                <p className="text-gray-400 text-center">section one</p>
            </div>
            <div>
                <Graphic data={valore} type="line"/>
            </div>
            <div>
                <Graphic data={valore}/>
            </div>
        </SideSection>
    );
}

export default EarningSideOne;