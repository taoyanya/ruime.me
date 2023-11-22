interface Params {
  data: {
    title: string;
    date: Date;
  };
}

export function formatted(raw: Params[] | undefined) {
  if(!raw) {
    return []
  }
  return raw
    .sort((a, b) => {
      return a.data.date < b.data.date ? 1 : -1;
    })
    .map((blog) => {
      const tempDate = new Date(blog.data.date);
      const formattedDate = `${tempDate.getFullYear()}.${
        tempDate.getMonth() + 1
      }.${tempDate.getDate()}`;

      return {
        ...blog,
        title: blog.data.title,
        date: formattedDate,
      };
    });
}
