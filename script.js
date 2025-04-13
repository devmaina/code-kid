const taskList = [
    { task: 'Write HTML to display "Hello, World!" on the screen.' },
    { task: 'Create an HTML page with a heading that says "My First Page".' },
    { task: 'Write HTML to display a paragraph with the text "I love coding!".' },
    { task: 'Create an HTML page with a bold letter "B".' },
    { task: 'Write HTML to display an italicized word "Fun".' },
    { task: 'Create an HTML page with an underlined sentence "HTML is easy!".' },
    { task: 'Write HTML to draw a horizontal line on the page.' },
    { task: 'Create an HTML page with a list of three animals you like.' },
    { task: 'Write HTML to display a picture of a dog (use a placeholder image).' },
    { task: 'Create an HTML page with a button that says "Press Me".' },
    { task: 'Write HTML to display a link to "https://www.kids.com".' },
    { task: 'Create an HTML page with a table showing your favorite colors.' },
    { task: 'Write HTML to display a form with a text box labeled "Your Name".' },
    { task: 'Create an HTML page with a heading and a subheading about your favorite hobby.' },
    { task: 'Write HTML to display a blockquote with the text "Learning is fun!".' },
    { task: 'Create an HTML page with a background color of your choice.' },
    { task: 'Write HTML to display a video (use a placeholder video link).' },
    { task: 'Create an HTML page with a checkbox labeled "I like coding".' },
    { task: 'Write HTML to display a dropdown menu with three options: Apple, Banana, Cherry.' },
    { task: 'Create an HTML page with a text input labeled "What is your favorite color?".' }
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
