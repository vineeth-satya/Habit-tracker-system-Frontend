// PERIOD KEY FORMATS
// daily   → YYYY-MM-DD
// weekly  → YYYY-Wxx
// monthly → YYYY-MM

const getPeriodKey = (frequency, date = new Date()) => {
  const d = new Date(date);

  if (frequency === "daily") {
    return d.toISOString().split("T")[0];
  }

  if (frequency === "weekly") {
    const year = d.getFullYear();
    const firstJan = new Date(year, 0, 1);
    const days = Math.floor((d - firstJan) / 86400000);
    const week = Math.ceil((days + firstJan.getDay() + 1) / 7);
    return `${year}-W${String(week).padStart(2, "0")}`;
  }

  if (frequency === "monthly") {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
};

const getPreviousPeriodKey = (frequency, currentKey) => {
  if (frequency === "daily") {
    const [y, m, d] = currentKey.split("-").map(Number);
    const date = new Date(y, m - 1, d - 1);
    return date.toISOString().split("T")[0];
  }

  if (frequency === "weekly") {
    const [year, week] = currentKey.split("-W").map(Number);
    if (week > 1) {
      return `${year}-W${String(week - 1).padStart(2, "0")}`;
    }
    return `${year - 1}-W52`;
  }

  if (frequency === "monthly") {
    const [year, month] = currentKey.split("-").map(Number);
    if (month > 1) {
      return `${year}-${String(month - 1).padStart(2, "0")}`;
    }
    return `${year - 1}-12`;
  }
};

module.exports = {
  getPeriodKey,
  getPreviousPeriodKey
};
