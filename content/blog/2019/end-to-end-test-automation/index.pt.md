---
title: Automação de testes para aplicações web
date: "2019-11-21T22:12:03.284Z"
description: 
langs: ['en', 'pt']
---

Manual testing is by far one of the most painful things in the software development lifecycle, as your products evolve and more functionality is added codebases tends to grow, if your product is being successful the team may grow as well and with it the risk of introducing a regression is even higher.


## What makes a test framework good?
In a few words, it must be simple for:
- Setting up tests
- Writing tests
- Running tests
- Debugging

## Strategies for testing

There are many strategies for test automation out there, the main ones usually being:

#### 1. Stub Requests
Pros
- Fast / Easy / Flexible
- No Server / DB

Cons
- Not True E2E
- Require Fixtures

#### 2. Static User
Pros
- Real Session E2E

Cons
- Requires Server
- Seed the DB
- Shares Test State

#### 3. Dynamic User
Pros
- No State mutation
- Flexible / Powerful

Cons
- DB Setup / Teardown
- Slow / Complex

## The Cypress solution for it

In 2019 I gave a talk for the React Berlin community in which under 25 minutes we discussed common problems, solutions and how Cypress can allow you implementing test automation for web apps in a fast, easy and maintainable way.

[![End to End automation testing with Cypress – Vitor Reis](./youtube_preview.png)](https://www.youtube.com/watch?v=vSFTpcxmAYQ)
Video: Test automation with cypress, React Berlin November, 2019

## References
- Cypress - [Test a React Todo App](https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App)
- Brian Mann – [I see your point, but…  - AssertJS 2018](https://www.youtube.com/watch?v=5XQOK0v_YRE)
