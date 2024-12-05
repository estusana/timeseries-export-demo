import { useState, useEffect, useCallback } from "react";
import {
  Breadcrumbs as MantineBreadCrumbs,
  Center,
  Loader,
  Grid,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useParams } from "react-router";
import { sleep, Building, Meter, Room } from "@/shared/";
import BuildingData from "@/shared/data/buidlingsMock.json";
import { generateBuildingData } from "@/shared/data/generateBuildingData";
import { RoomCard } from "@/entities";
import { ExportModal } from "@/features";
import styles from "./BuildingPage.module.css";

export const BuildingPage = () => {
  const { buildingId } = useParams();
  const [building, setBuildings] = useState<Building | undefined>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [meters, setMeters] = useState<Meter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSourceType, setSelectedSourceType] = useState<
    "meter" | "room" | null
  >(null);
  const [selectedSource, setSelectedSource] = useState<Room | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleCloseExportModal = useCallback(() => {
    close();
    setSelectedSource(null);
    setSelectedSourceType(null);
  }, [close]);

  useEffect(() => {
    // mocking data fetch
    const initData = async () => {
      await sleep(450);
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

  if (isLoading)
    return (
      <Center h="90vh">
        <Loader />
      </Center>
    );

  return (
    <>
      <Breadcrumbs {...building} />
      <Text>Rooms</Text>
      <Grid gutter={{ base: "xs", xs: "md", md: "xl", xl: 30 }}>
        {rooms.map((item) => (
          <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <RoomCard
              {...item}
              onBtnClick={() => {
                setSelectedSourceType("room");
                setSelectedSource(item);
                open();
              }}
            />
          </Grid.Col>
        ))}
      </Grid>

      <Text>Meters</Text>
      <Grid gutter={{ base: "xs", xs: "md", md: "xl", xl: 30 }}>
        {meters.map((item) => (
          <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            {/* <MeterCard {...item} /> */}
          </Grid.Col>
        ))}
      </Grid>
      <ExportModal
        opened={opened}
        close={handleCloseExportModal}
        sourceType={selectedSourceType}
        source={selectedSource}
      />
    </>
  );
};

const Breadcrumbs = ({ name, id }: Partial<Building>) => {
  if (!name || !id) return null;

  return (
    <MantineBreadCrumbs>
      <Link to={`/buildings/`} className={styles.breadcrumbItem}>
        Buildings
      </Link>
      <p className={styles.breadcrumbItem}>
        {name} ({id})
      </p>
    </MantineBreadCrumbs>
  );
};
