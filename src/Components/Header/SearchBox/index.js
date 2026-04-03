
import Button from "@mui/material/Button";
import {IoIosSearch} from "react-icons/io";

const SearchBox=()=>{
    return(
        <>
            <div className="headerSearch ml-3">
                  <input type="text" id="searchbar" name="searchbar" placeholder="Search for Products..." />
                  <Button>
                    <IoIosSearch />
                  </Button>
            </div>
        </>
    )
}

export default SearchBox;