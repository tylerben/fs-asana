# fs-asana

Welcome to the project! The aim of this project is to provide a CLI that can serve as very basic utility for adding tasks to a specified Asana project based on the contents of a provided directory. There have been multiple times where I needed to create an Asana task for each directory within some root directory. This comes up most frequently when I am writing test specs. For instance, when I am writing test specs, I typically like to create an Asana task for each page in my application so I can track which pages have specs and which pages still need them. Instead of creating these tasks by hand in Asana, you can use `fs-asana` to automaticall add a task for each page directory to a specified Asana project.

## Getting Started

The CLI can either be installed globally on your machine using npm or you can bypass the need to install it globally by using npx (see the Usage section).

Installing Globally

```bash
npm install -g fs-asana
```

## Usage

To use the CLI, install it globally or use npx. The following example shows you how you could use the CLI to add an Asana task to a project for each directory within the `pages` directory of an app. The `fs-asana` command expects one argument for the base directory to search.

```bash
fs-asana ~/Documents/GitHub/example-app/src/pages
```
