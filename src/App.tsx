import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { BuildingsList, Home, BuildingPage, ExportPage } from "./pages";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
        headings: { fontFamily: "Inter, sans-serif" },
      }}
    >
      <ModalsProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/buildings" element={<BuildingsList />} />
            <Route path="/buildings/:buildingId" element={<BuildingPage />} />
            <Route path="/export" element={<ExportPage />} />
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
