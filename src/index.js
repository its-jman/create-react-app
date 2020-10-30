#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const nodeUtil = require("util");
const uuid = require("uuid").v4;
const u = require("./utils");
const spawnSync = require("child_process").spawnSync;
const stringReplaceStream = require("string-replace-stream");
const execSync = require("child_process").execSync;
const rimraf = require("rimraf");
const chalk = require("chalk");
const process = require("process");
const gitWrapper = require("simple-git/promise");
const ncp = nodeUtil.promisify(require("ncp"));

const argv = process.argv.slice(2);

if (argv.length !== 1) {
  console.log("Usage: npx @jman.me/create-react-app [project_path]");
  console.log(process.argv);
  process.exit(1);
}

const projectName = argv[0];
const projectDir = path.join(projectName);
const srcDir = path.join(projectDir, "src");
const publicDir = path.join(projectDir, "public");
const rawFileDir = path.join(__dirname, "__raw_files__");

(async () => {
  (() => {
    if (fs.existsSync(projectDir)) {
      console.log(chalk.red("fatal"), "Directory already exists, exiting...");
      process.exit(1);
    }
  })();

  // Actual create-react-app
  (() => {
    console.log(chalk.green("running"), "Actual create-react-app...");
    try {
      execSync(`npx --ignore-existing create-react-app --template typescript ${projectDir}`, {});
    } catch (err) {
      console.log(chalk.red("failure"), "Actual create-react-app");
      console.log(err);
      console.log(err.toString());
      console.log(err.output.toString());
      process.exit(1);
    }
  })();

  // Update package.json
  (() => {
    console.log(chalk.green("running"), "Updating package.json");
    const packageJsonPath = path.join(projectDir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

    packageJson.scripts["build:tailwind"] =
      "tailwind build src/styles/tailwind.css -o src/styles/tailwind.output.css";
    packageJson.scripts["prebuild"] = "export NODE_ENV=production; run-s build:tailwind";

    packageJson.scripts["watch:tailwind"] =
      "chokidar 'src/**/*.css' 'src/**/*.scss' --ignore src/styles/tailwind.output.css -c 'npm run build:tailwind'";
    packageJson.scripts["start:react"] = "react-scripts start";
    packageJson.scripts["start"] = "npm-run-all build:tailwind --parallel watch:tailwind start:react";
    packageJson.scripts["build"] = "export NODE_ENV=production; react-scripts build";

    delete packageJson.scripts.eject;

    packageJson.prettier = { printWidth: 95 };
    packageJson.version = "0.1.0";
    packageJson.eslintConfig.rules = {
      "jsx-a11y/anchor-is-valid": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "styled-components",
              message: "Please import from styled-components/macro.",
            },
          ],
          patterns: ["!styled-components/macro"],
        },
      ],
    };

    packageJson.babelMacros = {
      styledComponents: {
        pure: true,
        fileName: false,
        minify: true,
        transpileTemplateLiterals: true,
      },
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  })();

  // Update gitignore
  (() => {
    console.log(chalk.green("running"), "Updating .gitignore");
    const gitignorePath = path.join(projectDir, ".gitignore");
    let gitignore = fs.readFileSync(gitignorePath).toString();

    gitignore += `\

# @jman.me/create-react-app entries
*.output.*
`;

    fs.writeFileSync(gitignorePath, gitignore);
  })();

  // Update tsconfig
  (() => {
    console.log(chalk.green("running"), "Updating tsconfig.json");

    const tsconfigJsonPath = path.join(projectDir, "tsconfig.json");
    const tsconfigJson = JSON.parse(fs.readFileSync(tsconfigJsonPath).toString());

    tsconfigJson.compilerOptions.experimentalDecorators = true;
    tsconfigJson.compilerOptions.baseUrl = ".";
    tsconfigJson.compilerOptions.noImplicitReturns = true;

    fs.writeFileSync(tsconfigJsonPath, JSON.stringify(tsconfigJson, null, 2));
  })();

  // Install packages (mobx, styled components, normalize)
  (() => {
    console.log(chalk.green("running"), "Installing packages");
    execSync(
      `yarn add \
tailwindcss npm-run-all chokidar-cli \
normalize.css \
mobx mobx-react-lite \
lodash.clonedeep @types/lodash.clonedeep \
styled-components @types/styled-components babel-plugin-styled-components \
react-helmet @types/react-helmet`,
      { cwd: projectDir }
    );

    execSync(
      `yarn add -D \
prettier`,
      { cwd: projectDir }
    );
  })();

  // Remove /src contents
  (() => {
    console.log(chalk.green("running"), "removing src/*, public/*");
    rimraf.sync(path.join(srcDir, "*"));
    rimraf.sync(path.join(publicDir, "*"));
  })();

  await (async () => {
    console.log(chalk.green("running"), "creating project files...");
    try {
      await ncp(rawFileDir, projectDir, {
        transform: (read, write, file) => {
          read.pipe(stringReplaceStream("$PROJECT_NAME$", projectName)).pipe(write);
        },
      });
    } catch (err) {
      console.log(err);
    }
  })();

  (() => {
    const dotenvText = `\
EXTEND_ESLINT=true
`;

    fs.writeFileSync(path.join(projectDir, ".env"), dotenvText);
  })();

  await (async () => {
    console.log(chalk.green("running"), "Committing changes...");
    const git = gitWrapper(projectDir);
    await git.add(".");
    await git.commit("Initialize project using @jman.me/create-react-app");
  })();
})();
