# Modify the Project to Add the Following Behavior

## General Clarifications:
- Functionalities that cannot be demonstrated will not be considered.
- Scoring starts at 0.5 points.

## Filtering, Sorting, and Pagination Functionality for the `users` List Component
### Clarifications
- Add filtering, sorting, and pagination functionality to the `users` list component.

### Detailed Scoring
- Ability to sort by a field - backend (0.25p)
- Ability to sort by `email` and `type` - frontend (0.25p)
- Ability to filter by a field - backend (1p)
- Ability to filter by `email` and `type` - frontend (0.25p)
- Ability to navigate between pages - backend (0.25p)
- Ability to navigate between pages - frontend (0.25p)
- Ability to change page size - backend (0.25p)
- Ability to change page size - frontend (0.25p)

## Task Status Operations
### Clarifications
- Add a new entity `TaskStatus`. `TaskStatus` is an entity that has an `id`, `label`, `description`, and `enabled`. The `id` is numeric and serves as the primary key. `label` and `description` are string fields with a maximum length of 255 characters. `enabled` is a boolean used for the soft delete mechanism.
- Add functionality to create, edit, and delete a `TaskStatus`.
- Deleting a `TaskStatus` should be a soft delete (logical deletion). This means changing the `TaskStatus` from enabled to disabled. A `TaskStatus` that is not enabled cannot be used.
- The interface for adding a `TaskStatus` should be accessible from the `TaskStatus` list.
- Navigation routes to the `TaskStatus` list and the `TaskStatus` creation page must be protected (i.e., inaccessible to unauthenticated users).

### Detailed Scoring
- Navigation to the `TaskStatus` list - frontend (0.25p)
- Navigation to the `TaskStatus` creation page - frontend (0.25p)
- Adding a new `TaskStatus` entity - backend (0.25p)
- Adding a `TaskStatus` - backend (0.25p)
- Adding a `TaskStatus` - frontend (0.25p)
- Editing a `TaskStatus` - backend (0.25p)
- Editing a `TaskStatus` - frontend (0.25p)
- Deleting a `TaskStatus` - backend (0.25p)
- Deleting a `TaskStatus` - frontend (0.25p)
- Access control for `TaskStatus` operations - backend (0.25p)
