# n8n-nodes-keloola-projects

## 0.2.0

### Minor Changes

- Rename npm package to `n8n-nodes-keloola-projects`.
- Update node display and credentials for the Keloola Projects external API.
- Add Projects API resources for connector fields, notes, projects, tasks, task comments, task time logs, and users.

## 0.1.0

### Initial Release

- Scaffold Keloola Projects community node package.
- Add Keloola Projects API credential with base URL and bearer token fields.
- Add initial Project resource operations for listing and getting projects.
- Add Note Create Note operation with title, content, and optional project ID.
- Add Task List Tasks operation with project, search, priority, type, assignee, and pagination parameters.
- Add Task Get Task Detail operation using task UUID.
- Add Task Create Task operation with task fields and optional BOS connector fields.
- Add Task Update Task operation with editable task fields and optional BOS connector fields.
- Add Task Delete Task operation using task UUID.
