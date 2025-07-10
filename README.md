# Todo API Manager

A web-based interface for managing Todo tasks using the [JSONPlaceholder]([https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/todos)) API. Built with jQuery and Bootstrap.

## Features

- **Fetch & Display Todos**: Retrieve and list all Todo tasks from the API.
- **Search by User ID**: Filter tasks by a specific user.
- **Add New Todos**: Create and submit new tasks to the API.
- **Update Todos**: Modify task titles or completion status.
- **Responsive UI**: Clean, Bootstrap-powered interface.

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (jQuery-> DOM/AJAX)
- **Styling**: Bootstrap 5, Font Awesome
- **API**: [JSONPlaceholder]([https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/todos))

## Setup & Usage

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/todo-api-manager.git
   ```

2. **Open the project**:
   - Navigate to the folder and open `index.html` in a browser.
   - No server required—runs directly in the browser.

3. **Using the app**:
   - **Search**: Enter a User ID to filter tasks.
   - **Add Task**: Fill the form and click "Add Todo".
   - **Update Task**: Provide a Todo ID and check "Completed" or edit the title.

## Code Structure

- `index.html`: Main HTML file with UI structure.
- `api_calling.js`: Handles all API interactions (fetch, add, update).
- `styles.css`: Custom styles (if added later).

## Example API Response

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

## Limitations

- Uses a mock API (changes aren't persisted).
- No local storage fallback (requires internet).
