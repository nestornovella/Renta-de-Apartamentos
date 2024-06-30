


function MainSection({children}) {
    return (
        <div className="grid  md:grid-cols-1 xl:grid-cols-2 gap-2  ">
            {children}
        </div>
    );
}

export default MainSection;