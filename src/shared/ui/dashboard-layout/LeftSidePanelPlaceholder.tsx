import { Stack, Tooltip, Flex, Avatar } from "@mantine/core";
import {
  Icon,
  IconAdjustmentsAlt,
  IconApps,
  IconBuildingSkyscraper,
  IconCloudDataConnection,
  IconMenu,
  IconProps,
  IconReport,
} from "@tabler/icons-react";
import { Link } from "react-router";

interface MenuItemProps {
  data: {
    label: string;
    Icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<Icon>
    >;
    isActive?: boolean;
    url?: string;
  };
}

const menuPlaceholderItems = [
  { label: "Menu", Icon: IconMenu },
  {
    label: "Buildings",
    Icon: IconBuildingSkyscraper,
    isActive: true,
    url: "/buildings",
  },
  { label: "Integrations", Icon: IconCloudDataConnection },
  { label: "Reports", Icon: IconReport },
  { label: "Apps", Icon: IconApps },
  { label: "Settings", Icon: IconAdjustmentsAlt },
];

export const LeftSidePanelPlaceholder = () => {
  return (
    <Flex
      direction="column"
      justify={"space-between"}
      w="58px"
      miw="58px"
      bg="#D4F4FF"
      h="100vh"
      align="center"
    >
      <Stack gap="0" w="100%">
        {menuPlaceholderItems.map((item) => (
          <MenuItem data={item} key={item.label} />
        ))}
      </Stack>
      <UserAccount />
    </Flex>
  );
};

const MenuItem = ({ data }: MenuItemProps) => {
  const { label, Icon, url, isActive } = data;
  return (
    <Tooltip label={label} withArrow position="right">
      <Link to={url ?? "/"}>
        <Flex
          bg={isActive ? "#55CFFC" : "transparent"}
          w="100%"
          py="md"
          justify="center"
          align={"center"}
          style={{ cursor: "pointer" }}
        >
          <Icon size={"24"} color={isActive ? "#fff" : "#354052"} />
        </Flex>
      </Link>
    </Tooltip>
  );
};

const UserAccount = () => {
  return (
    <Tooltip label={"Account"} withArrow position="right">
      <Avatar
        src="/userpic.jpg"
        size={32}
        my="lg"
        style={{ cursor: "pointer" }}
      />
    </Tooltip>
  );
};
