import { useState, useEffect, useCallback } from "react";
import { Grid, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router";
import { sleep, Building, Meter, Room } from "@/shared";
import { DashboardLayout as Layout } from "@/widgets";
import BuildingData from "@/shared/data/buidlingsMock.json";
import { generateBuildingData } from "@/shared/data/generateBuildingData";
import { ExportModal } from "@/features";
import { MeterCard, RoomCard } from "@/entities/display-card";
import { BreadcrumbItem } from "@/shared/ui/breadcrumbs/ui/Breadcrumbs";

export const BuildingPage = () => {
  const { buildingId } = useParams();
  const [building, setBuildings] = useState<Building | undefined>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [meters, setMeters] = useState<Meter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSourceType, setSelectedSourceType] = useState<
    "meter" | "room" | null
  >(null);
  const [selectedSource, setSelectedSource] = useState<Room | Meter | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);

  const handleCloseExportModal = useCallback(() => {
    close();
    setSelectedSource(null);
    setSelectedSourceType(null);
  }, [close]);

  useEffect(() => {
    // mocking data fetch
    const initData = async () => {
      await sleep(350);
      const buildingData = BuildingData.buildings.find(
        (v) => v.id === buildingId
      );
      const { rooms = [], meters = [] } =
        generateBuildingData(buildingData as Building | undefined) || {};

      setBuildings(buildingData as Building);
      setRooms(rooms);
      setMeters(meters);
      setIsLoading(false);
    };

    initData();
  }, [buildingId]);

  const breadCrumbItems: BreadcrumbItem[] = [
    {
      label: "Buildings",
      link: "/buildings",
    },
    {
      label: building?.name || "",
      id: building?.id,
    },
  ];

  return (
    <Layout breadCrumbItems={breadCrumbItems} loading={isLoading}>
      <Tabs defaultValue="rooms">
        <Tabs.List mb="xl">
          <Tabs.Tab value="rooms" style={{ fontSize: "17px" }}>
            Rooms
          </Tabs.Tab>
          <Tabs.Tab value="meters" style={{ fontSize: "17px" }}>
            Meters
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="rooms">
          <Grid gutter={{ base: "xs", xs: "md", md: "xl", xl: 30 }}>
            {rooms.map((item) => (
              <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <RoomCard
                  room={item}
                  onBtnClick={() => {
                    setSelectedSourceType("room");
                    setSelectedSource(item);
                    open();
                  }}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="meters">
          <Grid gutter={{ base: "xs", xs: "md", md: "xl", xl: 30 }}>
            {meters.map((item) => (
              <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <MeterCard
                  meter={item}
                  onBtnClick={() => {
                    setSelectedSourceType("meter");
                    setSelectedSource(item);
                    open();
                  }}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Tabs.Panel>
      </Tabs>

      <ExportModal
        opened={opened}
        close={handleCloseExportModal}
        sourceType={selectedSourceType}
        source={selectedSource}
      />
    </Layout>
  );
};
