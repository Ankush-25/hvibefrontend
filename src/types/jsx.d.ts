// Declaration file for JSX modules to allow importing .jsx files in TypeScript
declare module '*.jsx' {
  import { FC } from 'react';
  const Component: FC<any>;
  export default Component;
}

declare module '*.js' {
  const content: any;
  export default content;
}
