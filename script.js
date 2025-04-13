const taskList = [
    { task: 'Write HTML to display "Hello, World!" on the screen.' },
    { task: 'Create an HTML page with a heading that says "Welcome to Coding".' },
    { task: 'Write HTML to display a paragraph with the text "Coding is fun!".' },
    { task: 'Create an HTML page with a bold letter "A".' },
    { task: 'Write HTML to display an italicized word "Learning".' },
    { task: 'Create an HTML page with an underlined sentence "Practice makes perfect".' },
    { task: 'Write HTML to display a horizontal line on the page.' },
    { task: 'Create an HTML page with a list of your favorite fruits.' },
    { task: 'Write HTML to display an image of a cat (use a placeholder image).' },
    { task: 'Create an HTML page with a button that says "Click Me".' },
    { task: 'Write HTML to display a link to "https://www.google.com".' },
    { task: 'Create an HTML page with a table showing your daily schedule.' },
    { task: 'Write HTML to display a form with a text input and a submit button.' },
    { task: 'Create an HTML page with a heading and a subheading.' },
    { task: 'Write HTML to display a blockquote with the text "Coding is creative".' },
    { task: 'Create an HTML page with a colored background (use any color).' },
    { task: 'Write HTML to display a video (use a placeholder video link).' },
    { task: 'Create an HTML page with a checkbox labeled "I agree".' },
    { task: 'Write HTML to display a dropdown menu with three options: Red, Blue, Green.' },
    { task: 'Create an HTML page with a text input labeled "Your Name".' }
];

let currentTask = 0;

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentTask < taskList.length - 1) {
        currentTask++;
        updateTask();
    } else {
        alert('Congratulations! You have completed all the tasks!');
    }
});

function updateTask() {
    document.getElementById('task-instruction').textContent = taskList[currentTask].task;
    // Reset Monaco Editor content if needed
    editor.setValue('<!-- Start coding! -->');
}

// Add a dropdown to toggle languages
const languageSelector = document.createElement('select');
const languages = ['javascript', 'html', 'css', 'python'];
languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    languageSelector.appendChild(option);
});

document.querySelector('nav').appendChild(languageSelector);

languageSelector.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);
});

// Ensure the HTML language service is properly initialized
require(['vs/editor/editor.main'], function () {
    monaco.languages.html.htmlDefaults.setOptions({
        format: {
            indentInnerHtml: true,
            wrapLineLength: 120
        },
        suggest: {
            html5: true,
            angular1: false,
            ionic: false
        },
        data: {
            useDefaultDataProvider: true
        }
    });

    // Set default language to HTML
    monaco.editor.setModelLanguage(editor.getModel(), 'html');

    // Enable HTML autocompletion
    monaco.languages.registerCompletionItemProvider('html', {
        provideCompletionItems: function(model, position) {
            const suggestions = [
                {
                    label: '<div>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<div>$0</div>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'HTML div element'
                },
                {
                    label: '<p>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<p>$0</p>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'HTML paragraph element'
                }
                // Add more HTML snippets as needed
            ];
            return { suggestions: suggestions };
        }
    });
});

// Create a custom menu for Monaco Editor
const customMenu = document.createElement('div');
customMenu.id = 'custom-menu';
customMenu.style.position = 'absolute';
customMenu.style.top = '10px';
customMenu.style.right = '10px';
customMenu.style.backgroundColor = 'white';
customMenu.style.border = '1px solid #ccc';
customMenu.style.padding = '10px';
customMenu.style.borderRadius = '5px';
customMenu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
customMenu.textContent = 'Custom Menu';

document.body.appendChild(customMenu);

// Create containers for the three editors
const structureContainer = document.createElement('div');
const styleContainer = document.createElement('div');
const interactionContainer = document.createElement('div');

structureContainer.id = 'structure-editor';
styleContainer.id = 'style-editor';
interactionContainer.id = 'interaction-editor';

// Add titles for each editor
const structureTitle = document.createElement('h2');
structureTitle.textContent = 'Structure (HTML)';
structureTitle.style.fontWeight = 'bold';

const styleTitle = document.createElement('h2');
styleTitle.textContent = 'Style (CSS)';
styleTitle.style.fontWeight = 'bold';

const interactionTitle = document.createElement('h2');
interactionTitle.textContent = 'Interaction (JavaScript)';
interactionTitle.style.fontWeight = 'bold';

// Append titles and editors to the body
document.body.appendChild(structureTitle);
document.body.appendChild(structureContainer);
document.body.appendChild(styleTitle);
document.body.appendChild(styleContainer);
document.body.appendChild(interactionTitle);
document.body.appendChild(interactionContainer);

// Initialize Monaco Editors
require(['vs/editor/editor.main'], function () {
    // Structure Editor (HTML)
    monaco.editor.create(document.getElementById('structure-editor'), {
        value: '<!-- Start coding HTML here -->',
        language: 'html',
        theme: 'vs-light'
    });

    // Style Editor (CSS)
    monaco.editor.create(document.getElementById('style-editor'), {
        value: '/* Start coding CSS here */',
        language: 'css',
        theme: 'vs-light'
    });

    // Interaction Editor (JavaScript)
    monaco.editor.create(document.getElementById('interaction-editor'), {
        value: '// Start coding JavaScript here',
        language: 'javascript',
        theme: 'vs-light'
    });
});
