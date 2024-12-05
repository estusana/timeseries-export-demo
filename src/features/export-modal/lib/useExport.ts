import { useState } from "react";
import { sleep } from "@/shared";
import { generateExportData } from "@/shared/data/generateExportData";

interface UseExportOptions {
    sourceType: "meter" | "room" | null;
    sourceId: string | null;
}

interface UseExportReturn {
    loading: boolean;
    error: string | null;
    previewData: string | null;
    exportFormat: "CSV" | "JSON";
    handleExport: (format: "CSV" | "JSON", dateRange: [Date, Date]) => Promise<void>;
    resetExport: () => void;
}

export const useExport = ({ sourceType, sourceId }: UseExportOptions): UseExportReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewData, setPreviewData] = useState<string | null>(null);
    const [exportFormat, setExportFormat] = useState<"CSV" | "JSON">("CSV");
    const [retryCount, setRetryCount] = useState(0);

    const handleExport = async (format: "CSV" | "JSON", dateRange: [Date, Date]) => {
        if (!sourceId || !sourceType) {
            setError("Invalid source configuration");
            return;
        }

        setLoading(true);
        setError(null);
        setExportFormat(format);

        try {
            // Simulate first attempt failing
            if (retryCount === 0) {
                await sleep(1000);
                throw new Error("Export failed. Please try again.");
            }

            const data = await generateExportData({
                sourceType,
                sourceId,
                dateRange,
                format,
            });

            setPreviewData(data);
            setRetryCount(0);
        } catch (error) {
            console.error("Export failed:", error);
            setError(error instanceof Error ? error.message : "Export failed unexpectedly");
            setRetryCount((prev) => prev + 1);
        } finally {
            setLoading(false);
        }
    };

    const resetExport = () => {
        setError(null);
        setPreviewData(null);
        setRetryCount(0);
        setExportFormat("CSV");
    };

    return {
        loading,
        error,
        previewData,
        exportFormat,
        handleExport,
        resetExport,
    };
};