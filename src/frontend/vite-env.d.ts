/// <reference types="vite/client" />

import type { CurriculumVitae, IPCResponse, IPCMessageResponse } from './shared/types/cv';

declare global {
  interface Window {
    electron: {
      platform: string;
      versions: NodeJS.ProcessVersions;
    };

    cv: {
      findAll: () => Promise<IPCResponse<CurriculumVitae[]>>;
      findById: (id: string) => Promise<IPCResponse<CurriculumVitae>>;
      createProject: (data: { title: string }) => Promise<IPCResponse<CurriculumVitae>>;
      update: (data: { cv: CurriculumVitae; dto: unknown }) => Promise<IPCResponse<CurriculumVitae>>;
      delete: (id: string) => Promise<IPCMessageResponse>;
    };
  }
}

export {};
