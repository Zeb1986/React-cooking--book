import { useState, useEffect } from "react"
import { getAllCategories } from "../api"
import { Preloader } from '../components/Preloader'
import { CategoryList } from "../components/CategoryList";
import { Search } from "../components/Search";
import { useLocation, useSearchParams } from 'react-router-dom';

export function Home () {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const handleSearch = (str) => {
        setFilteredCatalog(
            catalog.filter((item) =>
                item.strCategory.toLowerCase().includes(str.toLowerCase())
            )
        )
        setSearchParams(`?search=${str}`);
        }    
    useEffect(() => {
        getAllCategories().then((data) => {setCatalog(data.categories);setFilteredCatalog(location.search? data.categories.filter((item) =>
            item.strCategory.toLowerCase().includes(location.search.split('=')[1].toLowerCase())
        ) : data.categories);})
    },[searchParams, location.search])

    return <>
        <Search cb={handleSearch} />
        {!catalog.length ? (<Preloader/>) : (
            <CategoryList catalog={filteredCatalog} />
        )}
    </>
}