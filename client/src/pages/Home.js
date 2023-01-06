import React from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Home() {

    const [products, setProducts] = React.useState([]);
    const [sortBy, setSortBy] = React.useState('');
    const [displayedProducts, setDisplayedProducts] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [msg, setMsg] = React.useState('');

    const getProducts = async () => {
        const response = await fetch('http://127.0.0.1:5000/products');
        const data = await response.json();
        setProducts(data);
        setDisplayedProducts(data);
    };

    React.useEffect(() => {
        getProducts();
    }, []);

    function handleSort(e) {
        setSortBy(e.target.value);
        if (e.target.value === 'nd') {
            setDisplayedProducts((prev) =>
                prev.slice().sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }
                    return 0;
                })
            );
        } else if (e.target.value === 'na') {
            setDisplayedProducts((prev) =>
                prev.slice().sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
            );
        } else if (e.target.value === 'pd') {
            setDisplayedProducts((prev) =>
                prev.slice().sort((a, b) => b.price - a.price)
            );
        } else if (e.target.value === 'pa') {
            setDisplayedProducts((prev) =>
                prev.slice().sort((a, b) => a.price - b.price)
            );
        }
    }

    function filterProducts(e) {
        e.preventDefault();
        setDisplayedProducts(
            products.filter(
                (x) =>
                    x.name.toUpperCase().includes(search.toUpperCase())
            )
        );
        setSortBy('');
        setSearch('');
        setMsg(`Results for: "${search}"`);
    }

    function clear() {
        setDisplayedProducts(products);
        setSearch('');
        setMsg('');
        setSortBy('');
    }

    const productElems = displayedProducts.map(x => (
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
                <option value="na">Name ascending</option>
                <option value="nd">Name descending</option>
                <option value="pa">Price ascending</option>
                <option value="pd">Price descending</option>
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