import JSZip from 'jszip';

export async function readFiles(fileList) {
  console.log('readFiles called with:', fileList.length, 'files');
  const files = Array.from(fileList);
  const results = [];

  for (const file of files) {
    console.log('Processing file:', file.name, 'type:', file.type, 'size:', file.size);
    
    // Check if it's a ZIP file
    if (file.name.endsWith('.zip')) {
      console.log('Detected ZIP file, extracting...');
      try {
        const zipFiles = await extractZip(file);
        console.log('Extracted', zipFiles.length, 'files from ZIP');
        results.push(...zipFiles);
      } catch (error) {
        console.error('Error extracting ZIP:', error);
        throw new Error('Failed to extract ZIP: ' + error.message);
      }
    } else {
      console.log('Regular file, reading content...');
      const content = await file.text();
      results.push({
        name: file.name,
        path: file.name,
        content,
        size: file.size,
      });
      console.log('Added file:', file.name, content.length, 'bytes');
    }
  }

  console.log('readFiles returning', results.length, 'files');
  return results;
}

async function extractZip(zipFile) {
  console.log('Extracting ZIP file:', zipFile.name);
  const zip = new JSZip();
  const zipData = await zip.loadAsync(zipFile);
  const extractedFiles = [];

  console.log('ZIP contents:', Object.keys(zipData.files));

  // Iterate through all files in the ZIP
  for (const [relativePath, zipEntry] of Object.entries(zipData.files)) {
    console.log('Processing:', relativePath, 'isDir:', zipEntry.dir);
    
    // Skip directories and hidden files
    if (zipEntry.dir) {
      console.log('  Skipping directory');
      continue;
    }
    
    if (relativePath.startsWith('__MACOSX') || relativePath.includes('/.')) {
      console.log('  Skipping hidden/system file');
      continue;
    }

    // Only process code files
    if (isCodeFile(relativePath)) {
      console.log('  ✓ Code file detected, extracting...');
      const content = await zipEntry.async('text');
      extractedFiles.push({
        name: relativePath.split('/').pop(),
        path: relativePath,
        content,
        size: content.length,
      });
      console.log('  ✓ Extracted:', relativePath.split('/').pop(), content.length, 'bytes');
    } else {
      console.log('  ✗ Not a code file, skipping');
    }
  }

  console.log('Total files extracted:', extractedFiles.length);
  return extractedFiles;
}

function isCodeFile(filename) {
  const codeExtensions = [
    '.js', '.jsx', '.ts', '.tsx',
    '.py', '.rb', '.php', '.java',
    '.c', '.cpp', '.h', '.cs',
    '.go', '.rs', '.swift', '.kt',
    '.cob', '.cbl', '.cobol', '.as', '.sql',
    '.jcl', '.sh', '.bat', '.cmd',
    '.html', '.css', '.scss', '.vue',
    '.json', '.xml', '.yaml', '.yml',
    '.md', '.txt',
  ];
  
  const lower = filename.toLowerCase();
  return codeExtensions.some(ext => lower.endsWith(ext));
}
