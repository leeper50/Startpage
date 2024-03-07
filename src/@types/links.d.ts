type YamlLinks = [{ title: string; list: [{ url: string; id: string }] }];

declare module "*.yml" {
  const data: YamlLinks;
  export default data;
}
