import { Room, Meter } from "@/shared/";

// Create a union type for measurements display
type DisplayData = {
    primaryValue: number;
    primaryUnit: string;
    secondaryValue?: number;
    secondaryUnit?: string;
};


// Helper function to transform Room data into DisplayData
export const roomToDisplayData = (room: Room): DisplayData => ({
    primaryValue: room.measurements.temperature,
    primaryUnit: "°C",
    secondaryValue: room.measurements.humidity,
    secondaryUnit: "% RH",
});

// Helper function to transform Meter data into DisplayData
export const meterToDisplayData = (meter: Meter): DisplayData => ({
    primaryValue: meter.measurements.currentConsumption,
    primaryUnit: "kW",
    secondaryValue: meter.cost.today,
    secondaryUnit: "€",
});