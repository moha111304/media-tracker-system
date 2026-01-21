document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:5001/media'
    const media_list = document.getElementById('media-list'); 

    chrome.storage.local.get(['lastSearch', 'lastStatus'], (result) => {
        if (result.lastSearch) document.getElementById('search-input').value = result.lastSearch;
        if (result.lastStatus) document.getElementById('status-filter').value = result.lastStatus;
        
        popup();
    });


    // Function to show popups of data
    async function popup() {
        try {
            // Get the CURRENT values from the UI
            const searchVal = document.getElementById('search-input')?.value ?? '';
            const statusVal = document.getElementById('status-filter')?.value ?? '';
            
            // Build the params based on those current values
            const params = new URLSearchParams();
            if (searchVal) params.append('title', searchVal);
            if (statusVal) params.append('tracking_status', statusVal);
            
            const queryString = params.toString();
            const finalUrl = queryString ? `${url}?${queryString}` : url;

            const response = await fetch(finalUrl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const statsBar = document.getElementById('stats-bar');
            const data = await response.json();

            statsBar.textContent = `You have ${data.length} items found.`;

            // Clearing the "Loading..." text first
            media_list.innerHTML = '';

            if (data.length > 0) {
                data.forEach(item => {
                    const div = document.createElement('div');
                    const buttonDiv = document.createElement('div');
                    const childSpan = document.createElement('span');
                    const updateButton = document.createElement('button');
                    const deleteButton = document.createElement('button');

                    // class for styling
                    div.className = 'item-row'; 
                    buttonDiv.className = 'button-half';

                    childSpan.textContent = `${item.title} - ${item.tracking_status}`

                    updateButton.textContent = '+1';
                    deleteButton.innerHTML = '\u{1F5D1}';
    
                    // Event Listener, while we have access to 'item'
                    updateButton.addEventListener('click', () => {
                        updateButton.disabled = true; // Stop double-clicking
                        updateProgress(item.id, item.current_progress, 
                            item.tracking_status, item.total_episodes);
                    });

                    deleteButton.addEventListener("click", function() {
                        // Deletion logic here
                        if (window.confirm("Do you want to delete this media item?")) {
                            deleteButton.disabled = true; // Stop double-clicking
                            deleteMedia(item.id);
                        }
                    });

                    // Append children to the div
                    buttonDiv.appendChild(updateButton);
                    buttonDiv.appendChild(deleteButton);
                    div.appendChild(childSpan);
                    div.appendChild(buttonDiv);

                    media_list.appendChild(div);
                });
            } else {
                media_list.textContent = 'No items found.';
            }

        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }

    async function updateProgress(id, current_progress, tracking_status, total_episodes) {
        let nextProgress = current_progress + 1;
        let nextStatus = tracking_status;

        if (total_episodes > 0 && nextProgress >= total_episodes) {
            nextStatus = 'Completed';
        }

        try {
             const response = await fetch(`${url}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        current_progress: nextProgress, 
                        tracking_status: nextStatus 
                    })
             });
             
        const result = await response.json();

        if (response.ok) {
            console.log('Successfully updated:', result);
            popup();  
        } else {
            alert(`Update Failed: ${result.error || 'Unknown Error'}`);
            popup();  
        }

        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }

    // Edit
    async function deleteMedia(id) {
        try {
             const response = await fetch(`${url}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
             });
             
        const result = await response.json();

        if (response.ok) {
            console.log('Successfully deleted', result);
            popup();  
        } else {
            alert(`Deletion Failed: ${result.error || 'Unknown Error'}`);
            popup();  
        }

        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }

    // For the dropdown
    document.getElementById('status-filter').addEventListener('change', () => {
        const val = document.getElementById('status-filter').value;
        chrome.storage.local.set({ lastStatus: val });
        popup();
    });

    let searchTimeout;
    // For the search box
    document.getElementById('search-input').addEventListener('input', () => {
        const val = document.getElementById('search-input').value;
        chrome.storage.local.set({ lastSearch: val });
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(popup, 300);
    });

    const addBtn = document.getElementById('add-new-btn');
    const addForm = document.getElementById('add-media-form');
    const cancelBtn = document.getElementById('cancel-btn');

    // Toggle the Modal Overlay
    addBtn.addEventListener('click', () => {
        document.getElementById('modal-overlay').style.display = 'flex'; 
        document.getElementById('new-title').focus();
    });

    cancelBtn.addEventListener('click', () => {
        document.getElementById('modal-overlay').style.display = 'none';
    });

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newItem = {
            title: document.getElementById('new-title').value,
            media_type: document.getElementById('new-type').value,
            tracking_status: document.getElementById('new-status').value,
            current_progress: parseInt(document.getElementById('new-progress').value) || 0,
            total_episodes: parseInt(document.getElementById('new-total').value) || 0,
            rating: parseInt(document.getElementById('new-rating').value) || 0
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                addForm.reset();         // Clear the form
                document.getElementById('modal-overlay').style.display = 'none';
                addBtn.style.display = 'block';
                popup();                 // Refresh the list to see the new item!
            }
        } catch (err) {
            console.error("Error adding item:", err);
        }
    });

    popup();
});