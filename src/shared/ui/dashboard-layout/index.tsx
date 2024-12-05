import { Outlet } from "react-router";
import { LeftSidePanelPlaceholder } from "./LeftSidePanelPlaceholder";
import { Box, Flex, ScrollArea } from "@mantine/core";

export const DashboardLayout = () => {
  return (
    <Flex mah="100vh">
      <LeftSidePanelPlaceholder />
      <ScrollArea h="96vh" w="100%" offsetScrollbars my="2vh" mx="xs">
        <Box p="lg">
          <Outlet />
        </Box>
      </ScrollArea>
    </Flex>
  );
};
