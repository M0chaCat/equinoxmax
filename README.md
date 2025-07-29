# Equinox Max

Welcome to **Equinox Max**, my code framework doohicky, powered by Node.js and browser js.

## Getting Started

To get up and running:

1. Clone the repo and `cd` into the project directory.
2. Install dependencies:

```bash
npm i
```

## Project Structure

* All source files live in `/src/`.
* Files are compiled **alphabetically** for deterministic builds.

## Building

To compile your project after any code change, simply run:

```bash
npm run indexbuild
```

This will process your `/src/` contents and build them in order.

It will be output to `/index/`

Here's a clean and readable **file/folder tree** with brief explanations for each item in your project root:

---

## Project Structure
```txt
equinoxmax/
├── assets/                # Static files (images, gifs, etc.)
├── brain.png              # Required for BEMA, ignore it.
├── combine-scripts.js     # Merges scripts for final build, don't run on its own.
├── commands.js            # Commands that your code use, like BEMA and onEvent.
├── index.html             # Main HTML entry point
├── main.js                # Compilation script, don't run on its own.
├── openbundles.js         # More commands that your code use.
├── package.json           # Project metadata & dependencies.
├── package-lock.json      # Dependency lockfile (exact versions).
├── README.md              # Project documentation.
├── src/                   # Source code files (compiled alphabetically).
├── styles.css             # Global CSS styling.
└── webpack.config.js      # Webpack config for bundling/compiling.
```