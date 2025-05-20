/* src/types/react-file-viewer.d.ts
   Minimal typings so TS stops yelling.  Add more props later if you need them. */

declare module "react-file-viewer" {
  import * as React from "react";

  export interface FileViewerProps {
    /** file extension without the dot, e.g. "pdf", "docx", "png" */
    fileType: string;
    /** URL / path / blob URL to the file */
    filePath: string;
    /** error handler */
    onError?: (e: Error) => void;
    /** abort handler */
    onAbort?: () => void;
  }

  const FileViewer: React.ComponentType<FileViewerProps>;

  export default FileViewer;
}
