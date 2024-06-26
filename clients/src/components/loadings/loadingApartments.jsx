


function LoadingApartaments() {

    return (
        <div className="w-full grid grid-cols-2 gap-4 md:gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
        </div>
    );
}


function LoadingCard() {
    return (
        <div className="w-full h-[380px] border bg-gray-200 backdrop-blur-2xl rounded-lg p-5 flex flex-col gap-2 ">
            <div className="bg-white w-full h-[70%] rounded-lg p-3 flex flex-col gap-2">
                <div className="bg-gray-200 h-[20px] w-[100px]"></div>
                <div className="bg-gray-200 h-[20px] w-[200px]"></div>
                <div className="bg-gray-200 h-[1000px] w-full"></div>
            </div>
            <div className="bg-white w-full h-[30%] rounded-lg p-3 flex flex-col gap-2">
                <div className="bg-gray-200 h-[20px] w-[100px]"></div>
                <div className="bg-gray-200 h-[20px] w-[200px]"></div>
            </div>
        </div>
    )

}

export default LoadingApartaments;