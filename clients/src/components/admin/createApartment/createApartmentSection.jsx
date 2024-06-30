import { useState } from "react";
import CreateApartForm from "./createApartForm";
import RenderNewApartSection from "./previewSection";
import useHandleInput from "../../../hooks/custom/inputValues";
import MainSection from "../mainSection";

function CreateApartSect() {
  const [hookState, setHookState] = useState({ input: {}, submit: () => { } });

  const { input } = useHandleInput();

  function getinput(state) {
    setHookState(state);
  }

  return (
    <MainSection className="grid  md:grid-cols-1 xl:grid-cols-2 gap-2  ">
      <CreateApartForm render={getinput} />
      <RenderNewApartSection
        input={hookState.input}
        submit={hookState.submit}
      />
    </MainSection>
  );
}

export default CreateApartSect;
