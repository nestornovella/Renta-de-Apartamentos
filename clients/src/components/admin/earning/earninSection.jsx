import { useEffect } from "react";
import useGetErning from "../../../hooks/admin/adminErning";
import MainSection from "../mainSection";
import EarningSideOne from "./sideOne";
import EarningSideTwo from "./sideTwo";

function EarningSection() {
    const {earning, fetchingYear} = useGetErning()



    useEffect(()=>{
        fetchingYear(2024)
    }, [])
    return (
        <MainSection >
            <EarningSideOne data={earning}/>
            <EarningSideTwo data={earning}/>
        </MainSection>
    );
}

export default EarningSection;