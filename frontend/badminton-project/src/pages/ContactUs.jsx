import React from "react";
import "../style/contact.css";

function ContactUs() {
    return (
        <div className="contact-page">

            {/* Hero Section */}
            <div className="contact-hero">
                <img src="https://images.unsplash.com/photo-1617696618050-b0fef0c666af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h1>Contact Us</h1>
                <p>We would love to hear from you</p>
            </div>

            {/* Contact Container */}
            <div className="contact-container">

                {/* Contact Info */}
                <div className="contact-info">

                    <h2>Get In Touch</h2>

                    <p>
                        Have questions about tournaments or registrations?
                        Feel free to reach out to us.
                    </p>

                    <div className="contact-details">
                        <p><strong>Email:</strong> support@badmintonpro.com</p>
                        <p><strong>Phone:</strong> +91 9876543210</p>
                        <p><strong>Location:</strong> Kerala, India</p>
                    </div>

                </div>

                {/* Contact Form */}
                <form className="contact-form">

                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                    />

                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        required
                    ></textarea>

                    <button type="submit">
                        Send Message
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ContactUs;