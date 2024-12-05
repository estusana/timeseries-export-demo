import { Card, Text } from "@mantine/core";
import { Building } from "../../shared/data/types";
import { Link } from "react-router";
import styles from "./styles.module.css";

export const BuildingCard = ({ name, stats, id }: Building) => {
  return (
    <Link to={id} style={{ textDecoration: "none" }}>
      <Card className={styles.root}>
        <Text className={styles.name}>
          {id} <br />
          {name}
        </Text>
        <p className={styles.description}>
          {stats.rooms} Rooms • {stats.rooms} Meters
        </p>
      </Card>
    </Link>
  );
};
