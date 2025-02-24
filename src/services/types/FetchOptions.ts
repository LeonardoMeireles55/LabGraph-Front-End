export default interface FetchOptions {
  route: string;
  method?: string;
  body?: any;
  auth?: boolean;
  headers?: Record<string, string>;
}
