import { Menu, Button } from "@mantine/core";
import { IconChevronDown, IconDownload } from "@tabler/icons-react";
import { ReactNode } from "react";

type MenuItem = {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
};

interface MenuButtonProps {
  items: MenuItem[];

  buttonTitle?: string;
  mainIcon?: ReactNode;
  rightIcon?: ReactNode;

  // Optional button props
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const MenuButton = ({
  items,
  buttonTitle = "Download",
  mainIcon = <IconDownload size={16} />,
  rightIcon = <IconChevronDown size={16} />,
  disabled = false,
  loading = false,
  className,
}: MenuButtonProps) => {
  return (
    <Menu>
      <Menu.Target>
        <Button
          leftSection={mainIcon}
          rightSection={rightIcon}
          disabled={disabled}
          loading={loading}
          className={className}
        >
          {buttonTitle}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((item, index) => (
          <Menu.Item key={index} leftSection={item.icon} onClick={item.onClick}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

// Usage example:
/*
const items = [
  {
    icon: <Icon123 size={16} />,
    label: "PDF Report",
    onClick: () => handleDownload("pdf")
  },
  {
    icon: <Icon123 size={16} />,
    label: "Image Export",
    onClick: () => handleDownload("image")
  },
  {
    icon: <Icon123 size={16} />,
    label: "Excel Table",
    onClick: () => handleDownload("excel")
  }
];

<MenuButton 
  items={items}
  buttonTitle="Export"
  mainIcon={<IconDownload size={16} />}
  disabled={isLoading}
/>
*/
