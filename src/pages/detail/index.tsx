import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <h1>{cripto}</h1>
    </div>
  );
};

export default Detail;
