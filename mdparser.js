const fs = require("fs");

const dynamicMdMatcher = /^(#{1,4})\s+(.*)$/;

const readData = (fullPath) => {
  return fs.readFileSync(fullPath, "utf8");
};

const retrieveParsedData = (postContent) => {
  const allLines = postContent
    .split(/\r?\n/)
    .map((line) => {
      return line;
    })
    .filter((line) => line.length > 0);

  const matchedHeadings = allLines
    .map((line) => {
      let potentialMatch = dynamicMdMatcher.exec(line);

      if (potentialMatch !== null) {
        return {
          depthCount: potentialMatch[1].length,
          type: potentialMatch[1],
          content: potentialMatch[2],
        };
      }
      return "";
    })
    .filter((line) => line !== "");

  return matchedHeadings;
};

const filePath = process.argv[2];

if (!filePath) {
  console.error("Missing filepath for markdown");
  return;
}

const fileContents = readData(filePath);
const parsedHeadings = retrieveParsedData(fileContents);

const mdRecursiveSubRoutine = (data, existingGroup = [], solution = []) => {
  if (data.length == 0) {
    if (existingGroup) {
      return [...solution, existingGroup];
    }
    return solution;
  }

  const depthCount = data[0]["depthCount"];

  if (existingGroup.length == 0) {
    existingGroup = [data[0]];
    data.shift();
    return mdRecursiveSubRoutine(data, existingGroup, solution);
  }

  if (depthCount < existingGroup[existingGroup.length - 1]["depthCount"]) {
    solution = [...solution, existingGroup];
    const currentLevel = data[0];
    data.shift();
    return mdRecursiveSubRoutine(data, [currentLevel], solution);
  }

  existingGroup = [...existingGroup, data[0]];
  data.shift();
  return mdRecursiveSubRoutine(data, existingGroup, solution);
};

const finalResult = mdRecursiveSubRoutine(parsedHeadings);
console.log(finalResult.flatMap((item) => item));
