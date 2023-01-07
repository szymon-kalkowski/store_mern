import React from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function UpdateProduct() {
    const { id } = useParams();

    const [product, setProduct] = React.useState({});

    const getProduct = async () => {
        const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
        const data = await response.json();
        setProduct(data);
    };

    React.useEffect(() => {
        getProduct();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        await fetch(`http://127.0.0.1:5000/products/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                price: +data.price,
                description: data.description,
                amount: +data.amount,
                size: data.size
            })
        })
        reset();
        setProduct({
            _id: id,
            name: data.name,
            price: +data.price,
            description: data.description,
            amount: +data.amount,
            size: data.size
        });
    };

    return (
        <div className="row">
            <Link to="/" className="btn btn-primary mt-3">
                &#8592; Back
            </Link>
            <h3 className="my-3">Name: {product.name}</h3>
            <h3 className="my-3">Price: ${product.price}</h3>
            <h3 className="my-3">Description: {product.description}</h3>
            <h3 className="my-3">Size: {product.size}</h3>
            <h3 className="my-3">Amount: {product.amount}</h3>
            <h1 className="text-center my-3">UPDATE PRODUCT</h1>
            <form className="form my-3" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control my-3"
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: true })}
                />
                {errors.name && (
                    <span className="text-danger d-block">This field is required!</span>
                )}
                <input
                    className="form-control my-3"
                    type="number"
                    placeholder="Price"
                    min={0}
                    step={0.01}
                    {...register('price', { required: true })}
                />
                {errors.price && (
                    <span className="text-danger d-block">This field is required!</span>
                )}
                <input
                    className="form-control my-3"
                    type="text"
                    placeholder="Description"
                    {...register('description', { required: true })}
                />
                {errors.description && (
                    <span className="text-danger d-block">This field is required!</span>
                )}
                <input
                    className="form-control my-3"
                    type="number"
                    placeholder="Amount"
                    min={0}
                    step={1}
                    {...register('amount', { required: true })}
                />
                {errors.amount && (
                    <span className="text-danger d-block">This field is required!</span>
                )}
                <input
                    className="form-control my-3"
                    type="text"
                    placeholder="Size"
                    {...register('size', { required: true })}
                />
                {errors.size && (
                    <span className="text-danger d-block">This field is required!</span>
                )}

                <button className="btn btn-dark my-3 d-block mx-auto">Update product</button>
            </form>
        </div>
    )
}