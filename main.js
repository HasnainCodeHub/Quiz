#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.yellow("\t\t  Welcome To Hasnain's Coding World"));
console.log("=".repeat(70));
//fetching data from webAPI
const apiLink = "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        name: "name",
        message: chalk.bold.green("Enter Your Name"),
        type: "input",
        transformer: (input, answers, flags) => {
            return chalk.yellow(input); // Change the input color
        }
    });
    for (let i = 1; i < 10; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val)
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blue("Your Answer Is Correct"));
        }
        else {
            console.log(chalk.red.bold.italic("Your Answer Is Wrong!"), chalk.blue.bold(`Correct Answer is ${data[i].correct_answer}`));
        }
    }
    console.log(`Dear ${chalk.green.bold(name.name)} Your Score is ${chalk.red.bold(score)} out of ${chalk.red.bold("10")}`);
    if (score > 5) {
        console.log(chalk.yellow.italic.bold("You Passed This Quiz"));
    }
    else {
        console.log(chalk.red.italic.bold("You Are Fail Do More Practice And Try Again"));
    }
};
startQuiz();
// console.log(a.name);
