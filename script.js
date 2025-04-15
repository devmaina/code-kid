// --- Configuration & State ---
const MONACO_VERSION = '0.47.0'; // Use a recent version
const MONACO_CDN_PATH = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${MONACO_VERSION}/min/vs`;

// Task List (same as original)
const taskList = [
    { task: 'Write HTML to display "Hello, World!" on the screen.' },
    { task: 'Create an HTML page with a heading that says "Welcome to Coding".' },
    { task: 'Write HTML to display a paragraph with the text "Coding is fun!".' },
    // ... (Add all other tasks here) ...
    { task: 'Create an HTML page with a text input labeled "Your Name".' }
];
let currentTaskIndex = 0;

// To hold Monaco editor instances
let htmlEditor, cssEditor, jsEditor;
let monacoInstance; // To hold the loaded monaco object

// --- DOM Elements ---
const taskInstructionEl = document.getElementById('task-instruction');
const nextBtn = document.getElementById('next-btn');
const runBtn = document.getElementById('run-btn');
const menuButton = document.getElementById('menu-button');
const outputSlot = document.getElementById('output-slot');
const structureEditorEl = document.getElementById('structure-editor');
const styleEditorEl = document.getElementById('style-editor');
const interactionEditorEl = document.getElementById('interaction-editor');

// --- Helper Functions ---

/**
 * Loads a script dynamically and returns a promise.
 * @param {string} src URL of the script to load.
 * @returns {Promise<void>}
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (e) => reject(new Error(`Script load error for ${src}: ${e}`));
        document.body.appendChild(script);
    });
}

/**
 * Updates the task instruction display and resets editors.
 */
function updateTaskDisplay() {
    if (taskInstructionEl) {
        taskInstructionElement.textContent = taskList[currentTaskIndex].task;
    }
    // Reset editors to initial values (or task-specific starting code)
    if (htmlEditor) htmlEditor.setValue('');
    if (cssEditor) cssEditor.setValue('/* Start coding CSS here */');
    if (jsEditor) jsEditor.setValue('// Start coding JavaScript here');
}

/**
 * Runs the code from the editors in the output iframe.
 */
function runCode() {
    if (!htmlEditor || !cssEditor || !jsEditor || !outputSlot) {
        console.error("Editors or output slot not initialized.");
        return;
    }

    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    const outputDocument = outputSlot.contentDocument || outputSlot.contentWindow?.document;

    if (outputDocument) {
        outputDocument.open();
        outputDocument.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Output</title>
                <style>
                    body { font-family: sans-serif; }
                    ${cssCode}
                </style>
            </head>
            <body>
           
                ${htmlCode}
                <script>
                    try {
                        ${jsCode}
                    } catch (e) {
                        console.error('Error in user script:', e);
                        const errorDiv = document.createElement('div');
                        errorDiv.style.color = 'red';
                        errorDiv.style.fontFamily = 'monospace';
                        errorDiv.textContent = 'Script Error: ' + e.message;
                        document.body.appendChild(errorDiv);
                    }
                <\/script>
            </body>
            </html>
        `);
        outputDocument.close();
    } else {
        console.error("Could not access output iframe document.");
    }
}

/**
 * Initializes Monaco Editor instances.
 */
function initializeEditors(monaco) {
    monacoInstance = monaco; // Store the monaco object

    const commonEditorOptions = {
        theme: 'vs-light', // Or 'vs-dark'
        automaticLayout: true, // Adjusts editor size on container resize
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on', // Enable word wrapping
        scrollBeyondLastLine: false,
        quickSuggestions: true, // Enable suggestions
        suggestOnTriggerCharacters: true
    };

    if (structureEditorEl) {
        htmlEditor = monaco.editor.create(structureEditorEl, {
            ...commonEditorOptions,
            value: '',
            language: 'html'
        });
    }

    if (styleEditorEl) {
        cssEditor = monaco.editor.create(styleEditorEl, {
            ...commonEditorOptions,
            value: '/* Start coding CSS here */',
            language: 'css'
        });
    }

    if (interactionEditorEl) {
        jsEditor = monaco.editor.create(interactionEditorEl, {
            ...commonEditorOptions,
            value: '// Start coding JavaScript here',
            language: 'javascript'
        });
    }

    // Configure language features (optional but good)
    monaco.languages.html.htmlDefaults.setOptions({
        suggest: { html5: true, angular1: false, ionic: false }, // Be specific
        data: { useDefaultDataProvider: true }
    });
    monaco.languages.css.cssDefaults.setOptions({
        validate: true,
        lint: { compatibleVendorPrefixes: 'warning', vendorPrefix: 'warning' },
        data: { useDefaultDataProvider: true }
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ESNext, // Use modern JS target
        allowNonTsExtensions: true
    });

    console.log("Monaco Editors Initialized.");
    updateTaskDisplay(); // Display the first task
}

