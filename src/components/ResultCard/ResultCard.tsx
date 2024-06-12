import { Card } from "@mantine/core";
import "./ResultCard.css";

export type ResultCardParams = {
  values: {
    air: number;
    water: number;
    wind: boolean;
    rain: boolean;
  };
};

function ResultCard(props: ResultCardParams) {
  return <Card className="result-card">{props.values.air}</Card>;
}

export default ResultCard;
