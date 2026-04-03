
import Button from '@mui/material/Button';
import {FaAngleDown} from "react-icons/fa6";
import Dialog from '@mui/material/Dialog';
import {IoIosSearch} from 'react-icons/io';
import {MdClose} from "react-icons/md";
import React, {useContext, useEffect, useState} from 'react';
import { MyContext } from '../../App';


const CountryDropdown=()=>{

    const [isOpenModel, setisOpenModel]= useState(false);
    const [selectedTab, setselectedTab]=useState(null);

    const [countryList, setCountryList]=useState([])
    const context = useContext(MyContext);
    
    const selectCountry=(index, country)=>{
        setselectedTab(index);
        setisOpenModel(false);
        context.setselectedCountry(country)
    }

    useEffect(()=>{
        setCountryList(context.countryList);
    },[])

    const filterList=(e)=>{
        const keyword=e.target.value.toLowerCase();
        
        if(keyword!==""){
            const list=countryList.filter((item)=>{
                return item.country.toLowerCase().includes(keyword);
            })
            setCountryList(list);
        }else{
            setCountryList(context.countryList);
        }
        

        
    }
    return(
        <>
            <Button className='countryDrop' onClick={()=>setisOpenModel(true)}>
                <div className='info d-flex flex-column'>
                    <span className='lable'>Your Location</span>
                    <span className='name'>{context.selectedCountry!=="" ? context.selectedCountry.length>10 ? context.selectedCountry?.substr(0,10)+'...' :context.selectedCountry: 'Select Location'}</span>
                </div>
                <span className='ml-auto'><FaAngleDown/></span>
            </Button>

            <Dialog open={isOpenModel} onClose={()=>setisOpenModel(false)} className='locationModel' >
                <h4 className='mb-0'>Choose your Delivery Location</h4>
                <p>Enter your address and we will specify the offer for your area.</p>
                <Button className='close_' onClick={()=>setisOpenModel(false)}><MdClose/></Button>
                <div className="headerSearch w-100">
                    <input type="text" placeholder="Search your area..." onChange={filterList}/>
                    <button><IoIosSearch /></button>
                </div>

                <ul className='countryList mt-3'>
                {
                    countryList?.length!==0 && countryList?.map((item, index)=>{
                        return(
                            <li key={index}><Button onClick={()=>selectCountry(index, item.country)} className={`${selectedTab===index ? 'active' : ''}`}>{item.country}</Button></li>
                        )
                    })
                }
                </ul>
            </Dialog>
        </>
    )
}

export default CountryDropdown;