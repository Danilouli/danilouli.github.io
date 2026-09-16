function contextNameFromPath(filePath) {
  return filePath.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
}

export default {
  contextMatchFn({ codeBasePath }) {
    if (codeBasePath.isDir) return null;
    if (!codeBasePath.path.endsWith(".js")) return null;
    return { contextName: contextNameFromPath(codeBasePath.path), filePathVariableName: 'FILE' };
  },
  prompt: {
    promptTemplate: "clean and improve the code in @{FILE}",
    command: "cursor",
  },
};
