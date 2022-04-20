import React, {useState} from 'react'

function SearchBar({placeholder, data}){
        const [filteredData, setFilteredData] = useState([]);
        const [wordEntered, setWordEntered] = useState("");

        const handleFilter = (event) => {
            const searchWord = event.target.value
            setWordEntered(searchWord);
            const newFilter = data.filter((value) => {
                return value.title.toLowerCase().includes(searchWord.toLowerCase());
            });

            if (searchWord == ""){
                setFilteredData([]);
            } else {
            setFilteredData(newFilter);
            }
        }
    return(
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} value= {wordEntered} onChange={handleFilter}/>
                <div className = "searchIcon"></div>
            </div>
            {filteredData.length != 0 && (
            <div className="dataResult">
                {filteredData.slice(0,15).map((value, key) => {
                    return( <a className = "dataItem"> <p>{value.title} </p></a>
                );
                })}
            </div>
            )}
        </div>
    );
}

export default SearchBar