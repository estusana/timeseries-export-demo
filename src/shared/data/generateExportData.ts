import { Room, Meter, sleep } from "@/shared";

interface RoomReading {
    timestamp: string;
    temperature: number;
    humidity: number;
}

interface MeterReading {
    timestamp: string;
    currentConsumption: number;
    cost: number;
}

type ExportFormat = "CSV" | "JSON";
type SourceType = "room" | "meter";

interface ExportOptions {
    sourceType: SourceType;
    sourceId: string;
    dateRange: [Date, Date];
    format: ExportFormat;
}

function generateMockData(
    sourceType: SourceType,
    startDate: Date,
    endDate: Date,
    initialData: Room | Meter
): RoomReading[] | MeterReading[] {
    const data = [];
    const currentDate = new Date(startDate);

    if (sourceType === "room") {
        const room = initialData as Room;
        const baseTemp = room.measurements.temperature;
        const baseHumidity = room.measurements.humidity;

        while (currentDate <= endDate) {
            data.push({
                timestamp: currentDate.toISOString(),
                temperature: baseTemp + (Math.random() * 2 - 1), // ±1°C variation
                humidity: Math.min(Math.max(baseHumidity + (Math.random() * 10 - 5), 30), 70), // ±5% variation, capped at 30-70%
            });
            currentDate.setHours(currentDate.getHours() + 1);
        }
    } else {
        const meter = initialData as Meter;
        const baseConsumption = meter.measurements.currentConsumption;
        const baseCost = meter.cost.today / 24; // Rough hourly cost estimate

        while (currentDate <= endDate) {
            // Higher consumption during day hours (7-23)
            const hour = currentDate.getHours();
            const dayTimeMultiplier = (hour >= 7 && hour <= 23) ? 1.5 : 0.5;

            const hourlyConsumption = baseConsumption * dayTimeMultiplier * (0.8 + Math.random() * 0.4); // ±20% variation
            data.push({
                timestamp: currentDate.toISOString(),
                currentConsumption: hourlyConsumption,
                cost: hourlyConsumption * (baseCost / baseConsumption), // Maintain same kWh cost ratio
            });
            currentDate.setHours(currentDate.getHours() + 1);
        }
    }

    return data as RoomReading[] | MeterReading[];
}

export async function generateExportData({
    sourceType,
    sourceId,
    dateRange,
    format,
}: ExportOptions): Promise<string> {
    await sleep(2000);

    // Mock the initial data based on sourceType
    const mockInitialData = sourceType === "room"
        ? {
            id: sourceId,
            name: "Room",
            measurements: {
                temperature: 22,
                humidity: 45
            },
            lastUpdated: new Date().toISOString()
        } as Room
        : {
            id: sourceId,
            name: "Meter",
            measurements: {
                currentConsumption: 1.2
            },
            cost: {
                today: 24.5
            },
            lastUpdated: new Date().toISOString()
        } as Meter;

    const mockData = generateMockData(sourceType, dateRange[0], dateRange[1], mockInitialData);

    if (format === "JSON") {
        return JSON.stringify(mockData, null, 2);
    }

    const headers = sourceType === "room"
        ? ["Timestamp", "Temperature (°C)", "Humidity (%)"]
        : ["Timestamp", "Consumption (kWh)", "Cost (€)"];

    const rows = mockData.map(entry => {
        const timestamp = new Date(entry.timestamp).toLocaleString();
        if (sourceType === "room") {
            const roomEntry = entry as RoomReading;
            return [
                timestamp,
                roomEntry.temperature.toFixed(1),
                roomEntry.humidity.toFixed(1)
            ];
        } else {
            const meterEntry = entry as MeterReading;
            return [
                timestamp,
                meterEntry.currentConsumption.toFixed(2),
                meterEntry.cost.toFixed(2)
            ];
        }
    });

    return [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
}