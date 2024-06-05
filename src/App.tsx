import Form from "./components/Form/Form";
import "./App.css";
import Header from "./components/Header/Header";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <div className="app">
        <Header />
        <div className="content">
          <Form />
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
