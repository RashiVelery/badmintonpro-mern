import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router"
import '../style/globel.css'

function CreateTournament() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        category: "",
        courts: "",
        location: "",
        price: "",
        image: "",
        time: "",
        slots: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            await API.post("/tournament/create", formData, {
                withCredentials: true
            })

            alert("Tournament created successfully")

            navigate("/admin")

        } catch (err) {
            alert("Error creating tournament")
        }

    }

    return (

        <div className="create-container">

            <h2>Create Tournament</h2>

            <form onSubmit={handleSubmit} className="create-form">

                <input
                    type="text"
                    name="name"
                    placeholder="Tournament Name"
                    onChange={handleChange}
                    required
                />

                <select name="type" onChange={handleChange} required className="type-selection">
                    <option value="">Select Type</option>
                    <option value="knockout">Knockout</option>
                    <option value="league">League</option>
                    <option value="round-robin">Round Robin</option>
                </select>

                <select name="category" onChange={handleChange}
                    required  className="category-selection">
                    <option value="">Category</option>
                    <option value="singles">Singles</option>
                    <option value="doubles">Doubles</option>
                    <option value="mixed-doubles">Mixed Doubles</option>
                </select>

                <input
                    type="number"
                    name="courts"
                    placeholder="Number of Courts"
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Entry Fee"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                    required
                />

                <input
                    type="datetime-local"
                    name="time"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="slots"
                    placeholder="Available Slots"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Tournament</button>

            </form>

        </div>

    )

}

export default CreateTournament