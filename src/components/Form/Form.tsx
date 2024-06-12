import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Slider,
  Checkbox,
  Text,
  Card,
  Title,
  List,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "./Form.css";
import { WiCloud, WiCloudyGusts, WiRain, WiRainWind } from "react-icons/wi";
import { IoSunnyOutline, IoWaterOutline } from "react-icons/io5";
import ResultCard from "../ResultCard/ResultCard";

function Form() {
  const [active, setActive] = useState(0);

  const marks = [
    { value: 30, label: "< 30°" },
    { value: 60, label: "60°" },
    { value: 90, label: "> 90°" },
  ];

  const form = useForm({
    mode: "controlled",
    initialValues: {
      air: 60,
      water: 60,
      wind: true,
      rain: false,
    },
  });

  const tempText = (temp: number) => {
    return 30 < temp && temp < 90 ? `${temp}°` : 30 < temp ? ">90°" : "<30°";
  };

  const waterText = tempText(form.values.water);
  const airText = tempText(form.values.air);

  const nextStep = () =>
    setActive((current) => {
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="form-container">
      <Stepper
        active={active}
        onStepClick={setActive}
        iconSize={48}
        color="#386ed3"
      >
        <Stepper.Step
          icon={<IoSunnyOutline fontSize={28} />}
          completedIcon={<IoSunnyOutline fontSize={28} />}
          title="Air Temperature (F°)"
        >
          <Card className="temp-card">
            <Title size="h3" mx="auto" className="temperature-header">
              Air Temperature (F°)
            </Title>
            <div className="temperature-icon">
              <IoSunnyOutline fontSize={128} className="sun-icon" />
              <Text className="air-text">{airText}</Text>
            </div>
            <Slider
              defaultValue={60}
              min={30}
              max={90}
              key={form.key("air")}
              {...form.getInputProps("air")}
              marks={marks}
              color="#0040b6"
            />
          </Card>
        </Stepper.Step>

        <Stepper.Step
          icon={<IoWaterOutline fontSize={26} />}
          completedIcon={<IoWaterOutline fontSize={26} />}
          title="Water Temperature (F°)"
        >
          <Card className="temp-card">
            <Title size="h3" mx="auto" className="temperature-header">
              Water Temperature (F°)
            </Title>
            <div className="temperature-icon">
              <IoWaterOutline fontSize={80} className="water-icon" />
              <Text className="water-text">{waterText}</Text>
            </div>
            <Slider
              defaultValue={60}
              min={30}
              max={90}
              key={form.key("water")}
              {...form.getInputProps("water")}
              marks={marks}
              color="#0040b6"
            />
          </Card>
        </Stepper.Step>

        <Stepper.Step
          icon={<WiRainWind fontSize={32} />}
          completedIcon={<WiRainWind fontSize={32} />}
          title="Wind and Rain?"
        >
          <div className="checkbox-container">
            <div className="checkbox-card">
              <div className="checkbox-title">
                <Title order={4} className="wind-header title-header">
                  Wind?
                </Title>
                <Checkbox
                  key={form.key("wind")}
                  {...form.getInputProps("wind", { type: "checkbox" })}
                  color="#0040b6"
                />
              </div>
              {form.values.wind ? (
                <WiCloudyGusts
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ wind: !form.getValues().wind });
                  }}
                  color="#002466"
                />
              ) : (
                <WiCloud
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ wind: !form.getValues().wind });
                  }}
                  color="#002466"
                />
              )}
            </div>
            <div className="checkbox-card">
              <div className="checkbox-title">
                <Title order={4} className="rain-header title-header">
                  Rain?
                </Title>
                <Checkbox
                  key={form.key("rain")}
                  {...form.getInputProps("rain", { type: "checkbox" })}
                  color="#0040b6"
                />
              </div>
              {form.values.rain ? (
                <WiRain
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ rain: !form.values.rain });
                  }}
                  color="#002466"
                />
              ) : (
                <WiCloud
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ rain: !form.values.rain });
                  }}
                  color="#002466"
                />
              )}
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <ResultCard values={form.getValues()} />
        </Stepper.Completed>
      </Stepper>

      <Group justify="space-around" mt="lg" maw="400px" mx="auto">
        <Button
          variant="default"
          w={100}
          onClick={prevStep}
          disabled={active === 0}
          style={{ visibility: active === 0 ? "hidden" : "visible" }}
        >
          {"<"}
        </Button>
        <Button
          w={100}
          onClick={nextStep}
          color="#386ed3"
          disabled={active === 3}
          style={{ visibility: active === 3 ? "hidden" : "visible" }}
        >
          {">"}
        </Button>
      </Group>
      <Card className="info-card" mt={20} mx="auto" maw="420px">
        <Text mb={2} size="sm">
          <Text size="lg" fw={600} span mr={5}>
            More Information
          </Text>
          <Text span className="info-icons">
            <Text span className="temp-icon">
              (<IoSunnyOutline /> {form.values.air}°
            </Text>
            <Text span className="temp-icon">
              <IoWaterOutline /> {form.values.water}°)
            </Text>
          </Text>
        </Text>
        <List withPadding>
          <List.Item>{form.values.wind ? "Wind" : "No Wind"}</List.Item>
          <List.Item>{form.values.rain ? "Rain" : "No Rain"}</List.Item>
        </List>
      </Card>
    </div>
  );
}

export default Form;
