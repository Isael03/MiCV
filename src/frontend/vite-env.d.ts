/// <reference types="vite/client" />

import type { IPCResponse, IPCMessageResponse, BackendProject } from './shared/types/cv';

declare global {
  interface Window {
    electron: {
      platform: string;
      versions: NodeJS.ProcessVersions;
    };

    cv: {
      findAll: () => Promise<IPCResponse<BackendProject[]>>;
      findById: (id: string) => Promise<IPCResponse<BackendProject>>;
      createProject: (data: { title: string }) => Promise<IPCResponse<BackendProject>>;
      update: (data: { project: BackendProject }) => Promise<IPCResponse<BackendProject>>;
      delete: (id: string) => Promise<IPCMessageResponse>;
    };
  }
}

export {};
