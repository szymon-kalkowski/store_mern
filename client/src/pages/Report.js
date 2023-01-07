import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Report() {
    const { id } = useParams();

    const [report, setReport] = React.useState({});

    const getReport = async () => {
        const response = await fetch(`http://127.0.0.1:5000/products/${id}/report`)
        const data = await response.json();
        setReport(data[0]);
    }

    React.useEffect(() => {
        getReport();
    }, []);

    return (
        <div className="row">
            <Link to="/" className="btn btn-primary mt-3">
                &#8592; Back
            </Link>
            <h1 className="text-center">REPORT</h1>
            <h3 className="my-3">Name: {report.name}</h3>
            <h3 className="my-3">Price: ${report.price}</h3>
            <h3 className="my-3">Amount: {report.amount}</h3>
            <h3 className="my-3">Total: ${report.total}</h3>
        </div>
    )
}