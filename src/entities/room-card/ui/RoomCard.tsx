import { Button, Card, Text } from "@mantine/core";
import { Link } from "react-router";
import { Room } from "@/shared/";
import styles from "./RoomCard.module.css";
interface RoomCardProps extends Room {
  onBtnClick: () => void;
}
export const RoomCard = ({
  name,
  lastUpdated,
  measurements,
  onBtnClick,
}: RoomCardProps) => {
  return (
    <Card className={styles.root}>
      <Text className={styles.name}>
        {name}
        {/* {name} ({id}) */}
      </Text>
      <div className={styles.cardContent}>
        <p className={styles.description}>
          {measurements.temperature}°C &nbsp;&nbsp; {measurements.humidity}% RH
        </p>
        <p className={styles.updated}>Updated: {lastUpdated}</p>
      </div>
      <Button onClick={onBtnClick} className={styles.actionBtn}>
        Download Data
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
