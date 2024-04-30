# MikroORM with Domain-Driven Design (DDD)

This project demonstrates how to integrate Domain-Driven Design (DDD) principles with MikroORM using EntitySchema.

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/vinialbano/mikro-orm-with-ddd.git
```

2. Install the dependencies:

```bash
cd mikro-orm-with-ddd
npm install
```

## Project Structure

The project follows a typical DDD structure, with the following directories:

- `src`: Contains the application code
  - `common`: Contains common utilities and shared code
  - `lectures`: Contains the lecture-related code
    - `domain`: Contains the domain entities and value objects
    - `application`: Contains the use cases and application services
    - `infra`: Contains the infrastructure code, including the database configuration
- `test`: Contains the tests for the database schema and application logic
