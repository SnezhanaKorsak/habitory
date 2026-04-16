type Day = {
  date: string;
};

export function generateDays(count = 365) {
  const days = [];
  const today = new Date();
  let fullCount = count;

  if (count % 7 !== 0) {
    fullCount += 7 - ((count - today.getDay()) % 7);
  }

  for (let i = fullCount - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    days.push({
      date: date.toISOString().split('T')[0],
    });
  }

  return days;
}

function getWeekdayIndex(date: Date) {
  return (date.getDay() + 7) % 7;
}

export function generateHeatmapMatrix(days: { date: string }[]) {
  const weeks: Day[][] = [];

  let currentWeek: Day[] = Array(7).fill(null);

  days.forEach((day) => {
    const date = new Date(day.date);
    const weekday = getWeekdayIndex(date); // 0 = Mon ... 6 = Sun

    currentWeek[weekday] = day;

    // если воскресенье — закрываем неделю
    if (weekday === 6) {
      weeks.push(currentWeek);
      currentWeek = Array(7).fill(null);
    }
  });

  // если осталась незакрытая неделя
  if (currentWeek.some(Boolean)) {
    weeks.push(currentWeek);
  }

  return weeks;
}
