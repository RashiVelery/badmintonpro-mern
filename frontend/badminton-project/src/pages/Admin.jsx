import { useNavigate } from 'react-router'
import '../style/globel.css'

function Admin() {

    const navigate = useNavigate();
  return (
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-grid">

        <div className="admin-card" onClick={()=>navigate('/createTournament')}>
          <h3>Create Tournament</h3>
          <p>Add a new badminton tournament</p>
        </div>

        <div className="admin-card" onClick={()=> navigate('/publishTournament')}>
          <h3>Publish Tournament</h3>
          <p>Publish tournaments for users</p>
        </div>

        <div className="admin-card" onClick={()=>navigate(`/manageRegistration`)}>
          <h3>Manage Registrations</h3>
          <p>Approve or reject players</p>
        </div>

        <div className="admin-card" onClick={()=>navigate('/generateMatches')}>
          <h3>Generate Matches</h3>
          <p>Create match fixtures</p>
        </div>

         <div className="admin-card" onClick={()=>navigate('/usersList')}>
          <h3>User List</h3>
          <p>Logged in users</p>
        </div>

      </div>

    </div>
  )
}

export default Admin