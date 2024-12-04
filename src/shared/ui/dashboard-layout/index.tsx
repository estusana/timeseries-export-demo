import { Outlet } from "react-router";
import { LeftSidePanelPlaceholder } from "./LeftSidePanelPlaceholder";
import { Box, Flex } from "@mantine/core";

export const DashboardLayout = () => {
  return (
    <Flex>
      <LeftSidePanelPlaceholder />
      <Box p="lg">
        <Outlet />
      </Box>
    </Flex>
  );
};
