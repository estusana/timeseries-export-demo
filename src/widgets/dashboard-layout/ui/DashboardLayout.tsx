import { LeftSidePanelPlaceholder } from "./LeftSidePanelPlaceholder";
import { Box, Center, Flex, Loader, ScrollArea } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router";
import type { BreadcrumbItem } from "@/shared";
import { Breadcrumbs } from "@/shared";
import styles from "./DashboardLayout.module.css";

interface Props {
  children: ReactNode;
  breadCrumbItems: BreadcrumbItem[];
  loading?: boolean;
}

export const DashboardLayout = ({
  children,
  breadCrumbItems,
  loading = false,
}: Props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return (
    <Flex h="100vh">
      <LeftSidePanelPlaceholder />
      {loading ? (
        <Center h="" w="100%">
          <Loader />
        </Center>
      ) : (
        <div className={styles.content}>
          <Breadcrumbs items={breadCrumbItems} />
          <ScrollArea h="calc(100% - 72px)" miw="100%" offsetScrollbars mr="xs">
            <Box p="lg" w="100%">
              {children}
            </Box>
          </ScrollArea>
        </div>
      )}
    </Flex>
  );
};
