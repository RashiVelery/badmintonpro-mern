import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router"

function ManageRegistration() {

    const [tournaments, setTournaments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchTournaments()
    }, [])

    const fetchTournaments = async () => {

        const res = await API.get("/tournament")

        setTournaments(res.data)

    }

    return (

        <div className="container">

            <h2>Manage Registrations</h2>

            {tournaments.map(t => (
                <div
                    key={t._id}
                    className="tournament-card"
                    onClick={() => navigate(`/manageRegistration/${t._id}`)}
                >

                    <h3>{t.name}</h3>
                    <p>{t.location}</p>

                </div>
            ))}

        </div>

    )
}

export default ManageRegistration