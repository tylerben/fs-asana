# fs-asana

Welcome to this janky, very much in progress project! The aim of the project is to provide a CLI to quickly add Asana tasks to an Asana project for every sub-directory within a specified directory. A simple and very limited use case that I have come across over and over again. For instance, imagine that you wanted to keep track of writing tests for every page or component in your application. You could create an Asana task for each page/component by hand, or you could just run `fs-asana <path-to-base-directory>` and populate the project automagically.

## Getting Started

The CLI can either be installed globally on your machine using npm or you can bypass the need to install it globally by using npx (see the Usage section).

Installing Globally

```bash
npm install -g fs-asana
```

## Usage

To use the CLI, install it globally or use npx. The following example shows you how you could use the CLI to add an Asana task to a project for each directory within the `pages` directory of an app. The `fs-asana` command expects one argument - the base directory to search.

```bash
npx fs-asana ~/Documents/GitHub/example-app/src/pages
```

After running the command, you will be walked through the following series of prompts:

1. Please enter your Asana Personal Access Token.
2. Please enter an Asana project ID that you would like to add tasks to.
3. Please provide an assignee for all tasks.
4. Please optionally provide a prefix for all task names.
5. Please optionally provide a suffix for all task names.

If you provide a valid token, project ID, and assignee ID, you will then start to see notifications rolling into your terminal that your tasks are being added to the specified project.

There are a whole slew of other features I could add to this, but as of right now this project is really just a utility for myself that I don't see others using. If you somehow come across this and want to see some other features added, just holler and open up an issue!
