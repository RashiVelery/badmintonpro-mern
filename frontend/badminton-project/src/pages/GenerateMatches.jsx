import { useEffect, useState } from "react"
import API from "../services/api"
import "../style/generateMatches.css"
import { useNavigate } from "react-router";

function GenerateMatches() {
    const navigate = useNavigate()

    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        fetchTournaments()
    }, [])

    const fetchTournaments = async () => {

        const res = await API.get("/tournament")

        setTournaments(res.data)
    }

    const generate = async (id) => {

        try {

            await API.post(`/match/generate/${id}`)

            alert("Matches generated")
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong"

            alert(message)


        }
    }

    return (
        <div className="generate-container">

            <h2 className="page-title">Generate Matches</h2>

            {tournaments.map((tournament) => (

                <div key={tournament._id} className="generate-card">

                    <div className="tournament-info">

                        <h3>{tournament.name}</h3>

                        <p className="location">{tournament.location}</p>

                        <p className="slots">
                            Remaining Slots :
                            <span>{tournament.remainingSlots}</span>
                        </p>

                    </div>
                    <div className="button-group">
                        <button
                            className="generate-btn"
                            onClick={() => generate(tournament._id)}
                        >
                            Generate Matches
                        </button>
                        <button className="view-btn"
                            onClick={() => navigate(`/matches/${tournament._id}`)}
                        >
                            View Matches
                        </button>
                    </div>
                </div>

            ))}

        </div>
    )
}

export default GenerateMatches