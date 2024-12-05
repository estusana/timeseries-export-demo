import { Grid } from "@mantine/core";
import { BuildingCard } from "../../entities";
import { useEffect, useState } from "react";
import { Building } from "../../shared/data/types";
import BuildingData from "../../shared/data/buidlingsMock.json";
import { sleep } from "../../shared/lib/sleep";

export const BuildingsList = () => {
  const [buildings, setBuildings] = useState<Array<Building>>([]);
  useEffect(() => {
    // mocking data fetch
    const initData = async () => {
      await sleep(100);
      setBuildings(BuildingData.buildings as Array<Building>);
    };

    initData();
  }, []);

  return (
    <>
      <Grid gutter={{ base: "xs", xs: "md", md: "xl", xl: 30 }}>
        {buildings.map((data) => (
          <Grid.Col key={data.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <BuildingCard {...data} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};
