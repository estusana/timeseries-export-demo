import { Breadcrumbs as MantineBreadCrumbs } from "@mantine/core";
import { Link } from "react-router";
import styles from "./Breadcrumbs.module.css";

export type BreadcrumbItem = {
  label: string;
  link?: string;
  id?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (!items.length) return null;

  return (
    <MantineBreadCrumbs px="lg">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const label = item.id ? `${item.label} (${item.id})` : item.label;

        if (isLast || !item.link) {
          return (
            <p key={item.label} className={styles.breadcrumbItem}>
              {label}
            </p>
          );
        }

        return (
          <Link
            key={item.label}
            to={item.link}
            className={styles.breadcrumbItem}
          >
            {label}
          </Link>
        );
      })}
    </MantineBreadCrumbs>
  );
};
