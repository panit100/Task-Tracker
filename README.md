# Task-Tracker

https://roadmap.sh/projects/task-tracker

# Installation

To use this CLI globally on your machine, you first need to link it.

1. **Clone the repository and navigate into the project directory.**
2. **Register the package.**  
   This command tells Bun that this local directory is available to be linked globally.

```bash
bun link
```

3. **Link the package to craete the global command.**  
   This step creates the `task-cli` command that you can run from anywhere in your terminal. The command name (`task-cli`) is defined in the `bin` field of `package.json`.

```bash
bun link task-tracker
```

_Your `package.json` should look something like this:_

```json
{
  "name": "task-tracker",
  "bin": {
    "task-cli": "./dist/index.js"
  }
}
```

## Usage

**Basic syntax:** `task-cli <command> [arguments...]`

- **Add a new task**

```bash
  task-cli add "<description>"
```

- **Update an existing task**

```bash
  task-cli update <id> "<description>"
```

- **Delete an existing task**

```bash
  task-cli delete <id>
```

- **Mark a task as in progress**

```bash
  task-cli mark-in-progress <id>
```

- **Mark a task as done**

```bash
  task-cli mark-done <id>
```

- **List all tasks**

```bash
  task-cli list
```

- **List all tasks with a specific status**

```bash
  task-cli list "<status : todo | in-progress | done>"
```

- **Show this help message**

```bash
  task-cli help
```
