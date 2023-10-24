import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div>
            <h1>
                This is Dashboard page
                <br />
                <Link to="/products" className="underline">
                    go to products
                </Link>
                <br />
                <Link to="/login" className="underline">
                    Login Page
                </Link>
            </h1>
        </div>
    )
}
