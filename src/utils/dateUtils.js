import moment from 'moment';

export const formatTime = (timeStr) => {
  if (!timeStr) return 'TBA';
  try {
    if (timeStr.match(/^\d{2}:\d{2}(:\d{2})?$/)) {
      const today = moment().format('YYYY-MM-DD');
      timeStr = `${today}T${timeStr}`;
    }
    
    const date = moment(timeStr);
    if (!date.isValid()) {
      return 'TBA';
    }
    
    return date.format('HH:mm');
  } catch (e) {
    return 'TBA';
  }
};

export const calculateDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return '';
  
  try {
    const departure = moment(departureTime);
    const arrival = moment(arrivalTime);
    
    if (!departure.isValid() || !arrival.isValid()) return '';
    
    const duration = moment.duration(arrival.diff(departure));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    
    return `${hours}h ${minutes}m`;
  } catch (e) {
    return '';
  }
}; 