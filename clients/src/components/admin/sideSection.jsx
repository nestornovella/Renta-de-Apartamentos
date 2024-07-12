import Transition from "../complements/transition";

function SideSection({children}) {
    return (  
        <Transition className="flex flex-col  gap-2 xl:min-h-[700px]  shadow-2xl rounded-lg xl:mx-auto p-1 font-quicksand">
            {children}
        </Transition>
    );
}

export default SideSection;