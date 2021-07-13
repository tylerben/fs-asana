#!/usr/bin/env node

const asana = require('asana');
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';

type GenericObject = {
  [key: string]: any;
};

const welcomeMsg =
  'Welcome to the File System to Asana Tasks CLI! This CLI will walk you through the process of adding tasks to a specified Asana project based on the contents of a specified base directory.';

const questions = [
  {
    type: 'input',
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

const cli = async (args: any) => {
  console.log(welcomeMsg);
  yargs(hideBin(args)).command(
    '$0 <path>',
    'creates a new asana project and populates it with a task for each directory present in the provided directory',
    (yargs) => {
      return yargs.positional('path', {
        describe: 'file path to base directory',
      });
    },
    async (argv) => {
      try {
        const answers: GenericObject = await inquirer.prompt(questions);
        const asanaClient = asana.Client.create({
          defaultHeaders: { 'asana-enable': 'new_user_task_lists' },
        }).useAccessToken(answers.asanaAccessToken);
        const directories = fs
          .readdirSync(argv.path as string)
          .filter((d: any) => fs.statSync(`${argv.path}/${d}`).isDirectory())
          .reverse();
        for (let directory of directories) {
          const name = `${answers.taskPrefix}${directory}${answers.taskSuffix}`;
          try {
            await asanaClient.tasks.createTask({
              assignee: answers.taskAssignee,
              name,
              projects: [answers.projectId],
            });
            console.log(`Created Task - "${name}"`);
          } catch (err) {
            console.error(err);
          }
        }
        // console.log(answers);
      } catch (err) {
        console.error(err);
      }
    }
  ).argv;
};

cli(process.argv);
