/// <reference types="vite/client" />
//declare global {
  interface Window {
    electron: {
      platform: string;
      versions: NodeJS.ProcessVersions;
    };

    cv: {
      findAll: () => {};
      findById: () => {};
      create: () => {};
      createProject(): Promise<{title:string}>
      delete: () => {};
      update: () => {};
    };
  }
//}
