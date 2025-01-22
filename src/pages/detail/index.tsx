import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./detail.module.css";

const Detail = () => {
  const { cripto } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<coinsProps>();

  interface coinsProps {
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

  interface responseData {
    data: coinsProps;
  }
  interface errorProps {
    error: string;
  }

  type DataCoins = responseData | errorProps;

  useEffect(() => {
    async function getCripto() {
      try {
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
          .then((Response) => Response.json())
          .then((data: DataCoins) => {
            if ("error" in data) {
              navigate("/");
              return;
            }
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
            console.log(coinsData);

            const resultData = {
              ...coinsData,
              formattedPrice: price.format(Number(coinsData.priceUsd)),
              formattedVolume: priceComapct.format(
                Number(coinsData.volumeUsd24Hr)
              ),
              formattedMarket: priceComapct.format(
                Number(coinsData.marketCapUsd)
              ),
            };

            setCoin(resultData);
          });
      } catch {
        navigate("/");
      }
    }
    getCripto();
  }, [cripto]);

  return (
    <div className={style.container}>
      <h1 className={style.center}>{coin?.name}</h1>
      <h1 className={style.center}>{coin?.symbol}</h1>
      <section className={style.content}>
        <img
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLocaleLowerCase()}@2x.png`}
          alt="logo cripto"
          className={style.logo}
        />
        <h1>
          {coin?.name} | {coin?.symbol}
        </h1>
        <p>
          <strong>Preço: </strong> {coin?.formattedPrice}
        </p>
        <p>
          <strong>Mercado: </strong> {coin?.formattedMarket}
        </p>

        <p>
          <strong>Volume: </strong> {coin?.formattedVolume}
        </p>

        <p>
          <strong>Mudanças 24h: </strong>
          <span
            className={
              Number(coin?.changePercent24Hr) > 0 ? style.Profit : style.Loss
            }
          >
            {Number(coin?.changePercent24Hr).toFixed(2)}
          </span>
        </p>
      </section>
    </div>
  );
};

export default Detail;
