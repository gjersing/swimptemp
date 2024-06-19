import { Alert, Divider, Text } from "@mantine/core";
import "./ResultCard.css";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";

export type ResultCardParams = {
  values: {
    air: number;
    water: number;
    wind: boolean;
    rain: boolean;
  };
};

type colors = "red" | "yellow" | "green";

function ResultCard(props: ResultCardParams) {
  const safeTemp = props.values.wind || props.values.rain ? 75 : 70;
  const dangerousTemp = props.values.wind || props.values.rain ? 65 : 60;

  const getResultColor = () => {
    if (props.values.water <= dangerousTemp) {
      return "red";
    }
    if (props.values.water <= safeTemp) {
      return "yellow";
    }
    return "green";
  };
  const resultColor = getResultColor();

  const alertClassname = `result-alert ${resultColor}`;

  const colorToAlertMap = (color: colors) => {
    switch (color) {
      case "green":
        return {
          icon: <IoCheckmarkCircleOutline fontSize={40} />,
          title: "All set!",
          message: "Temperatures are safe for you to enjoy a day on the water.",
          info: "Watch for  waters approaching 70°, where breath becomes difficult to control and hold.",
        };
      case "yellow":
        return {
          icon: <IoWarningOutline fontSize={40} />,
          title: "Warning!",
          message:
            "Breath control and cognitive function can be impaired at these temperatures.",
          info: "Wear a wet suit! Do not swim without adequate preparation.",
        };
      case "red":
        return {
          icon: <IoAlertCircleOutline fontSize={40} />,
          title: "Danger! Do not swim",
          message:
            "Immediately Life-threatening temperatures. Maximum intensity cold shock, gasping and hypothermia.",
          info: "Waters below 60° can and will kill! Paddle only if experienced and wearing a dry suit and life jacket.",
        };
    }
  };

  const alert = colorToAlertMap(resultColor);

  return (
    <div className="result-card">
      <Alert className={alertClassname}>
        <Text c={resultColor} size="32px" className="result-alert-title">
          {alert.icon}
          {alert.title}
        </Text>
        <Divider color={resultColor} my="1rem" />
        <Text>{alert.message}</Text>
        <Text>{alert.info}</Text>
      </Alert>
    </div>
  );
}

export default ResultCard;
