import { formatReportData } from "../formatReportData";

describe("formatReportData", () => {
    it("should format report data correctly", () => {
        const coords = { lat: 37.7749, long: -122.4194 };
        const description = "needle by Spurs";

        const result = formatReportData(coords, description);
        expect(result).toEqual({
            latitude: 37.7749,
            longitude: -122.4194,
            description: "needle by Spurs",
        });
    })

    it('handle missing coordinates', () => {
        const result = formatReportData(null, "No coordinates");
        expect(result).toEqual({
            latitude: null,
            longitude: null,
            description: "No coordinates",
        })
    })
})