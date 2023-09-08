// @ts-nocheck

export function getFileHandle() {
  if ('showOpenFilePicker' in window) {
    return window.showOpenFilePicker().then((handles) => handles[0]);
  }
}

export function getNewFileHandle() {
  if ('showSaveFilePicker' in window) {
    const opts = {
      types: [{
        description: 'JSON file',
        accept: {'application/json': ['.json']},
      }],
    };
    return window.showSaveFilePicker(opts);
  }
}

export function readFile(file: any) {
  if (file.getFile) {
    return file.getFile();
  }
  return _readFileLegacy(file);
}

function _readFileLegacy(file:any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      const text = e.srcElement.result;
      resolve(text);
    });
    reader.readAsText(file);
  });
}

export async function writeFile(fileHandle:any, contents:any) {
  // Support for Chrome 82 and earlier.
  if (fileHandle.createWriter) {
    // Create a writer (request permission if necessary).
    const writer = await fileHandle.createWriter();
    // Write the full length of the contents
    await writer.write(0, contents);
    // Close the file and write the contents to disk
    await writer.close();
    return;
  }
  // For Chrome 83 and later.
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

export async function verifyPermission(fileHandle:any, withWrite:any) {
  const opts = {};
  if (withWrite) {
    opts.writable = true;
    // For Chrome 86 and later...
    opts.mode = 'readwrite';
  }
  // Check if we already have permission, if so, return true.
  if (await fileHandle.queryPermission(opts) === 'granted') {
    return true;
  }
  // Request permission to the file, if the user grants permission, return true.
  if (await fileHandle.requestPermission(opts) === 'granted') {
    return true;
  }
  // The user did nt grant permission, return false.
  return false;
}