/**
 * Determines if a color is dark or bright.
 * @param {string} color - The color in hex format (e.g., "#RRGGBB").
 * @returns {boolean} - True if the color is dark, false otherwise.
 */
function isColorDark(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128; // Dark if luminance is less than 128
}

/**
 * Shows the K12 class menu.
 */
function showK12Menu() {
    // Remove existing menu if any
    const existingMenu = document.getElementById('menu-content');
    if (existingMenu) existingMenu.remove();

    const menuContent = document.createElement('div');
    menuContent.id = 'menu-content';

    const classes = [
        { class: 'Kindergarten', age: '5-6 years', color: 'var(--clr-primary-lighter)' },
        { class: 'Grade 1', age: '6-7 years', color: 'var(--clr-secondary)' },
        { class: 'Grade 2', age: '7-8 years', color: 'var(--clr-accent)' },
        { class: 'Grade 3', age: '8-9 years', color: 'var(--clr-primary)' },
        { class: 'Grade 4', age: '9-10 years', color: 'var(--clr-secondary-darker)' },
        { class: 'Grade 5', age: '10-11 years', color: 'var(--clr-primary-darker)' },
        { class: 'Grade 6', age: '11-12 years', color: 'var(--clr-primary-lighter)' },
        { class: 'Grade 7', age: '12-13 years', color: 'var(--clr-secondary)' },
        { class: 'Grade 8', age: '13-14 years', color: 'var(--clr-accent)' },
        { class: 'Grade 9', age: '14-15 years', color: 'var(--clr-primary)' },
        { class: 'Grade 10', age: '15-16 years', color: 'var(--clr-secondary-darker)' }
    ];

    // Update the menu to dynamically set `data-dark` attribute
    classes.forEach(({ class: className, age, color }) => {
        const item = document.createElement('div');
        item.textContent = `${className} (${age})`;
        item.style.backgroundColor = color;
        item.setAttribute('data-dark', isColorDark(getComputedStyle(item).backgroundColor)); // Set data-dark attribute
        item.addEventListener('click', () => {
            updateUIForClass({ class: className, age, color });
            menuContent.remove(); // Close the menu after selection
        });
        menuContent.appendChild(item);
    });

    document.body.appendChild(menuContent);

    // Add listener to close menu when clicking outside
    const closeMenuListener = (e) => {
        if (!menuContent.contains(e.target) && e.target !== menuButton) {
            menuContent.remove();
            document.removeEventListener('click', closeMenuListener);
        }
    };
    // Use setTimeout to avoid immediate closing due to the click that opened it
    setTimeout(() => document.addEventListener('click', closeMenuListener), 0);
}

/**
 * Updates the UI based on the selected class.
 * @param {Object} selectedClass The selected class object.
 */
function updateUIForClass(selectedClass) {
    const header = document.querySelector('nav');
    if (header) {
        header.style.backgroundColor = selectedClass.color; // Change header color
    }

    if (taskInstructionEl) {
        taskInstructionEl.textContent = `Welcome to ${selectedClass.class} (${selectedClass.age})!`;
    }
}

// --- Initialization and Event Listeners ---

// Load Monaco Editor using its AMD loader dynamically
if (structureEditorEl && styleEditorEl && interactionEditorEl) {
    loadScript(`${MONACO_CDN_PATH}/loader.min.js`)
        .then(() => {
            console.log("Monaco loader script loaded.");
            // Configure the loader (must use window.require as it's global after loader runs)
            window.require.config({ paths: { 'vs': MONACO_CDN_PATH } });

            // Load the main editor module
            window.require(['vs/editor/editor.main'], (monaco) => {
                initializeEditors(monaco);
            }, (error) => {
                 console.error("Error loading Monaco editor main:", error);
                 if (taskInstructionEl) {
                    taskInstructionEl.textContent = "Error loading code editor.";
                 }
            });
        })
        .catch(error => {
            console.error("Error loading Monaco loader script:", error);
             if (taskInstructionEl) {
                taskInstructionEl.textContent = "Failed to load editor resources.";
            }
        });
} else {
    console.error("One or more editor container elements not found.");
    if (taskInstructionEl) {
        taskInstructionEl.textContent = "Page structure error.";
    }
}


// Attach Event Listeners
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentTaskIndex < taskList.length - 1) {
            currentTaskIndex++;
            updateTaskDisplay();
        } else {
            alert('Congratulations! You have completed all the tasks!');
        }
    });
}

if (runBtn) {
    runBtn.addEventListener('click', runCode);
}

if (menuButton) {
    menuButton.addEventListener('click', showK12Menu);
}

// Initial setup (display first task instruction text immediately)
if (taskInstructionEl) {
    taskInstructionEl.textContent = taskList[currentTaskIndex].task;
} else {
    console.warn("Task instruction element not found.");
}

console.log("Main script initialized.");