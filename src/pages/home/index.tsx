import { Search } from "lucide-react";
import style from "./home.module.css";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(`/detail/${input}`);
  }
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
      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor Mercado </th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          <tr className={style.tr}>
            <td className={style.tdLabel} data-label="Moeda">
              <div className={style.name}>
                <Link to="/detail/bitcoint">Bitcoin | BTC</Link>
              </div>
            </td>
            <td className={style.tdLabel} data-label="Valor Mercado">
              1T
            </td>
            <td className={style.tdLabel} data-label="Preço">
              8.000
            </td>
            <td className={style.tdLabel} data-label="Volume">
              2B
            </td>
            <td className={style.tdLoss} data-label="Mudança 24h">
              -0,20
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default Home;
