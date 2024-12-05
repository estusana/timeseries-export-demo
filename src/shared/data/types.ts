type BuildingStatus = 'operational' | 'maintenance' | 'alert' | 'offline' | 'construction';

type BuildingType = 'academic' | 'research' | 'laboratory' | 'infrastructure' | 'office' | 'residential' | 'administrative' | 'sports' | 'medical' | 'utility';

type Campus = 'North Campus' | 'South Campus' | 'Downtown Campus' | 'Research Park' | 'Manufacturing Zone' | 'Medical District' | 'Sports Complex' | 'Student Housing Area';

interface BuildingStats {
    rooms: number;
    meters: number;
    totalArea: number;
    floors: number;
}

interface MaintenanceInfo {
    scheduled: string;  // ISO date string
    type: string;
}

export interface Building {
    id: string;
    name: string;
    campus: Campus;
    type: BuildingType;
    stats: BuildingStats;
    status: BuildingStatus;
    maintenance?: MaintenanceInfo;
    lastUpdated: string;  // ISO date string
}

export interface BuildingsResponse {
    buildings: Building[];
    metadata: {
        totalBuildings: number;
        lastUpdated: string;  // ISO date string
        statusTypes: BuildingStatus[];
    }
}

export interface Room {
    id: string;
    name: string;
    measurements: {
        temperature: number;
        humidity: number;
    };
    lastUpdated: string;
}

export interface Meter {
    id: string;
    name: string;
    measurements: {
        currentConsumption: number;
    };
    cost: {
        today: number;
    };
    lastUpdated: string;
}