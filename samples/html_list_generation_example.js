const depthData = [
  { depthCount: 1, type: "#", content: "This is a heading" },
  { depthCount: 2, type: "##", content: "This is a nested thing" },
  { depthCount: 2, type: "##", content: "This would cause a reset" },
  { depthCount: 3, type: "###", content: "This is even deeper" },
  { depthCount: 1, type: "#", content: "This is even deeper" },
  { depthCount: 2, type: "##", content: "Would this cause a reset?" },
];

const generateNestedHtml = (depthData) => {
  let closeCount = 0;
  let generatedHtml = `<ul>
  ${recursiveListGenerator(depthData, depthData[0].depthCount, "", closeCount)}
  </ul>`;

  return generatedHtml;
};

const recursiveListGenerator = (
  layer,
  prevDepth,
  generatedCode,
  closeCount
) => {
  if (layer.length == 0) {
    generatedCode += "</ul>";
    return generatedCode;
  }

  const currentDepth = layer[0].depthCount;

  if (layer[0].depthCount == prevDepth) {
    generatedCode += `<li>${layer[0].content}</li>`;
    layer.shift();
    return recursiveListGenerator(
      layer,
      currentDepth,
      generatedCode,
      closeCount
    );
  }

  if (layer[0].depthCount > prevDepth) {
    // Tells us how much deeper we need to recurse down the tree
    // IE. if current depth is 2 (## hello) and next is 3 (### hello), the delta is 1 recursive invocation
    const calculatedRecursionDepth = layer[0].depthCount - prevDepth;

    let tempCloseCount = 0;
    for (let i = 0; i < calculatedRecursionDepth; i++) {
      generatedCode += "<ul>";
      tempCloseCount++;
    }

    generatedCode += `<li>${layer[0].content}</li>`;
    layer.shift();

    return recursiveListGenerator(
      layer,
      currentDepth,
      generatedCode,
      tempCloseCount
    );
  } else {
    while (closeCount--) generatedCode += "</ul>";
    generatedCode += `<li>${layer[0].content}</li>`;
    layer.shift();

    return recursiveListGenerator(
      layer,
      currentDepth,
      generatedCode,
      closeCount
    );
  }
};

console.log(generateNestedHtml(depthData));
