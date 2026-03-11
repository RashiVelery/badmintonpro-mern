import React from 'react'
import '../style/about.css'

function About() {
    return (
        <div className='about-page'>
            <div className='comingSoon'>
                <img src="https://images.unsplash.com/photo-1661020812032-90582fe13ca6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <span>About Us</span>
                
            </div>
            <div className="about-section">
                <h2>Who We Are</h2>
                <p>
                    Badminton Pro is a platform designed to make badminton tournaments
                    easier to manage and participate in. Players can discover tournaments,
                    register for events, and track their performance. Organizers can
                    manage registrations, approve players, and generate matches
                    automatically.
                </p>
            </div>

            {/* Features */}
            <div className="about-section">
                <h2>Our Features</h2>

                <div className="features">

                    <div className="feature-card">
                        <h3>🏸 Discover Tournaments</h3>
                        <p>Find badminton tournaments happening near you.</p>
                    </div>

                    <div className="feature-card">
                        <h3>📝 Easy Registration</h3>
                        <p>Register for tournaments quickly and easily.</p>
                    </div>

                    <div className="feature-card">
                        <h3>⚡ Match Generation</h3>
                        <p>Admins can automatically generate match fixtures.</p>
                    </div>

                    <div className="feature-card">
                        <h3>📊 Player Statistics</h3>
                        <p>Track wins, losses and match performance.</p>
                    </div>

                </div>
            </div>

            {/* Mission */}
            <div className="about-section">
                <h2>Our Mission</h2>
                <p>  Our mission is to connect badminton players and tournament organizers
                    through a simple and powerful digital platform that makes tournament
                    management effortless.</p>
            </div>

            <div className="about-section contact">
                <h2>Contact Us</h2>
                <p>Email: support@badmintonpro.com</p>
                <p>Phone: +91 9876543210</p>
                <p>Location: India</p>
            </div>

        </div>
    )
}

export default About
