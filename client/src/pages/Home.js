import React from "react";
import ProductCard from "../components/ProductCard";
import { Link, useSearchParams } from "react-router-dom";

export default function Home() {

    const [products, setProducts] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const [sortBy, setSortBy] = React.useState('');

    const [searchParams, setSearchParams] = useSearchParams({});

    const getProducts = async () => {
        const searchParam = searchParams.get('search');
        const sortParam = searchParams.get('sort');
        let response = {};
        if (searchParam && sortParam) {
            response = await fetch(`http://127.0.0.1:5000/products?search=${searchParam}&sort=${sortParam}`);
        } else if (searchParam) {
            response = await fetch(`http://127.0.0.1:5000/products?search=${searchParam}`);
        } else if (sortParam) {
            response = await fetch(`http://127.0.0.1:5000/products?sort=${sortParam}`);
        } else {
            response = await fetch('http://127.0.0.1:5000/products');
        }
        const data = await response.json();
        setProducts(data);
    };

    React.useEffect(() => {
        getProducts();
    }, [searchParams]);

    function handleSort(e) {
        e.preventDefault();
        setSortBy(e.target.value);
        setSearchParams(searchParams.get("search") ? { sort: e.target.value, search: searchParams.get("search") } : { sort: e.target.value });
    }

    function filterProducts(e) {
        e.preventDefault();
        setSearchParams(sortBy ? { search: search, sort: sortBy } : { search: search });
        setSearch('');
        setMsg(`Results for: "${search}"`);
    }

    function clear() {
        setSearchParams({});
        setSearch('');
        setMsg('');
        setSortBy('');
    }

    const productElems = products.map(x => (
        <ProductCard
            key={x._id}
            name={x.name}
            price={x.price}
            id={x._id}
            setProducts={setProducts}
            size={x.size}
            description={x.description}
            amount={x.amount}
        />
    ))

    return (
        <div className="row">
            <h1 className="text-center my-3">PRODUCTS</h1>
            <Link to="add" className="btn btn-primary my-3">
                Add new product
            </Link>
            <form
                className="d-flex justify-content-between w-100 p-0"
                role="search"
                onSubmit={filterProducts}
            >
                <input
                    required
                    className="form-control border-primary me-3"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-outline-primary">Szukaj</button>
            </form>
            <select
                className="form-control my-3 border-primary"
                value={sortBy}
                onChange={handleSort}
            >
                <option value="">Sort by</option>
                <option value="name_asc">Name ascending</option>
                <option value="name_desc">Name descending</option>
                <option value="price_asc">Price ascending</option>
                <option value="price_desc">Price descending</option>
            </select>
            {msg && (
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="p-0 my-3">{msg}</h2>
                    <button className="btn btn-dark" onClick={clear}>
                        Clear filter
                    </button>
                </div>
            )}
            {productElems}
        </div>
    )
}