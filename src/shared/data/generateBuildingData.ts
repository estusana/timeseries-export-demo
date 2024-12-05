import { Building, Meter, Room } from "./types";

interface BuildingData {
    rooms: Room[];
    meters: Meter[];
}

const SPECIAL_ROOM_NAMES = [
    { name: 'Executive Suite', suffix: 'EX' },
    { name: 'Server Room', suffix: 'SR' },
    { name: 'Conference Hall', suffix: 'CH' },
    { name: 'Data Center', suffix: 'DC' },
    { name: 'Research Lab', suffix: 'RL' },
    { name: 'Storage Area', suffix: 'SA' },
    { name: 'Control Room', suffix: 'CR' },
    { name: 'Meeting Room', suffix: 'MR' },
    { name: 'Training Center', suffix: 'TC' },
    { name: 'Break Room', suffix: 'BR' },
    { name: 'Security Office', suffix: 'SO' },
    { name: 'IT Support', suffix: 'IT' },
];

const SPECIAL_METER_NAMES = [
    { name: 'Main Supply', suffix: 'MS' },
    { name: 'Data Center Power', suffix: 'DC' },
    { name: 'Primary Distribution', suffix: 'PD' },
    { name: 'Secondary Supply', suffix: 'SS' },
    { name: 'Emergency Power', suffix: 'EP' },
    { name: 'HVAC System', suffix: 'HV' },
    { name: 'Laboratory Equipment', suffix: 'LE' },
    { name: 'Lighting Circuit', suffix: 'LC' },
    { name: 'Server Farm', suffix: 'SF' },
    { name: 'Backup Systems', suffix: 'BS' },
];

const randomInRange = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const getRecentTimestamp = (): string => {
    const minutesAgo = randomInRange(1, 30);
    return `${minutesAgo} minutes ago`;
};

const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const generateMockRooms = (buildingId: string, roomCount: number): Room[] => {
    const rooms: Room[] = [];

    // Determine how many special names to use (20-30% of rooms)
    const specialNameCount = Math.min(
        Math.floor(roomCount * (randomInRange(20, 30) / 100)),
        SPECIAL_ROOM_NAMES.length
    );

    // Get random special names
    const selectedSpecialNames = shuffleArray(SPECIAL_ROOM_NAMES).slice(0, specialNameCount);

    // Generate rooms with special names first
    selectedSpecialNames.forEach((specialName, index) => {
        const roomNumber = (index + 1).toString().padStart(3, '0');
        rooms.push({
            id: `${buildingId}-${specialName.suffix}-${roomNumber}`,
            name: `${specialName.name} ${roomNumber}`,
            measurements: {
                temperature: randomInRange(185, 245) / 10,
                humidity: randomInRange(35, 55),
            },
            lastUpdated: getRecentTimestamp()
        });
    });

    // Fill the rest with standard numbered rooms
    for (let i = selectedSpecialNames.length + 1; i <= roomCount; i++) {
        const roomNumber = i.toString().padStart(3, '0');
        rooms.push({
            id: `${buildingId}-RM-${roomNumber}`,
            name: `Room ${roomNumber}`,
            measurements: {
                temperature: randomInRange(185, 245) / 10,
                humidity: randomInRange(35, 55),
            },
            lastUpdated: getRecentTimestamp()
        });
    }

    return rooms;
};

const generateMockMeters = (buildingId: string, meterCount: number): Meter[] => {
    const meters: Meter[] = [];

    // Determine how many special names to use (30-40% of meters)
    const specialNameCount = Math.min(
        Math.floor(meterCount * (randomInRange(30, 40) / 100)),
        SPECIAL_METER_NAMES.length
    );

    // Get random special names
    const selectedSpecialNames = shuffleArray(SPECIAL_METER_NAMES).slice(0, specialNameCount);

    // Generate meters with special names first
    selectedSpecialNames.forEach((specialName, index) => {
        const meterNumber = (index + 1).toString().padStart(3, '0');
        meters.push({
            id: `${buildingId}-${specialName.suffix}-${meterNumber}`,
            name: `${specialName.name} ${meterNumber}`,
            measurements: {
                currentConsumption: randomInRange(200, 300),
            },
            cost: {
                today: randomInRange(300, 400)
            },
            lastUpdated: getRecentTimestamp()
        });
    });

    // Fill the rest with standard numbered meters
    for (let i = selectedSpecialNames.length + 1; i <= meterCount; i++) {
        const meterNumber = i.toString().padStart(3, '0');
        meters.push({
            id: `${buildingId}-EL-${meterNumber}`,
            name: `Meter ${meterNumber}`,
            measurements: {
                currentConsumption: randomInRange(200, 300),
            },
            cost: {
                today: randomInRange(300, 400)
            },
            lastUpdated: getRecentTimestamp()
        });
    }

    return meters;
};

const generateBuildingData = (building: Building | undefined): BuildingData | null => {
    if (!building) return null;

    return {
        rooms: generateMockRooms(building.id, building.stats.rooms),
        meters: generateMockMeters(building.id, building.stats.meters)
    };
};

export {
    generateBuildingData,
};