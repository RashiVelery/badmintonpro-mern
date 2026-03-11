import { useEffect, useState } from "react"
import API from "../services/api"
import '../style/globel.css'
function PublishTournament() {

    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        fetchTournaments()
    }, [])

    const fetchTournaments = async () => {
        const res = await API.get("/tournament")
        setTournaments(res.data)
    }

    const publishTournament = async (id) => {
        await API.put(`/tournament/publish/${id}`)
        alert("Tournament Published")
        fetchTournaments()
    }

    return (

        <div className="publish-container">
            <h2>Publish Tournaments</h2>

            {tournaments.map((tournament) => (
                <div key={tournament._id} className="tournament-card">

                    <div className="card-left">
                        <h3>{tournament.name}</h3>
                        <p className="location">{tournament.location}</p>
                        <p className="status">Status: {tournament.status}</p>
                    </div>

                    <div className="card-right">
                        {tournament.status === "draft" && (
                            <button
                                className="publish-btn"
                                onClick={() => publishTournament(tournament._id)}
                            >
                                Publish
                            </button>
                        )}

                        {tournament.status === "published" && (
                            <span className="published-label">Published</span>
                        )}
                    </div>

                </div>
            ))}
        </div>

    )

}

export default PublishTournament