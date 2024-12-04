import { useParams } from "react-router";

export const BuildingPage = () => {
	const { buildingId } = useParams();

	return <>Building id: {buildingId}</>;
};
