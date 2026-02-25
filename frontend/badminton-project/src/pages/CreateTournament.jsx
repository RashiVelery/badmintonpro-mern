import { useState } from "react";
import API from "../services/api";

export default function CreateTournament() {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    await API.post("/tournament/create", {
      name,
      type: "knockout",
      category: "singles",
      courts: 2,
      rules: {
        pointsPerGame: 21,
        bestOf: 3,
      },
    });

    alert("Tournament created");
  };

  return (
    <div>
      <h2>Create Tournament</h2>
      <input
        placeholder="Tournament Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}