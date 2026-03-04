import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/globel.css'

import { useState } from 'react';
import { useEffect } from 'react';
import API from '../services/api';
import TournamentCard from '../Components/TournamentCard';



function Tournament() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await API.get('/tournament/published');

                setTournaments(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTournaments();
    }, []);
    return (
        <>
            
            <div>
                {tournaments.map((t) => (
                    <TournamentCard key={t.id} tournament={t} />
                ))}

            </div>


        </>
    )
}

export default Tournament
