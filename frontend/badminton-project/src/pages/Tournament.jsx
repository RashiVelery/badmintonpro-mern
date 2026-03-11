import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/globel.css'

import { useState } from 'react';
import { useEffect } from 'react';
import API from '../services/api';
import TournamentCard from '../components/TournamentCard';
import { VscSettings } from "react-icons/vsc";




function Tournament() {
    const [tournaments, setTournaments] = useState([]);

    const [filter, setFilter] = useState('all');
    const [showFilter, setShowFilter] = useState(false);

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

    const filterTournaments = tournaments.filter((t) => {
        if (filter === 'all') return true;
        return t.status === filter
    })
    return (
        <>
            <div className="filter-container">

                <div className="filter-header">
                    <div className="filter-title" onClick={()=> setShowFilter(!showFilter)}>
                        <VscSettings className="filter-icon" />
                        <span>Filters</span>
                    </div>

                    <span className="clear-btn" onClick={() => setFilter("all")}>
                        Clear all
                    </span>
                </div>

                {showFilter && (
                    <div className="filter-buttons">

                        <button
                            className={filter === "all" ? "active-filter" : ""}
                            onClick={() => setFilter("all")}
                        >
                            All
                        </button>

                        <button
                            className={filter === "published" ? "active-filter" : ""}
                            onClick={() => setFilter("published")}
                        >
                            Published
                        </button>

                        <button
                            className={filter === "ongoing" ? "active-filter" : ""}
                            onClick={() => setFilter("ongoing")}
                        >
                            Ongoing
                        </button>

                        <button
                            className={filter === "completed" ? "active-filter" : ""}
                            onClick={() => setFilter("completed")}
                        >
                            Completed
                        </button>

                    </div>
                )}

            </div>

            <div>
                {filterTournaments.map((t) => (
                    <TournamentCard key={t._id} tournament={t} />
                ))}

            </div>


        </>
    )
}

export default Tournament
