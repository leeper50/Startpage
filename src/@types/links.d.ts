declare module "*.yml" {
  const data: [{ title: string; list: [{ url: string; id: string }] }];
  export default data;
}
