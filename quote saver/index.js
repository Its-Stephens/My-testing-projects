
/**
 * Local Storage Quote Management
 */

const STORAGE_KEY = 'app_user_quotes';

// Elements
const form = document.getElementById('quote-form');
const textInput = document.getElementById('quote-text');
const authorInput = document.getElementById('quote-author');
const list = document.getElementById('quotes-list');
const emptyState = document.getElementById('empty-state');
const countBadge = document.getElementById('item-count');

// Get data from storage
function getStoredData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save data to storage
function saveToStorage(quotes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    updateDisplay();
}

// Render the list to the UI
function updateDisplay() {
    const quotes = getStoredData();
    
    // Update count
    countBadge.textContent = quotes.length.toString();

    // Show or hide empty message
    if (quotes.length === 0) {
        emptyState.style.display = 'block';
        list.innerHTML = '';
        return;
    }
    emptyState.style.display = 'none';

    // Populate list
    list.innerHTML = quotes.map(quote => `
        <article class="quote-item">
            <span class="quote-text">"${quote.text}"</span>
            <div class="quote-footer">
                <span class="quote-author">— ${quote.author}</span>
                <button class="delete-button" onclick="removeQuote('${quote.id}')">Delete</button>
            </div>
        </article>
    `).join('');
}

// Add event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = textInput.value.trim();
    const author = authorInput.value.trim();

    if (text && author) {
        const newQuote = {
            id: Date.now().toString(),
            text: text,
            author: author
        };

        const existing = getStoredData();
        saveToStorage([newQuote, ...existing]);

        form.reset();
        textInput.focus();
    }
});

// Remove item function
window.removeQuote = function(id) {
    const quotes = getStoredData();
    const filtered = quotes.filter(q => q.id !== id);
    saveToStorage(filtered);
};

// Start the app
updateDisplay();
