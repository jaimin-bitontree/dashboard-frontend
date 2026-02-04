import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import { CgProfile } from 'react-icons/cg'
import { RiLogoutCircleLine } from 'react-icons/ri'
function Dashboard() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }
  return (
    <>
      <nav className="navbar">
        <h2 className="navbar-title">Dashboard</h2>

        <div className="navbar-actions">
          <Button onClick={() => navigate('/profile')}>
            <CgProfile />
            Profile
          </Button>

          <Button onClick={handleLogout}>
            <RiLogoutCircleLine />
            Logout
          </Button>
        </div>
      </nav>

      <main className="dashboard-content">
        <p>Welcome to your dashboard!</p>
      </main>
    </>
  )
}

export default Dashboard
