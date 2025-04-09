export const formatReportData = (coordinates, description) => {
    return {
        latitude: coordinates?.lat || null,
        longitude: coordinates?.long || null,
        description: description || '',
    };
}