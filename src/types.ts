import { CSSProperties } from 'react';

export type ThemeColor = 'light' | 'dark';
export type DockPosition = 'right' | 'left';
export type Device = 'desktop' | 'tablet' | 'mobile';
export interface AppearanceConfig {
  theme?: ThemeColor | undefined;
  panels?:
    | {
        tools?:
          | {
              dock: DockPosition;
            }
          | undefined;
      }
    | undefined;
}

export interface User {
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
}

export interface GroupedSpecialLink {
  name: string;
  specialLinks: Array<SimpleSpecialLink | GroupedSpecialLink>;
}

export interface SimpleSpecialLink {
  name: string;
  href: string;
  target: string;
}

export type SpecialLink = SimpleSpecialLink | GroupedSpecialLink;

export interface GroupedMergeTag {
  name: string;
  mergeTags: Array<SimpleMergeTag | GroupedMergeTag>;
}

export interface SimpleMergeTag {
  name: string;
  value: string;
  sample?: string;
}

export interface ConditionalMergeTagRule {
  name: string;
  before: string;
  after: string;
}

export interface ConditionalMergeTag {
  name: string;
  rules: ConditionalMergeTagRule[];
  mergeTags?: SimpleMergeTag[] | undefined;
}

export type MergeTag = SimpleMergeTag | ConditionalMergeTag | GroupedMergeTag;

export interface DesignTagConfig {
  delimiter: [string, string];
}

export interface DisplayCondition {
  type: string;
  label: string;
  description: string;
  before: string;
  after: string;
}

export type EmptyDisplayCondition = object;

export interface ToolPropertiesConfig {
  [key: string]: { value: string };
}

export interface ToolConfig {
  enabled?: boolean | undefined;
  position?: number | undefined;
  properties?: ToolPropertiesConfig | StringList | undefined;
}

export interface ToolsConfig {
  [key: string]: ToolConfig;
}

export interface EditorConfig {
  minRows?: number | undefined;
  maxRows?: number | undefined;
}

type AiFeatures = {
  smartButtons?: boolean;
  smartHeadings?: boolean;
  magicImage?: boolean;
  smartText?: boolean;
};

export interface Features {
  audit?: boolean | undefined;
  preview?: boolean | undefined;
  imageEditor?: boolean | undefined;
  undoRedo?: boolean | undefined;
  stockImages?: boolean | undefined;
  textEditor?: TextEditor | undefined;
  ai?: boolean | AiFeatures;
}

export interface TextEditor {
  spellChecker?: boolean | undefined;
  tables?: boolean | undefined;
  cleanPaste?: boolean | undefined;
  emojis?: boolean | undefined;
}

export type Translations = Record<string, Record<string, string>>;

export type DisplayMode = 'email' | 'web';
export interface UnlayerOptions {
  id?: string | undefined;
  displayMode?: DisplayMode | undefined;
  projectId?: number | undefined;
  locale?: string | undefined;
  appearance?: AppearanceConfig | undefined;
  user?: User | undefined;
  mergeTags?: MergeTag[] | undefined;
  specialLinks?: SpecialLink[] | undefined;
  designTags?: StringList | undefined;
  designTagsConfig?: DesignTagConfig | undefined;
  tools?: ToolsConfig | undefined;
  blocks?: object[] | undefined;
  editor?: EditorConfig | undefined;
  safeHtml?: boolean | undefined;
  customJS?: string[] | undefined;
  customCSS?: string[] | undefined;
  features?: Features | undefined;
  translations?: Translations | undefined;
  displayConditions?: DisplayCondition[] | undefined;
}

export interface EmailEditorProps {
  editorId?: string | undefined;
  style?: CSSProperties | undefined;
  minHeight?: number | string | undefined;
  options?: UnlayerOptions | undefined;
  tools?: ToolsConfig | undefined;
  appearance?: AppearanceConfig | undefined;
  projectId?: number | undefined;
  scriptUrl?: string | undefined;
  locale?: string | undefined;
  onReady?(): void;
}

export interface HtmlExport {
  design: Design;
  html: string;
}

export interface ImageExport {
  design: Design;
  url: string;
}

