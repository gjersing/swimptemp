import { useState } from "react";
import { Stepper, Button, Group, TextInput, Code } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./Form.css";

function Form() {
  const [active, setActive] = useState(0);

  const form = useForm({
    mode: "uncontrolled",
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
          <TextInput
            label="air"
            placeholder="air"
            key={form.key("air")}
            {...form.getInputProps("air")}
          />
        </Stepper.Step>

        <Stepper.Step label="Water Temperature">
          <TextInput
            label="water"
            placeholder="water"
            key={form.key("water")}
            {...form.getInputProps("water")}
          />
        </Stepper.Step>

        <Stepper.Step label="Wind & Rain">
          <TextInput
            label="wind"
            placeholder="wind"
            key={form.key("wind")}
            {...form.getInputProps("wind")}
          />
          <TextInput
            mt="md"
            label="rain"
            placeholder="rain"
            key={form.key("rain")}
            {...form.getInputProps("rain")}
          />
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
