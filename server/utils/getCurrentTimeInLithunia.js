function getCurrentTimeInLithuania() {
  const now = new Date();
  now.setHours(now.getHours() + 3); // Add the desired offset
  const formattedTime = now.toISOString();
  return formattedTime;
}

module.exports = getCurrentTimeInLithuania;
