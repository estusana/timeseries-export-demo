import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from "@mantine/core";
import { BuildingsList, Home, BuildingPage } from "./pages";
import { DashboardLayout } from "./shared/ui";
import "@mantine/core/styles.css";

function App() {
	return (
		<MantineProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<DashboardLayout />}>
						<Route index element={<Home />} />
						<Route path="/buildings" element={<BuildingsList />} />
						<Route path="/buildings/:buildingId" element={<BuildingPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;
