import { Search } from "lucide-react";
import style from "./home.module.css";
import { useState } from "react";
const Home = () => {
  const [input, setInput] = useState("");

  function handleSubmit() {}
  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex. Bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <Search />
        </button>
      </form>
    </main>
  );
};

export default Home;
