export interface folderType {
  id: string; // doc.id를 가지고 저장됨
  folderName: string;
  supFolderID: string;
}

export interface clientFolderType extends folderType {
  isOpen: boolean;
}

export const initFolder: folderType = {
  id: "",
  folderName: "",
  supFolderID: "",
};

export const initClientfolder: clientFolderType = {
  ...initFolder,
  isOpen: false,
};
