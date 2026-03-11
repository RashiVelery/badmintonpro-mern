import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import API from "../services/api"
import '../style/matches.css'

function Matches() {

    const { tournamentId } = useParams()
    const navigate = useNavigate()

    const [matches, setMatches] = useState([])

    useEffect(() => {

        fetchMatches()

    }, [])

    const fetchMatches = async () => {

        try {

            const res = await API.get(`/match/${tournamentId}`)
            setMatches(res.data)

        } catch (err) {

            console.log(err)

        }

    }

    return (

        <div className="matches-page">

            <h2>Matches</h2>

            {matches.length === 0 && <p>No matches yet</p>}

            {matches.map(match => (

                <div key={match._id} className="match-card">

                    <h3>
                        {match.teams.teamA?.name} vs {match.teams.teamB?.name}
                    </h3>

                    <p>
                        Score: {match.score.teamA} - {match.score.teamB}
                    </p>

                    <p>
                        Game: {match.currentGame}
                    </p>

                    <p>
                        Status: {match.status}
                    </p>

                    <button
                        onClick={() => navigate(`/admin/match/${match._id}`)}
                    >
                        Control Match
                    </button>

                </div>

            ))}

        </div>

    )

}

export default Matches