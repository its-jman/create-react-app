#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const nodeUtil = require("util");
const uuid = require("uuid").v4;
const u = require("./utils");
const spawnSync = require("child_process").spawnSync;
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

const projectDir = path.join(argv[0]);
const srcDir = path.join(projectDir, "src");
const rawFileDir = path.join(__dirname, "__raw_files__");

(async () => {
  // Delete old directory, testing...
  (() => {
    console.log(chalk.red("removing"), "Deleting old directory...");
    if (fs.existsSync(projectDir)) {
      rimraf.sync(projectDir);
    }
  })();

  // Actual create-react-app
  (() => {
    console.log(chalk.green("running"), "Actual create-react-app...");
    try {
      execSync(`npx --ignore-existing create-react-app --typescript ${projectDir}`, {});
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

    packageJson.prettier = { printWidth: 110 };
    packageJson.version = "0.1.0";
    delete packageJson.scripts.eject;
    packageJson.eslintConfig.rules = {
      "jsx-a11y/anchor-is-valid": "off",
      "@typescript-eslint/no-unused-vars": "off",
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
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
normalize.css \
mobx mobx-react-lite \
lodash.clonedeep @types/lodash.clonedeep \
styled-components @types/styled-components \
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
    console.log(chalk.green("running"), "removing src/*");
    rimraf.sync(path.join(srcDir, "*"));
  })();

  await (async () => {
    console.log(chalk.green("running"), "creating project files...");
    try {
      await ncp(rawFileDir, srcDir);
    } catch (err) {
      console.log(err);
    }

    // insert app.tsx, index.tsx
    // insert src/state/[ui]
    // insert src/styles/[base,reset]
    // insert src/utils
    // insert src/pages/[home, _home.styled]
  })();

  await (async () => {
    console.log(chalk.green("running"), "Syncing changes to git");
    const git = gitWrapper(projectDir);
    await git.add(".");
    await git.commit("Initialize project using @jman.me/create-react-app");
  })();
})();
