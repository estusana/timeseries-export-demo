import { Button, Card, Text } from "@mantine/core";
import { Link } from "react-router";
import styles from "./DisplayCard.module.css";
import { meterToDisplayData, roomToDisplayData } from "../lib/utils";
import { Room, Meter } from "@/shared";

// Create a union type for measurements display
type DisplayData = {
  primaryValue: number;
  primaryUnit: string;
  secondaryValue?: number;
  secondaryUnit?: string;
};

// Props interface that handles both types
interface DisplayCardProps {
  id: string;
  name: string;
  lastUpdated: string;
  displayData: DisplayData;
  onBtnClick: () => void;
}

const DisplayCard = ({
  name,
  lastUpdated,
  displayData,
  onBtnClick,
}: DisplayCardProps) => {
  const { primaryValue, primaryUnit, secondaryValue, secondaryUnit } =
    displayData;

  return (
    <Card className={styles.root}>
      <Text className={styles.name}>{name}</Text>
      <div className={styles.cardContent}>
        <p className={styles.description}>
          {primaryValue}
          {primaryUnit}
          {secondaryValue !== undefined && (
            <>
              &nbsp;&nbsp;{secondaryValue}
              {secondaryUnit}
            </>
          )}
        </p>
        <p className={styles.updated}>Updated: {lastUpdated}</p>
      </div>
      <Button onClick={onBtnClick} className={styles.actionBtn}>
        Export Data
      </Button>
    </Card>
  );
};

export const WithLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link to={href} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
};

export const RoomCard = ({
  room,
  onBtnClick,
}: {
  room: Room;
  onBtnClick: () => void;
}) => (
  <DisplayCard
    id={room.id}
    name={room.name}
    lastUpdated={room.lastUpdated}
    displayData={roomToDisplayData(room)}
    onBtnClick={onBtnClick}
  />
);

export const MeterCard = ({
  meter,
  onBtnClick,
}: {
  meter: Meter;
  onBtnClick: () => void;
}) => (
  <DisplayCard
    id={meter.id}
    name={meter.name}
    lastUpdated={meter.lastUpdated}
    displayData={meterToDisplayData(meter)}
    onBtnClick={onBtnClick}
  />
);
