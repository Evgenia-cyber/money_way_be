const getTimeToday = () => new Date().toISOString().split('T')[0].getTime();

const isRegistrationStarted = (startDate, timeToday) => {
  const registrationStartTime = new Date(startDate).getTime();
  return timeToday >= registrationStartTime;
};

const isRegistrationEnded = (endDate, timeToday) => {
  const registrationEndTime = new Date(endDate).getTime();
  return timeToday > registrationEndTime;
};

const isRegistrationPeriodValid = (startDate, endDate) => {
  const timeToday = getTimeToday();
  return (
    isRegistrationStarted(startDate, timeToday) &&
    !isRegistrationEnded(endDate, timeToday)
  );
};

module.exports = isRegistrationPeriodValid;
