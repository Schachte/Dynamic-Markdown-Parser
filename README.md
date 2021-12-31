# Dynamic-Markdown-Parser

## Usage

`git clone https://github.com/Schachte/Dynamic-Markdown-Parser.git`

`node mdparser.js README.md`

### Output

```
> node mdparser.js README.md

[
  [
    { depthCount: 1, type: '#', content: 'Dynamic-Markdown-Parser' },
    { depthCount: 2, type: '##', content: 'Usage' },
    { depthCount: 3, type: '###', content: 'Output' }
  ],
  [
    { depthCount: 2, type: '##', content: 'Background' },
    { depthCount: 2, type: '##', content: 'Sample Input Markdown' }
  ],
  [
    { depthCount: 1, type: '#', content: 'This is a heading' },
    { depthCount: 2, type: '##', content: 'This is a nested thing' }
  ],
  [
    { depthCount: 1, type: '#', content: 'This would cause a reset' },
    { depthCount: 3, type: '###', content: 'This is even deeper' }
  ],
  [
    { depthCount: 2, type: '##', content: 'Would this cause a reset?' },
    { depthCount: 2, type: '##', content: 'Sample Output' }
  ]
]
```

## Background

When utilizing third-party frameworks like `Next.JS` and Markdown rendering tools like `Remark` or `MDX`, you often want to prefix your posts with a `Table of Contents` section.

Unfortunately, MDX doesn't provide this support out of the box, so I wrote a hook that will parse the contents from the filesystem on the fly.

The below output will allow you to easily interpolate the results into your `JSX` or `HTML` for custom indentation, etc.

In addition, you are able to inject custom `anchor tag` links to enable hotlinking to sections of your post with ease. Below is an example of overriding the mappings for MDX in React.

```
const CustomH1 = (props) => {
  console.log(props);
  return (
    <h1 {...props} id={`#${props.children}`.replaceAll(" ", "_")}>
      {props.children}
    </h1>
  );
};

const MDXComponents = {
  p: (props) => <p {...props} style={{ fontSize: "30px" }} />,
  h1: (props) => <CustomH1 {...props} />,
};

export default MDXComponents;

```

## Sample Input Markdown

```
# This is a heading

Here is some random data 

## This is a nested thing

# This would cause a reset

### This is even deeper

## Would this cause a reset?

If the bottom element is less than the previous element, then there needs to be a grouping reset
```

## Sample Output

```
[
  [
    { depthCount: 1, type: '#', content: 'This is a heading' },
    { depthCount: 2, type: '##', content: 'This is a nested thing' }
  ],
  [
    { depthCount: 1, type: '#', content: 'This would cause a reset' },
    { depthCount: 3, type: '###', content: 'This is even deeper' }
  ],
  [
    { depthCount: 2, type: '##', content: 'Would this cause a reset?' }
  ]
]
```
