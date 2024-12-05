import {
  Breadcrumbs as MantineBreadCrumbs,
  Center,
  Loader,
  Grid,
  Text,
} from "@mantine/core";
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router";
import { Building, Meter, Room } from "../../shared/data/types";
import { sleep } from "../../shared/lib/sleep";
import BuildingData from "../../shared/data/buidlingsMock.json";
import styles from "./styles.module.css";
import { generateBuildingData } from "../../shared/data/generateBuildingData";
import { RoomCard } from "../../entities";
import { useDisclosure } from "@mantine/hooks";
import { DataModal } from "../../features";

export const BuildingPage = () => {
  const { buildingId } = useParams();
  const [building, setBuildings] = useState<Building | undefined>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [meters, setMeters] = useState<Meter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSourceType, setSelectedSourceType] = useState<
    "meter" | "room" | null
  >(null);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleCloseDataModal = useCallback(() => {
    close();
    setSelectedSourceId(null);
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
                setSelectedSourceId(item.id);
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
      <DataModal
        opened={opened}
        close={handleCloseDataModal}
        sourceType={selectedSourceType}
        sourceId={selectedSourceId}
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
