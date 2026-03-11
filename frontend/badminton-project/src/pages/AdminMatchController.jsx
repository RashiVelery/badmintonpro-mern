import { useEffect, useState } from "react"
import { useParams } from "react-router"
import API from "../services/api"
import '../style/adminmatchcontroller.css'

function AdminMatchControl() {

    const { id } = useParams()
    const [match, setMatch] = useState(null)

    useEffect(() => {

        fetchMatch()

    }, [])

    const fetchMatch = async () => {
        try {
            const res = await API.get(`/match/single/${id}`)
            setMatch(res.data)
        } catch (error) {
            console.log(error)
        }


    }

    const resume = async () => {

        try {

            await API.post(`/match/${id}/resume`)

            fetchMatch()

        } catch (err) {
            console.log(err)
        }

    }
    const addPoint = async (team) => {
        try {
            await API.post(`/match/${id}/score`, { team: team })
            fetchMatch()
        } catch (error) {
            console.log(error)
        }


    }

    const undo = async () => {

        await API.post(`/match/${id}/undo`)
        fetchMatch()

    }

    const redo = async () => {

        await API.post(`/match/${id}/redo`)
        fetchMatch()

    }

    if (!match || !match.teams) { return <h3>Loading...</h3> }

    return (

        <div className="scoreboard">

            <h2>
                {match.teams.teamA.name} vs {match.teams.teamB.name}
            </h2>

            <div className="scores">

                <div className="team">

                    <h3>{match.teams.teamA.name}</h3>

                    <div className="score">{match.score.teamA}</div>

                    <button onClick={() => addPoint("teamA")}>+</button>

                </div>

                <div className="team">

                    <h3>{match.teams.teamB.name}</h3>

                    <div className="score">{match.score.teamB}</div>

                    <button onClick={() => addPoint("teamB")}>+</button>

                </div>

            </div>

            <div className="game-info">

                <p>Game {match.currentGame}</p>

                <p>
                    Games Won :
                    {match.gamesWon.teamA} - {match.gamesWon.teamB}
                </p>

            </div>

            <div className="controls">

                <button onClick={undo}>Undo</button>

                <button onClick={redo}>Redo</button>

                <button onClick={resume}>Resume</button>


            </div>

        </div>

    )

}

export default AdminMatchControl