import { useEffect, useState } from "react";
import api from "../api/axios";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getHello = async () => {
      try {
        const { data } = await api.get("/users/hello");
        setMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    getHello();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">{message}</h1>
    </div>
  );
}

export default Home;
