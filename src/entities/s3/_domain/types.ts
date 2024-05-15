export type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
  allowedFileTypes: string[];
  maxFileSize: number;
};

export type IsValidFileParams = {
  fileType: string;
  fileSize: number;
  allowedFileTypes: string[];
  maxFileSize: number;
};

export type IsValidFileResult =
  | {
      success?: string;
    }
  | {
      failure?: string;
    };
