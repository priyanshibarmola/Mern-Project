import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.jpg";
import CountryDropdown from "../CountryDropdown";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import Button from '@mui/material/Button';
import { useContext } from "react";
import { MyContext } from "../../App";

const Header = () => {

  const context=useContext(MyContext)
  return (
    <>
      <div className="headerWrapper">
        
        {/* Top strip */}
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Hurry!! <b>50%</b> off on traditional wear
            </p>
          </div>
        </div>

        {/* Main Header */}
        <header className="header">
          <div className="custom-container">
            <div className="row align-items-center">

              {/* Logo */}
              <div className="logoWrapper col-sm-2">
                <Link to="/">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>

              {/* Location + Search */}
              <div className="col-sm-8 d-flex align-items-center part2">
                {
                  context.countryList?.length!==0 && <CountryDropdown />
                }
                
                <SearchBox/>
              </div>

              {/* User + Price + Cart */}
              <div className="col-sm-2 d-flex align-items-center justify-content-end part3">

                <Button className="circle mr-3">
                  <FaRegCircleUser />
                </Button>

                <div className="cartTab d-flex align-items-center">
                  <span className="price">$3.90</span>

                  <div className="position-relative ml-2">
                    <Button className="circle">
                      <IoBagOutline />
                    </Button>

                    <span className="count d-flex align-items-center justify-content-center">
                      1
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </header>

        <Navigation/>
        
      </div>
    </>
  );
};

export default Header;