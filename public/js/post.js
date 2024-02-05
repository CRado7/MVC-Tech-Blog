// Purpose: To handle the creation of a new post
async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

// Purpose: To handle the deletion of a post
async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

// Purpose: To handle the update of a post
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler); 