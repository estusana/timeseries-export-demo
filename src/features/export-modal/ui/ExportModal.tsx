import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CheckIcon,
  Code,
  Flex,
  Modal,
  Radio,
  Stack,
  Text,
  Alert,
} from "@mantine/core";
import { IconDownload, IconAlertCircle } from "@tabler/icons-react";
import styles from "./ExportModal.module.css";
import { MenuButton } from "@/shared/ui";
import { useExport, calculateDateRange, Meter, Room, sleep } from "@/shared";
import { DatePicker } from "@mantine/dates";

interface ExportModalProps {
  opened: boolean;
  close: () => void;
  sourceType: "meter" | "room" | null;
  source: Room | Meter | null;
}

export const ExportModal = ({
  opened,
  close,
  sourceType,
  source,
}: ExportModalProps) => {
  const [rangePreset, setRangePreset] = useState<"7d" | "30d" | "Q" | null>(
    "7d"
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
    const [start, end] = calculateDateRange("7d");
    return [start, end];
  });

  const {
    loading,
    error,
    previewData,
    exportFormat,
    handleExport,
    resetExport,
  } = useExport({
    sourceType,
    sourceId: source?.id ?? null,
  });

  useEffect(() => {
    if (rangePreset) {
      const [start, end] = calculateDateRange(rangePreset);
      setDateRange([start, end]);
    }
  }, [rangePreset]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    setRangePreset(null);
  };

  const handleClose = async () => {
    close();
    await sleep(300);
    setRangePreset("7d");
    const [start, end] = calculateDateRange("7d");
    setDateRange([start, end]);
    resetExport();
  };

  const handleExportClick = (format: "CSV" | "JSON") => {
    if (dateRange[0] && dateRange[1]) {
      handleExport(format, [dateRange[0], dateRange[1]]);
    }
  };

  const exportOptions = [
    {
      label: "Spreadsheet (CSV)",
      onClick: () => handleExportClick("CSV"),
    },
    {
      label: "Raw Data (JSON)",
      onClick: () => handleExportClick("JSON"),
    },
  ];

  const title =
    sourceType === "room"
      ? `Export ${source?.name} Temperature & Humidity Data`
      : `Export ${source?.name} Energy Usage Data`;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={title}
      size="lg"
      className={styles.root}
    >
      {!previewData && (
        <Box p="xs">
          <Flex justify="space-between" pb="sm">
            <DatePicker
              type="range"
              allowSingleDateInRange
              value={dateRange}
              onChange={handleDateChange}
              // This line prevents selecting future dates:
              // maxDate={new Date()}
              my="sm"
            />
            <div>
              <Radio.Group
                label="Quick Date Ranges:"
                value={rangePreset || ""}
                onChange={(value) =>
                  setRangePreset(value as "7d" | "30d" | "Q")
                }
                className={styles.rangePresets}
              >
                <Stack gap="xs" my="xs">
                  <Radio value="7d" label="Last 7 days" icon={CheckIcon} />
                  <Radio value="30d" label="Last 30 days" icon={CheckIcon} />
                  <Radio value="Q" label="Last Quarter" icon={CheckIcon} />
                </Stack>
              </Radio.Group>
              <p className={styles.description}>
                <b>Selected period:</b> <br />
                {dateRange.every((date) => date === null)
                  ? "No dates selected"
                  : dateRange
                      .map((date) => date?.toLocaleDateString())
                      .join(" – ")}
              </p>
            </div>
          </Flex>

          <Box h="56px">
            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="red"
                variant="light"
              >
                {error}
              </Alert>
            )}
          </Box>

          <Flex justify="end" gap="lg" mt="lg">
            <Button onClick={handleClose} variant="outline">
              Cancel
            </Button>
            <MenuButton
              items={exportOptions}
              buttonTitle={error ? "Retry Export" : "Export"}
              mainIcon={<IconDownload size={16} />}
              disabled={dateRange.some((date) => date === null) || loading}
              loading={loading}
            />
          </Flex>
        </Box>
      )}
      {!loading && previewData && (
        <Box p="xs">
          <Text size="sm" mb="xs">
            Preview ({exportFormat}):
          </Text>
          <Code block mah={360} style={{ overflow: "auto" }}>
            {previewData}
          </Code>
          <Flex justify="end" gap="lg" mt="lg">
            <Button onClick={handleClose}>OK</Button>
          </Flex>
        </Box>
      )}
    </Modal>
  );
};
