import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CheckIcon,
  Code,
  Flex,
  Radio,
  Stack,
  Text,
  Alert,
  Select,
  SegmentedControl,
  Group,
  Modal,
} from "@mantine/core";
import { IconDownload, IconAlertCircle } from "@tabler/icons-react";
import styles from "./ExportPage.module.css";
import { BreadcrumbItem, MenuButton } from "@/shared/ui";
import {
  useExport,
  calculateDateRange,
  Meter,
  Room,
  generateBuildingData,
  Building,
} from "@/shared";
import { DatePicker } from "@mantine/dates";
import { DashboardLayout as Layout } from "@/widgets";
import BuildingData from "@/shared/data/buidlingsMock.json";

type SourceType = "meter" | "room" | null;
type Source = Room | Meter | null;

export const ExportPage = () => {
  // Selection state
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [sourceType, setSourceType] = useState<SourceType>(null);
  const [source, setSource] = useState<Source>(null);

  // Existing date range state
  const [rangePreset, setRangePreset] = useState<"7d" | "30d" | "Q" | null>(
    "7d"
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
    const [start, end] = calculateDateRange("7d");
    return [start, end];
  });

  // Mock data for assets (would come from API based on building selection)
  const [availableAssets, setAvailableAssets] = useState<
    { value: string; label: string }[]
  >([]);

  const mockBuildings = BuildingData.buildings.map((b) => ({
    value: b.id,
    label: b.name,
  }));

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
    if (selectedBuilding && sourceType) {
      const buildingData = BuildingData.buildings.find(
        (v) => v.id === selectedBuilding
      );
      const { rooms = [], meters = [] } =
        generateBuildingData(buildingData as Building | undefined) || {};

      const mockAssets =
        sourceType === "room"
          ? rooms.map((v) => ({ value: v.id, label: v.name }))
          : meters.map((v) => ({ value: v.id, label: v.name }));

      setAvailableAssets(mockAssets);
    } else {
      setAvailableAssets([]);
      setSource(null);
    }
  }, [selectedBuilding, sourceType]);

  useEffect(() => {
    setSource(null);
  }, [sourceType]);

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
    // Reset all selections
    setSelectedBuilding(null);
    setSourceType(null);
    setSource(null);
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

  const breadCrumbItems: BreadcrumbItem[] = [{ label: "Export Data" }];

  const canExport =
    selectedBuilding && sourceType && source && dateRange[0] && dateRange[1];

  const title =
    sourceType === "room"
      ? `Exported Temperature & Humidity Data`
      : `Exported Energy Usage Data`;

  return (
    <Layout breadCrumbItems={breadCrumbItems}>
      <Box className={styles.wrapper}>
        <Stack maw="max-content">
          <Text className={styles.instr}>1. Select Building and Asset</Text>
          <Flex gap={"xl"} align={"center"}>
            <Select
              miw={"270px"}
              placeholder="Search buildings..."
              searchable
              data={mockBuildings}
              value={selectedBuilding}
              onChange={setSelectedBuilding}
              //   label="Select Building"
              clearable
            />
            <SegmentedControl
              data={[
                { label: "Room", value: "room" },
                { label: "Meter", value: "meter" },
              ]}
              value={sourceType || ""}
              onChange={(value) => setSourceType(value as SourceType)}
              disabled={!selectedBuilding}
            />
            <Select
              placeholder="Select asset..."
              data={availableAssets}
              value={source?.id || null}
              onChange={(value) => setSource({ id: value } as Source)}
              disabled={!sourceType}
            />
          </Flex>

          <Flex
            justify="space-between"
            align="flex-start"
            w="max-content"
            gap="xl"
            mt="xl"
          >
            <Box>
              <Text mb="lg" className={styles.instr}>
                2. Select Date Range
              </Text>
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
              <Text size="sm" mt="xl" className={styles.description}>
                <b>Selected period:</b>
                <br />
                {dateRange.every((date) => date === null)
                  ? "No dates selected"
                  : dateRange
                      .map((date) => date?.toLocaleDateString())
                      .join(" – ")}
              </Text>
            </Box>

            <Box>
              <DatePicker
                type="range"
                allowSingleDateInRange
                value={dateRange}
                onChange={handleDateChange}
                //   maxDate={new Date()}
                mt="xl"
                ml="lg"
              />
            </Box>
          </Flex>
        </Stack>

        <Box h="56px" my="md">
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

        <Flex gap="lg" justify={"end"} align={"center"}>
          {canExport && (
            <Button onClick={handleClose} variant="outline">
              Reset
            </Button>
          )}
          <MenuButton
            items={exportOptions}
            buttonTitle={error ? "Retry Export" : "Export"}
            mainIcon={<IconDownload size={16} />}
            disabled={!canExport || loading}
            loading={loading}
          />
        </Flex>
      </Box>

      {!loading && previewData && (
        <Box p="xs">
          <Text size="sm" mb="xs">
            Preview ({exportFormat}):
          </Text>
          <Code block mah={360} style={{ overflow: "auto" }}>
            {previewData}
          </Code>
          <Group mt="lg">
            <Button onClick={handleClose}>OK</Button>
          </Group>
        </Box>
      )}
      <Modal
        opened={!loading && !!previewData}
        onClose={handleClose}
        title={title}
        size="lg"
        className={styles.root}
      >
        {" "}
        <Box p="xs">
          <Text size="sm" mb="xs">
            Preview ({exportFormat}):
          </Text>
          <Code block mah={360} style={{ overflow: "auto" }}>
            {previewData}
          </Code>
          <Flex justify={"end"} mt="lg">
            <Button onClick={handleClose}>OK</Button>
          </Flex>
        </Box>
      </Modal>
    </Layout>
  );
};
