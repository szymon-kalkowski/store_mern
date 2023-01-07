import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const deleteProduct = async () => {
        await fetch(`http://127.0.0.1:5000/products/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        props.setProducts(prev => prev.filter(x => x._id !== props.id));
    };

    return (
        <div className="col-12 my-3 rounded border border-primary p-3 d-flex justify-content-between">
            <div>
                <h3 className="my-3">{props.name}</h3>
                <h1 className="my-3">${props.price}</h1>
                <h5 className="my-3">{props.description}</h5>
                <p className="my-1">Size: {props.size}</p>
                <p className="my-1">Amount: {props.amount}</p>
            </div>
            <div className="d-flex justify-content-between flex-column align-items-end">
                <Link to={`/report/${props.id}`} className="btn btn-secondary my-3 d-block">Report</Link>
                <Link to={`/update/${props.id}`} className="btn btn-primary my-3 d-block">Edit</Link>
                <button className="btn btn-danger my-3" onClick={deleteProduct}>Delete</button>
            </div>
        </div>
    )
}