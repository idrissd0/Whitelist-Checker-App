import { Link } from 'react-router-dom'

export default function Products() {
    return (
        <div>
            <h1 className="">
                This is products page
                <br />
                <Link to="/" className="bg-red-200 underline">
                    go to products
                </Link>
                <br />
                <Link to="/login" className="bg-red-400 underline">
                    Login Page
                </Link>
            </h1>
        </div>
    )
}
