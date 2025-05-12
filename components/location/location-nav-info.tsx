import LocationCard from "./location-card";

interface LocationNavInfoProps {
    index: number | null,
    tabClicked: (index: number) => void;
}

export default function LocationNavInfo({ index, tabClicked }: LocationNavInfoProps) {

    const handleTabClick = (index: number) => {
        tabClicked(index);
    }

    return (
        <div className="px-10">
            {/** States tab */}
            <div id="location-tab" className="flex justify-center items-center border-y pt-4">
                <button className={`w-full flex justify-center py-4 text-2xl border-b-4 border-b-[#8E6F00]${index == 0 ? "" : "border-none"}`} onClick={() => { handleTabClick(0) }} aria-label="Go to Adelaide">Adelaide</button>
                <button className={`w-full flex justify-center py-4 text-2xl border-b-4 border-b-[#8E6F00]${index == 1 ? "" : "border-none"}`} onClick={() => { handleTabClick(1) }} aria-label="Go to Sydeny">Sydeny </button>
                <button className={`w-full flex justify-center py-4 text-2xl border-b-4 border-b-[#8E6F00]${index == 2 ? "" : "border-none"}`} onClick={() => { handleTabClick(2) }} aria-label="Go to Brisbane">Brisbane</button>
                <button className={`w-full flex justify-center py-4 text-2xl border-b-4 border-b-[#8E6F00]${index == 3 ? "" : "border-none"}`} onClick={() => { handleTabClick(3) }} aria-label="Go to Melbourne">Melbourne</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 py-16 gap-1 lg:gap-4 px-8">
                <p className=" px-8 py-2 bg-dark text-white text-center"><span className="font-bold">Company :</span> Dutton Retail 1</p>
                <p className=" px-8 py-2 bg-dark text-white text-center"><span className="font-bold">Dealer Licence Number :</span> 11174</p>
                <p className=" px-8 py-2 bg-dark text-white text-center"><span className="font-bold">ACN  :</span> 155 253 311</p>
            </div>

            {/* Location list by States */}
            {index == 0 && <div id="adelaide" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6, 7].map((index) => {
                    return (
                        <div key={index}>
                            <LocationCard />
                        </div>
                    );
                })}
            </div>}

            {index == 1 && <div id="sydeny" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((index) => {
                    return (
                        <div key={index}>
                            <LocationCard />
                        </div>
                    );
                })}
            </div>}

            {index == 2 && <div id="brisbane" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5].map((index) => {
                    return (
                        <div key={index}>
                            <LocationCard />
                        </div>
                    );
                })}
            </div>}

            {index == 3 && <div id="melbourne" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                    return (
                        <div key={index}>
                            <LocationCard />
                        </div>
                    );
                })}
            </div>}
        </div>
    );
}