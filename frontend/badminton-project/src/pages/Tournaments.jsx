import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/tournament");
      setTournaments(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Tournaments</h2>
      {tournaments.map((t) => (
        <div key={t._id}>
          <h3>{t.name}</h3>
          <p>Status: {t.status}</p>
        </div>
      ))}
    </div>
  );
}