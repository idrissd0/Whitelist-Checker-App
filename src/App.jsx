import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/layout'
import Dashboard from './components/dashboard'
import Projects from './components/projects'
import Login from './components/Auth/Login'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                </Route>
                {/* in case of redirecting and you don't want to show the first Layout in login/register */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
