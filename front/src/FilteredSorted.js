import { useState } from "react";

 function FilteredSorted(props) {

    const { onFilter, setFiltered, setSorted } = props 
    const [year, setYear] = useState('');
    const [keyword, setKeyword] = useState('');
    
    const filter = (event) => {
        onFilter(
            year,
            keyword
        )
    }

    const clearFilter = (event) => {
        setSorted(false);
        setFiltered(false);
    }

    const sortDdl = (event) => {
        setFiltered(false);
        setSorted(true);
    }

    return (
        <div>
            <div>
                <div>
                    <h3>Listings filtered:</h3>
                    <input type='text' placeholder='keyword' value={keyword} onChange={(evt) => setKeyword(evt.target.value)}/>
                    <input type='number' placeholder='year' value={year} onChange={(evt) => setYear(evt.target.value)} />
                </div>
                <div>
                    <input type='button' value='filter' onClick={filter}/>
                    <input type='button' value='clear filter' onClick={clearFilter} />
                    <input type='button' value='sort by deadline' onClick={sortDdl} />
                </div>
            </div>
        </div>
    )

 }

 export default FilteredSorted;