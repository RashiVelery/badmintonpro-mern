import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import API from '../services/api'
function Register() {
    const { id } = useParams();
    const [tournament, setTournament] = useState({});

    const [formData, setFormData] = useState({
        playerName: '',
        phone: ''
    });

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await API.get(`/tournament/${id}`);
                setTournament(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTournaments();

    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/registration/register', {
                tournamentId: id,
                ...formData
            });
        } catch (error) {
            alert('Registration failed');
        }

        if (!tournament) return <p>Loading...</p>
    }

    return (
        <div className="register-page">
            <div className="register-card">

                <div className="tournament-section">

                    <img
                        src={tournament.image}
                        alt="tournament"
                        className="tournament-image"
                    />

                    <div className="tournament-details">
                        <h2>{tournament?.name}</h2>

                        <div className="detail">
                            <span>📍 Location:</span>
                            <p>{tournament?.location}</p>
                        </div>

                        <div className="detail">
                            <span>📅 Date:</span>
                            <p>{new Date(tournament?.time).toLocaleDateString()}</p>
                        </div>

                        <div className="detail">
                            <span>💰 Entry Fee:</span>
                            <p>${tournament?.price}</p>
                        </div>
                    </div>

                </div>

                <div className="register-form">

                    <h3>Player Registration</h3>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="playerName"
                            placeholder="Player Name"
                            value={formData.playerName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">
                            Register Now
                        </button>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default Register
