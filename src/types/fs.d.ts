interface FileSystemFileHandle {
  createSyncAccessHandle: () => Promise<any>;
}
