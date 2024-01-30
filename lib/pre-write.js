import fse from 'fs-extra';
// prettierrc and yo-resolve files are created manually so they apply to the generation process

function createEarlyFiles() {
  // if (this.existingProject) {
  //     return;
  // }
  const prettierRc = `module.exports = {
  bracketSpacing: false,
  bracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  printWidth: 140,
  tabWidth: 2,
  bracketSpacing: true,
  useTabs: false,
};
`;
  fse.writeFile('.prettierrc.js', prettierRc);
}

export { createEarlyFiles };
