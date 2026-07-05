import { FaSearch } from "react-icons/fa";

const SearchBox = ({placeH,value,onChange,fxnSubmitHandler,onFocus}) => {
    const onChangeHandler=(event)=>{
        onChange(event.target.value);
    }
const handleSubmit=()=>{
    if(fxnSubmitHandler)
    fxnSubmitHandler();
}
const handlefocus=()=>{
    if(onFocus)
    onFocus(true);
}
    
    return (
        <div className="flex flex-row items-center gap-2 w-fit border border-gray-300 p-2 rounded-lg shadow-sm bg-white">
            <input
                type="text"
                placeholder={placeH}
                value={value}
                onChange={(event)=>onChangeHandler(event)}
                onFocus={()=>handlefocus()}
                className="outline-none px-3 py-2 w-64 border-none focus:ring-2 focus:ring-blue-400 rounded-md"
            />
            <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                <FaSearch className="text-lg" />
            </button>
        </div>
    );
};

export default SearchBox;