export interface HtmlOptions {
  cleanup?: boolean;
  minify?: boolean;
}

export interface FileInfo {
  accepted: File[];
  attachments: File[];
}

export interface FileUploadDoneData {
  progress: number;
  url?: string | undefined;
}

export interface Design {
  counters?: object | undefined;
  body: {
    rows: object[];
    values?: object | undefined;
  };
}

export type SaveDesignCallback = (data: Design) => void;
export type ExportHtmlCallback = (data: HtmlExport) => void;
export type ExportImageCallback = (data: ImageExport) => void;
export type EventCallback = (data: object) => void;
export type FileUploadCallback = (
  file: FileInfo,
  done: FileUploadDoneCallback
) => void;
export type FileUploadDoneCallback = (data: FileUploadDoneData) => void;
export type FileRemovedCallback = (
    file: { id: number },
    done: () => void
) => void;

export type DisplayConditionDoneCallback = (
  data: DisplayCondition | null
) => void;
export type DisplayConditionCallback = (
  data: DisplayCondition | EmptyDisplayCondition,
  done: DisplayConditionDoneCallback
) => void;

export type RegisterCallback = {
  (type: 'image', callback: FileUploadCallback): void;
  (type: 'displayCondition', callback: DisplayConditionCallback): void;
  (type: 'image:removed', callback: FileRemovedCallback): void;
};
export type AddEventListener = (type: string, callback: EventCallback) => void;
export type RemoveEventListener = (
  type: string,
  callback: EventCallback
) => void;
export type LoadBlank = (options: object) => void;
export type LoadDesign = (design: Design) => void;
export type SaveDesign = (callback: SaveDesignCallback) => void;
export type ExportHtml = (
  callback: ExportHtmlCallback,
  options?: HtmlOptions
) => void;
export type ExportImage = (callback: ExportImageCallback) => void;
export type SetMergeTags = (mergeTags: Array<MergeTag>) => void;

export type BodyValues = {
  backgroundColor: string;
  contentWidth: string;
  fontFamily: {
    label: string;
    value: string;
    url: string;
  };
};

export type ImageData = {
  id: number;
  location: string;
  width: number;
  height: number;
  contentType: string;
  source: 'user';
  size?: number;
}

export type BlockData = {
  category: string;
  tags: Array<any>;
  data: Array<any>;
  displayMode: string;
}

export type ProviderPagination = {
  page: number;
  perPage: number;
  total: number;
  hasMore: boolean;
};

export type ProviderData = { page?: number, perPage?: number };
export type UserUploadsProviderDoneCallback = (images: Array<ImageData>, pagination?: ProviderPagination) => void;
export type BlocksProviderDoneCallback = (blocks: Array<BlockData>, pagination?: ProviderPagination) => void;
export type UserUploadsProvider = (params: ProviderData, done: UserUploadsProviderDoneCallback) => void
export type BlocksProvider = (params: ProviderData, done: BlocksProviderDoneCallback) => void
export type RegisterProviderCallback = {
  (name: 'userUploads', provider: UserUploadsProvider): void
  (name: 'blocks', provider: BlocksProvider): void
};


export interface EditorMethods {
  saveDesign: SaveDesign;
  exportHtml: ExportHtml;
  setMergeTags: SetMergeTags;
  loadDesign: LoadDesign;
  registerCallback: RegisterCallback;
  addEventListener: AddEventListener;
  loadBlank: LoadBlank;
  removeEventListener?: RemoveEventListener;
  exportImage?: ExportImage;
  setBodyValues?: (bodyValues?: BodyValues) => void;
  registerProvider?: RegisterProviderCallback;
  setDesignMode?: (editMode: 'edit' | 'view') => void;
}

export interface Editor extends EditorMethods {
  hidePreview: () => void;
  showPreview: (device: Device) => void;
}

export interface EditorRef extends EditorMethods {
  editor: Editor | null;
}

export {};

interface StringList {
  [key: string]: string;
}

declare global {
  const unlayer: {
    createEditor: (
      options: UnlayerOptions & {
        source: {
          name: string;
          version: string;
        };
      }
    ) => Editor;
  };
}
