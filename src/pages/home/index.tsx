import { Search } from "lucide-react";
import style from "./home.module.css";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<coinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  interface coinProps {
    id: string;
    name: string;
    changePercent24Hr: string;
    marketCapUsd: string;
    maxSupply: string;
    priceUsd: string;
    supply: string;
    symbol: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
    formattedPrice?: string;
    formattedVolume?: string;
    formattedMarket?: string;
  }

  interface dataProps {
    data: coinProps[];
  }

  useEffect(() => {
    getData();
  }, [offset]);
  function getData() {
    fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`).then(
      (response) =>
        response.json().then((data: dataProps) => {
          const coinsData = data.data;

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          });

          const priceComapct = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
          });

          const resultFormattedData = coinsData.map((item) => {
            const formatted = {
              ...item,
              formattedPrice: price.format(Number(item.priceUsd)),
              formattedVolume: priceComapct.format(Number(item.volumeUsd24Hr)),
              formattedMarket: priceComapct.format(Number(item.marketCapUsd)),
            };
            return formatted;
          });
          const listCoins = [...coins, ...resultFormattedData];
          setCoins(listCoins);
        })
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(`/detail/${input}`);
  }
  function updateOffset() {
    setOffset(offset + 10);
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
          {coins.map((item) => (
            <tr className={style.tr} key={item.id}>
              <td className={style.tdLabel} data-label="Moeda">
                <div className={style.name}>
                  <img
                    className={style.logo}
                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`}
                    alt="Logo Moeda"
                  />
                  <Link to={`/detail/${item.id}`}>
                    <span>
                      {item.name} | {item.symbol}
                    </span>
                  </Link>
                </div>
              </td>
              <td className={style.tdLabel} data-label="Valor Mercado">
                <span>{item.formattedMarket}</span>
              </td>
              <td className={style.tdLabel} data-label="Preço">
                <span> {item.formattedPrice}</span>
              </td>
              <td className={style.tdLabel} data-label="Volume">
                <span>{item.formattedVolume}</span>
              </td>
              <td
                className={
                  Number(item.changePercent24Hr) > 0
                    ? style.tdProfit
                    : style.tdLoss
                }
                data-label="Mudança 24h"
              >
                <span>{Number(item.changePercent24Hr).toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={style.buttonMore} onClick={updateOffset}>
        Carregar Mais
      </button>
    </main>
  );
};

export default Home;
