/**
 * Formats a date string or Date object to dd-mm-yyyy format
 * @param date - Date string (ISO format) or Date object
 * @returns Formatted date string in dd-mm-yyyy format
 */
export const formatDate = (date: string | Date): string => {
  try {
    // Convert to Date object if it's a string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Validate the date
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    // Extract date components
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const year = dateObj.getFullYear();

    // Convert to strings and pad with zeros
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const yearStr = `${year}`;

    // Return in dd-mm-yyyy format
    return `${dayStr}-${monthStr}-${yearStr}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

