import { gridLayer } from "leaflet";
import { useEffect, useState } from "react";
import CreateApartSect from "./createApartment/createApartmentSection";
import panelOptions from "./sectionsPanel/sidePanel/panelOptions.json";
import CPanel from "./sectionsPanel/sidePanel/cPanel";
import useHandlePanelOptions from "../../hooks/custom/handlePanelOptions";
import RenderSection from "./sectionsPanel/renderSection/renderInfoSection";
import { scrollTop } from "../../utils/scrollTop";
import { useSearchParams } from 'react-router-dom'


function AdminPanel() {
  const { handleOptions, section } = useHandlePanelOptions();
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('section');
  useEffect(()=>{
    queryValue && handleOptions(queryValue)
  },[])
  
  scrollTop()
  return (
    <div className="grid md:grid-cols-[30%,1fr] xl:grid-cols-[20%,1fr] md:grid-rows-[1fr] grid-rows-[10%,1fr] xl:px-30 2xl:px-40 h-screen gap-2">
      <CPanel handleOption={handleOptions} />
      <RenderSection section={section} />
    </div>
  );
}

export default AdminPanel;
