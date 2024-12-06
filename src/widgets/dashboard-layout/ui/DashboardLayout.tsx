import { LeftSidePanelPlaceholder } from "./LeftSidePanelPlaceholder";
import { Box, Flex, ScrollArea } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router";
import type { BreadcrumbItem } from "@/shared";
import { Breadcrumbs } from "@/shared";
import styles from "./DashboardLayout.module.css";

interface Props {
  children: ReactNode;
  breadCrumbItems: BreadcrumbItem[];
}

export const DashboardLayout = ({ children, breadCrumbItems }: Props) => {
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
      <div className={styles.content}>
        <Breadcrumbs items={breadCrumbItems} />
        <ScrollArea h="calc(100% - 72px)" offsetScrollbars mr="xs">
          <Box p="lg">{children}</Box>
        </ScrollArea>
      </div>
    </Flex>
  );
};
