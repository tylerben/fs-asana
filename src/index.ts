#!/usr/bin/env node

const asana = require('asana');
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import ora from 'ora';

export type Answers = {
  asanaAccessToken: string;
  projectId: string;
  taskAssignee: string;
  taskPrefix?: string;
  taskSuffix?: string;
};

const welcomeMsg =
  'Welcome to the File System to Asana Tasks CLI! This CLI will walk you through the process of adding tasks to a specified Asana project based on the contents of a specified base directory.';

const questions = [
  {
    type: 'password',
    name: 'asanaAccessToken',
    message: 'Please enter your Asana Personal Access Token.',
  },
  {
    type: 'input',
    name: 'projectId',
    message:
      'Please enter an Asana project ID that you would like to add tasks to.',
  },
  {
    type: 'input',
    name: 'taskAssignee',
    message: 'Please provide an assignee for all tasks.',
  },
  {
    type: 'input',
    name: 'taskPrefix',
    message: 'Please optionally provide a prefix for all task names.',
  },
  {
    type: 'input',
    name: 'taskSuffix',
    message: 'Please optionally provide a suffix for all task names.',
  },
];

const cli = async (args: string[]) => {
  yargs(hideBin(args)).command(
    '$0 <path>',
    'creates a new asana project and populates it with a task for each directory present in the provided directory',
    (yargs) => {
      return yargs.positional('path', {
        describe: 'file path to base directory',
      });
    },
    async (argv) => {
      console.log(welcomeMsg);
      try {
        const answers: Answers = await inquirer.prompt(questions);
        const asanaClient = asana.Client.create({
          defaultHeaders: { 'asana-enable': 'new_user_task_lists' },
        }).useAccessToken(answers.asanaAccessToken);
        const directories = fs
          .readdirSync(argv.path as string)
          .filter((d: any) => fs.statSync(`${argv.path}/${d}`).isDirectory())
          .reverse();
        const spinner = ora('').start();
        spinner.color = 'blue';
        for (let directory of directories) {
          const name = `${answers.taskPrefix}${directory}${answers.taskSuffix}`;
          try {
            spinner.text = `creating task: "${name}"`;
            await asanaClient.tasks.createTask({
              assignee: answers.taskAssignee,
              name,
              projects: [answers.projectId],
            });
            // console.log(`Created Task - "${name}"`);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  ).argv;
};

cli(process.argv);
