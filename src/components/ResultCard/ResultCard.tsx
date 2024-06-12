import { Alert, Card, List, Text } from "@mantine/core";
import "./ResultCard.css";
import { IoSunnyOutline, IoWaterOutline } from "react-icons/io5";

export type ResultCardParams = {
  values: {
    air: number;
    water: number;
    wind: boolean;
    rain: boolean;
  };
};

function ResultCard(props: ResultCardParams) {
  const getResultColor = () => {
    if (
      props.values.water < 50 ||
      (props.values.water < 60 && props.values.wind && props.values.rain)
    ) {
      return "red";
    }
    if (
      props.values.water < 60 ||
      (props.values.water < 70 && props.values.wind && props.values.rain)
    ) {
      return "yellow";
    }
    return "green";
  };
  const resultColor = getResultColor();

  const alertClassname = `result-alert ${resultColor}`;

  return (
    <div className="result-card">
      <Alert className={alertClassname}>
        <Text c={resultColor}>Water Temperature: {props.values.water}°</Text>
      </Alert>
      <Card className="info-card">
        <Text mb={2} size="sm">
          <Text size="lg" fw={600} span mr={5}>
            More Information
          </Text>
          <Text span className="info-icons">
            <Text span className="temp-icon">
              (<IoSunnyOutline /> {props.values.air}°
            </Text>
            <Text span className="temp-icon">
              <IoWaterOutline /> {props.values.water}°)
            </Text>
          </Text>
        </Text>
        <List withPadding>
          <List.Item>{props.values.wind ? "Wind" : "No Wind"}</List.Item>
          <List.Item>{props.values.rain ? "Rain" : "No Rain"}</List.Item>
        </List>
      </Card>
    </div>
  );
}

export default ResultCard;
