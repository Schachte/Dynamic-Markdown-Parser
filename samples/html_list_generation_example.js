const depthData = [
  { depthCount: 1, type: "#", content: "This is a heading" },
  { depthCount: 2, type: "##", content: "This is a nested thing" },
  { depthCount: 2, type: "##", content: "This would cause a reset" },
  { depthCount: 3, type: "###", content: "This is even deeper" },
  { depthCount: 1, type: "#", content: "This is even deeper" },
  { depthCount: 2, type: "##", content: "Would this cause a reset?" },
];

let prevDepth = undefined;
let closeCount = 0;
const generateNestedHtml = (depthData) => {
  let generatedHtml = recursiveListGenerator(
    depthData,
    prevDepth || depthData[0].depthCount,
    ""
  );

  console.log(generatedHtml);
  return generatedHtml;
};

const recursiveListGenerator = (layer, prevDepth, generatedCode) => {
  if (layer.length == 0) {
    generatedCode += "</ul>";
    prevDepth = prevDepth;
    return generatedCode;
  }

  const currentDepth = layer[0].depthCount;

  if (layer[0].depthCount == prevDepth) {
    generatedCode += `<li>${layer[0].content}</li>`;
    layer.shift();
    return recursiveListGenerator(layer, currentDepth, generatedCode);
  }

  if (layer[0].depthCount > prevDepth) {
    // Tells us how much deeper we need to recurse down the tree
    // IE. if current depth is 2 (## hello) and next is 3 (### hello), the delta is 1 recursive invocation
    const calculatedRecursionDepth = layer[0].depthCount - prevDepth;

    for (let i = 0; i < calculatedRecursionDepth; i++) {
      generatedCode += "<ul>";
      closeCount++;
    }

    generatedCode += `<li>${layer[0].content}</li>`;
    layer.shift();

    return recursiveListGenerator(layer, currentDepth, generatedCode);
  } else {
    while (closeCount--) generatedCode += "</ul>";
    generatedCode += `<li>${layer[0].content}</li>`;
    layer.shift();

    return recursiveListGenerator(layer, currentDepth, generatedCode);
  }
};

generateNestedHtml(depthData);
