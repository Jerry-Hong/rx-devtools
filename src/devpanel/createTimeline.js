export default function (sourceName) {
    const draw = document.getElementById('draw');
    const currentDiv = document.createElement('div');

    const title = document.createElement('span');
    title.innerText = sourceName + ': ';
    title.className = 'title';

    const lineSpan = document.createElement('span');
    lineSpan.className = 'timeline';
    lineSpan.id = sourceName + '-span';

    currentDiv.appendChild(title);
    currentDiv.appendChild(lineSpan);
    draw.appendChild(currentDiv);
}