const api = require("../temp/lo-utils.api.json");
const path = require("path");

const markdown = api.members
  .map((i) => {
    const { members } = i;
    return members
      .filter((i) => i.releaseTag === "Public")
      .map((i) => {
        const fnTitle = `### ${i.name}(${i.parameters?.map(i=>`${i.parameterName}${i.isOptional?'?':''}`).join(', ')})`;
        const fnDesc = `\n${i.docComment
          .replace("\n * @public", "")
          .replace(/(\s\*\n)|(\/\*\*\s)|(\s\*\/)/g, "")}`;
        return fnTitle + fnDesc;
      })
      .join("\n");
  })
  .join("\n");

const fs = require("fs");

fs.writeFileSync(path.resolve(__dirname, "../README.md"), markdown);
