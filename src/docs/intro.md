# Introduction

rxofclock is a tool to convert excel files into repeatable text via handlebars template string. Here is an example.

Supposed to have an excel file called `fruits.xlsx`. It has one sheet called `sheet1`. The data in `sheet1` is:

|  name  | price |
| :----: | :---: |
| banana |   8   |
| apple  |  10   |
| orange |  12   |

If you want to get text as `the price of xxx is xxx`, here are the steps:

- Click the file select or drag your `fruits.xlsx` file on file select
- Select `sheet1`
- Insert the template: `the price of {{[name]}} is {{[price]}}`
- Click `generate` button
- Get the results
