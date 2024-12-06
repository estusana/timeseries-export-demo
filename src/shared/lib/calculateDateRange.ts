export const calculateDateRange = (preset: "7d" | "30d" | "Q"): [Date, Date] => {
    const end = new Date();
    const start = new Date();

    switch (preset) {
        case "7d":
            start.setDate(end.getDate() - 7);
            break;
        case "30d":
            start.setDate(end.getDate() - 30);
            break;
        case "Q":
            start.setMonth(end.getMonth() - 3);
            break;
    }

    return [start, end];
};