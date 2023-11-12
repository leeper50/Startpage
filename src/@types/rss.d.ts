type RssData = {
  items: [
    {
      title: string;
      canonical: [{ href: string }];
      origin: { htmlUrl: string };
    }
  ];
};
type NewsItem = { title: string; url: string; site: string };
