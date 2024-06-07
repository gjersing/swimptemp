import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Code,
  Slider,
  Checkbox,
  Text,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "./Form.css";
import { WiCloud, WiCloudyGusts, WiRain } from "react-icons/wi";
import { IoSunnyOutline, IoWaterOutline } from "react-icons/io5";

function Form() {
  const [active, setActive] = useState(0);

  const marks = [
    { value: 30, label: "< 30" },
    { value: 60, label: "60" },
    { value: 90, label: "> 90" },
  ];

  const form = useForm({
    mode: "controlled",
    initialValues: {
      air: 55,
      water: 55,
      wind: false,
      rain: false,
    },
  });

  const nextStep = () =>
    setActive((current) => {
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="form-container">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step>
          <Card className="temp-card">
            <div className="temperature-icon">
              <IoSunnyOutline fontSize={128} />
              <Text className="air-text">{form.values.air}</Text>
            </div>
            <Slider
              defaultValue={60}
              min={30}
              max={90}
              key={form.key("air")}
              {...form.getInputProps("air")}
              marks={marks}
            />
          </Card>
        </Stepper.Step>

        <Stepper.Step>
          <Card className="temp-card">
            <div className="temperature-icon">
              <IoWaterOutline fontSize={80} className="water-icon" />
              <Text className="water-text">{form.values.water}</Text>
            </div>
            <Slider
              defaultValue={60}
              min={30}
              max={90}
              key={form.key("water")}
              {...form.getInputProps("water")}
              marks={marks}
            />
          </Card>
        </Stepper.Step>

        <Stepper.Step>
          <div className="checkbox-container">
            <div className="checkbox-card">
              <Checkbox
                radius="md"
                label="Wind?"
                key={form.key("wind")}
                {...form.getInputProps("wind", { type: "checkbox" })}
              />
              {form.values.wind ? (
                <WiCloudyGusts
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ wind: !form.getValues().wind });
                  }}
                />
              ) : (
                <WiCloud
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ wind: !form.getValues().wind });
                  }}
                />
              )}
            </div>
            <div className="checkbox-card">
              <Checkbox
                radius="md"
                label="Rain?"
                key={form.key("rain")}
                {...form.getInputProps("rain", { type: "checkbox" })}
              />
              {form.values.rain ? (
                <WiRain
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ rain: !form.values.rain });
                  }}
                />
              ) : (
                <WiCloud
                  fontSize={128}
                  onClick={() => {
                    form.setValues({ rain: !form.values.rain });
                  }}
                />
              )}
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="lg">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="lg">
        {active !== 0 && (
          <Button variant="default" w={100} onClick={prevStep}>
            {"<"}
          </Button>
        )}
        {active !== 3 && (
          <Button w={100} onClick={nextStep}>
            {">"}
          </Button>
        )}
      </Group>
    </div>
  );
}

export default Form;
