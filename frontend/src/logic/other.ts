export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatNumberArrayToQuery = (array: any[], queryName: string) => {
    let query = '';
    for (let i = 0; i < array.length; i++) {
        query += `${queryName}=${array[i]}&`;
    }
    return query;
};