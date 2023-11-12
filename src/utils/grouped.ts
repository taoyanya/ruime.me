interface ListItem {
  date: number;
  title: string;
}

export function grouped(list: { date: number; title: string }[]) {
  const map = new Map();
  list.forEach((item) => {
    if (map.has(item.date)) {
      const group = map.get(item.date);
      map.set(item.date, [...group, item.title]);
    } else {
      map.set(item.date, [item.title]);
    }
  });

  return Array.from(map.entries()) as unknown as [string, string[]][];
}
