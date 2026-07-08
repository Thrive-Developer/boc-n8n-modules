# n8n-nodes-keloola-projects

This is an n8n community node package for **Keloola Projects**. It integrates the Keloola Projects external API with n8n workflows.

[n8n](https://n8n.io/) is a workflow automation platform.

## Installation

Follow the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Deploy to npmjs

```bash
cd n8n-modules/n8n-nodes-keloola-projects
npm install
npm run lint
npm run build
npm publish --dry-run --access public
npm publish --access public
```

Increase `version` before publishing. This scoped package must stay public on npmjs.

## Credentials

Create a **Keloola Projects API** credential in n8n with:

- **API Base URL**: The base URL for the Keloola Projects API.
- **Access Token**: Bearer token used to authenticate requests.

## Operations

### Resource: Connector Field

- **Get Many**: Retrieve active connector task fields and valid BOS option IDs.

### Resource: Note

- **Get Many**: Retrieve paginated notes.
- **Get**: Retrieve one note by ID.
- **Create Note**: Create a note with title, content, and optional project UUID.
- **Update Note**: Update an existing note.
- **Delete Note**: Delete a note permanently.

### Resource: Project

- **Get Many**: Retrieve paginated projects.
- **Get**: Retrieve one project by ID.
- **Get Sprints**: Retrieve project sprints with optional status filtering.
- **Get Sprint**: Retrieve one sprint by ID.
- **Get Board Columns**: Retrieve project board columns.
- **Get Labels**: Retrieve project labels.

### Resource: Task

- **List Tasks**: Retrieve paginated tasks for a project, with filters for search, priority, type, and assignee.
- **Get Task Detail**: Retrieve one task by UUID.
- **Create Task**: Create a new task with task fields and optional BOS connector fields.
- **Update Task**: Update editable task fields and optional BOS connector fields.
- **Delete Task**: Delete a task permanently by UUID.

### Resource: Task Comment

- **Get Many**: Retrieve comments for a task.
- **Create**: Add a task comment or reply to a parent comment.

### Resource: Task Time Log

- **Get Many**: Retrieve time logs for a task.
- **Create**: Log time against a task.

### Resource: User

- **Get Many**: Retrieve paginated users.
- **Get**: Retrieve one user by ID.

## Development

From this module directory:

```bash
npm ci
npm run lint
npm run build
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Keloola n8n modules repository](https://github.com/Thrive-Developer/keloola-n8n-modules)
