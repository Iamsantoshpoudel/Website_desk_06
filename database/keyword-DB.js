// main.js

import { keywordDB } from './FirebaseConfig.js'; // Import the database references

const validPasswords = ['891147913']; // Add your valid password(s) here

function handleSearch(event) {
    event.preventDefault(); // Prevent form submission

    const keywords = document.getElementById('search-input').value.trim();
    const password = document.getElementById('password').value.trim();

    // Clear previous messages
    document.getElementById('incorrect').innerText = '';
    document.getElementById('response').innerText = '';

    // Check if the password is valid
    if (!validPasswords.includes(password)) {
        document.getElementById('incorrect').innerText = "You are not verified.";
        hideMessageAfterTimeout('incorrect', 6000);
        return;
    }

    // If password is valid, upload data to both Firebase databases
    saveToKeywordDB(keywords, password);
    saveToFormInfoDB(keywords, password);
}

function saveToKeywordDB(keywords, password) {
    const newEntry = keywordDB.push();
    newEntry.set({ keyword: keywords, password: password }, function(error) {
        if (error) {
            document.getElementById('incorrect').innerText = "Error sending data";
            hideMessageAfterTimeout('incorrect', 6000);
        } else {
            document.getElementById('response').innerText = "Data submitted successfully";
            hideMessageAfterTimeout('response', 6000);
            $('#searchForm')[0].reset();
        }
    });
}

function saveToFormInfoDB(keywords, password) {
    const newEntry = formInfoDB.push();
    newEntry.set({ keyword: keywords, password: password }, function(error) {
        if (error) {
            document.getElementById('incorrect').innerText = "Error sending data";
            hideMessageAfterTimeout('incorrect', 6000);
        } else {
            document.getElementById('response').innerText += " Data submitted successfully ";
            hideMessageAfterTimeout('response', 6000);
        }
    });
}

function hideMessageAfterTimeout(elementId, timeout) {
    setTimeout(function() {
        document.getElementById(elementId).innerText = '';
    }, timeout);
}

// Add event listener for form submission
document.getElementById('searchForm').addEventListener('submit', handleSearch);
