import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import API from '../services/api';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import '../style/register.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Payment Form Component
function PaymentForm({ tournament, formData, id }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Step 1: Create payment intent
            const res = await API.post('/payment/create-order', {
                amount: tournament.price
            }, { withCredentials: true });

            const { clientSecret } = res.data;

            // Step 2: Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: formData.playerName,
                        phone: formData.phone,
                    },
                },
            });

            if (result.error) {
                alert(result.error.message);
                setLoading(false);
                return;
            }

            if (result.paymentIntent.status === 'succeeded') {
                // Step 3: Save registration
                await API.post('/registration/register', {
                    tournamentId: id,
                    ...formData,
                    paymentId: result.paymentIntent.id,
                    paymentStatus: 'paid'
                }, { withCredentials: true });

                alert('Payment & Registration Successful! 🎉');
                navigate('/tournaments');
            }

        } catch (error) {
            console.log("Error Details:", error.response?.data); // ഇത് കൺസോളിൽ നോക്കുക
            if (error.response?.status === 401) {
                alert('Please login first!');
                navigate('/login');
            } else {
                // ബാക്ക് എൻഡിൽ നിന്നുള്ള മെസേജ് കാണിക്കാൻ ഇത് സഹായിക്കും
                alert(error.response?.data?.message || 'Payment failed. Try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='card-element-container' aria-relevant="all">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#333',
                        }
                    }
                }} />
            </div>
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : `Pay ₹${tournament?.price} & Register`}
            </button>
        </form>
    );
}

// Main Register Component
function Register() {
    const { id } = useParams();
    const [tournament, setTournament] = useState({});
    const [formData, setFormData] = useState({
        playerName: '',
        phone: ''
    });

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const res = await API.get(`/tournament/${id}`);
                setTournament(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTournament();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!tournament) return <p>Loading...</p>;

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
                            <p>₹{tournament?.price}</p>
                        </div>
                    </div>
                </div>

                <div className="register-form">
                    <h3>Player Registration</h3>

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

                    {/* Stripe Payment */}
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            tournament={tournament}
                            formData={formData}
                            id={id}
                        />
                    </Elements>
                </div>

            </div>
        </div>
    );
}

export default Register;