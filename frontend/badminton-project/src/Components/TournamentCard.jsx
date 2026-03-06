import React from 'react'
import '../style/globel.css'
import { FaLocationDot } from "react-icons/fa6";
import { MdCalendarMonth } from "react-icons/md";
import { useNavigate } from 'react-router'

function TournamentCard({ tournament }) {
    const navigate = useNavigate();

    const handleRegister = (tournament) =>{
        if(tournament.status !== 'published'){
            alert("You can't register for this tournament!!!")
            return;
        }

        navigate(`/register/${tournament._id}`)
    }
    return (
        <div>
            <div className='cards'>
                <div className='cards-image'>
                    <img src={tournament.image} alt={tournament.name} />
                </div>
                <div className='cards-text'>
                    <div className='cardsText-left'>
                        <h5>{tournament.name}</h5>
                        <div className='tournament-details'>
                            <p><FaLocationDot /> {tournament.location}</p>
                            <p> <MdCalendarMonth /> Sheduled Date:{new Date(tournament.time).toLocaleDateString()} </p>
                            <p>Category: {tournament.category}</p>
                            <p>Price: {tournament.price} /-</p>
                            <p>Status: {tournament.status}</p>
                        </div>
                    </div>

                    <button className='cardsText-right' onClick={()=>handleRegister(tournament)}>Register</button>

                </div>
            </div>
        </div>
    )
}

export default TournamentCard
