import { useParams } from "react-router"
import { useEffect, useState } from "react"
import API from "../services/api"
import '../style/globel.css'

function TournamentRegistrations() {

    const { tournamentId } = useParams()

    const [registrations, setRegistrations] = useState([])

    useEffect(() => {
        fetchRegistrations()
    }, [])

    const fetchRegistrations = async () => {

        const res = await API.get(`/registration/tournament/${tournamentId}`)

        setRegistrations(res.data)

    }

    const updateStatus = async (id, status) => {

        await API.put(`/registration/${id}/status`, { status })

        fetchRegistrations()

    }

    return (

        <div className="registrations-container">

            <h2 className="page-title">Player Registrations</h2>

            {registrations.map((r) => (

                <div key={r._id} className="registration-card">

                    <div className="player-info">
                        <h3>{r.user?.name}</h3>
                        <p className={`status ${r.status}`}>
                            Status: {r.status}
                        </p>
                    </div>

                    {r.status === "pending" && (
                        <div className="action-buttons">

                            <button
                                className="approve-btn"
                                onClick={() => updateStatus(r._id, "approved")}
                            >
                                Approve
                            </button>

                            <button
                                className="reject-btn"
                                onClick={() => updateStatus(r._id, "rejected")}
                            >
                                Reject
                            </button>

                        </div>
                    )}

                </div>

            ))}

        </div>
    )

}

export default TournamentRegistrations