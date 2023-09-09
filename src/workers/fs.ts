onmessage = async (event) => {
  if (event.data === "") {
    return;
  }
  const root = await navigator.storage.getDirectory();
  const draftFile = await root.getFileHandle("poultryFarmData.json", {
    create: true,
  });

  const accessHandle = await draftFile.createSyncAccessHandle();
  const encoder = new TextEncoder();
  const writeBuffer = encoder.encode(event.data);
  accessHandle.write(writeBuffer);
  accessHandle.flush();
  accessHandle.close();
};
