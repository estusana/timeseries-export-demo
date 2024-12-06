import { Grid } from "@mantine/core";
import { BuildingCard } from "@/entities";
import { useEffect, useState } from "react";
import { sleep } from "@/shared/";
import { DashboardLayout as Layout } from "@/widgets";
import type { BreadcrumbItem, Building } from "@/shared/";
import BuildingData from "@/shared/data/buidlingsMock.json";

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

  const breadCrumbItems: BreadcrumbItem[] = [
    {
      label: "Buildings",
    },
  ];

  return (
    <Layout breadCrumbItems={breadCrumbItems}>
      <Grid gutter={{ base: "xs", xs: "md", md: "xl", xl: 30 }}>
        {buildings.map((data) => (
          <Grid.Col key={data.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <BuildingCard {...data} />
          </Grid.Col>
        ))}
      </Grid>
    </Layout>
  );
};
