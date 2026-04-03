import Button from "@mui/material/Button";
import {IoIosMenu} from "react-icons/io";
import {FaAngleDown} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";




const Navigation=()=>{


    const [isopenSidebarVal, setisopenSidebarVal] = useState(false);

    return (
        <>
            <nav>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2 navPart1">
                            <div className="catWrapper">
                                <Button className="allCartTab align-items-center" onClick={()=>setisopenSidebarVal(!isopenSidebarVal)}>
                                    <span className="icon1 mr-2"><IoIosMenu/></span>
                                    <span className="text">ALL CATEGORIES</span>
                                    <span className="icon2 ml-2"><FaAngleDown/></span>
                                </Button>

                                <div className={`sidebarNav ${isopenSidebarVal ? 'open' : ''}`}>
                                    <ul>
                                        <li><Link to="/"><Button>Men</Button></Link></li>
                                        <li><Link to="/"><Button>Women</Button></Link></li>
                                        <li><Link to="/"><Button>Beauty</Button></Link></li>
                                        <li><Link to="/"><Button>Watches</Button></Link></li>
                                        <li><Link to="/"><Button>Kids</Button></Link></li>
                                        <li><Link to="/"><Button>Gifts</Button></Link></li>
                                        <li><Link to="/"><Button>Men</Button></Link></li>
                                        <li><Link to="/"><Button>Women</Button></Link></li>
                                        <li><Link to="/"><Button>Beauty</Button></Link></li>
                                        <li><Link to="/"><Button>Watches</Button></Link></li>
                                        <li><Link to="/"><Button>Kids</Button></Link></li>
                                        <li><Link to="/"><Button>Gifts</Button></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-10 navPart2 d-flex align-items-center">
                            <ul className="list list-inline w-auto">
                                <li className="list-inline-item"><Link to="/"><Button>Home</Button></Link></li>
                                <li className="list-inline-item"><Link to="/"><Button>Men</Button></Link>
                                    <div className="submenu shadow">
                                        <Link to="/"><Button>Clothing</Button></Link>
                                        <Link to="/"><Button>Footwear</Button></Link>
                                        <Link to="/"><Button>Watches</Button></Link>
                                    </div>    
                                </li>
                                <li className="list-inline-item"><Link to="/"><Button>Women</Button></Link>
                                    <div className="submenu shadow">
                                        <Link to="/"><Button>Clothing</Button></Link>
                                        <Link to="/"><Button>Footwear</Button></Link>
                                        <Link to="/"><Button>Watches</Button></Link>
                                    </div>
                                </li>
                                <li className="list-inline-item"><Link to="/"><Button>beauty</Button></Link>
                                    <div className="submenu shadow">
                                        <Link to="/"><Button>Clothing</Button></Link>
                                        <Link to="/"><Button>Footwear</Button></Link>
                                        <Link to="/"><Button>Watches</Button></Link>
                                    </div>
                                </li>
                                <li className="list-inline-item"><Link to="/"><Button>Watches</Button></Link>
                                    <div className="submenu shadow">
                                        <Link to="/"><Button>Clothing</Button></Link>
                                        <Link to="/"><Button>Footwear</Button></Link>
                                        <Link to="/"><Button>Watches</Button></Link>
                                    </div>
                                </li>
                                <li className="list-inline-item"><Link to="/"><Button>Kids</Button></Link></li>
                                <li className="list-inline-item"><Link to="/"><Button>Gifts</Button></Link></li>
                                <li className="list-inline-item"><Link to="/"><Button>Contact Us</Button></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation;