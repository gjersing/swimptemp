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

function Form() {
  const [active, setActive] = useState(0);

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
      <Stepper active={active}>
        <Stepper.Step label="Air Temperature">
          <Card>
            <Text mx="auto">{form.values.air}</Text>
            <Slider
              defaultValue={75}
              min={30}
              max={90}
              key={form.key("air")}
              {...form.getInputProps("air")}
            />
          </Card>
        </Stepper.Step>

        <Stepper.Step label="Water Temperature">
          <Card>
            <Text mx="auto">{form.values.water}</Text>
            <Slider
              defaultValue={75}
              min={30}
              max={90}
              key={form.key("water")}
              {...form.getInputProps("water")}
            />
          </Card>
        </Stepper.Step>

        <Stepper.Step label="Wind & Rain">
          <div className="checkbox-container">
            <div className="checkbox-card">
              <Checkbox
                radius="md"
                label="Winds >5 MPH?"
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
          <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="space-between" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && (
          <Button ml="auto" onClick={nextStep}>
            Next step
          </Button>
        )}
      </Group>
    </div>
  );
}

export default Form;
