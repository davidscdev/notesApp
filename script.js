const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes')); // Lê o conteúdo do localStorage e coloca em notes

//Popula a tela com o cards com o conteúdo do localStorage
if (notes) {
    notes.forEach(note => addNewNote(note));
}

addBtn.addEventListener('click', () => addNewNote());


function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="tools">
            <button class="edit"> <i class="fas fa-edit"></i> </button>
            <button class="delete"> <i class="fas fa-trash"></i> </button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    //Evento disparado no click do botão delete.
    deleteBtn.addEventListener('click', () => {
        note.remove(); //remove o elemento
        updateLS(); //Atualiza o localStorage retirando o conteúdo do elemento excluido
    });

    //Evento disparado no click do botão edit.
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    //Evento disparado ao digitar no textArea.
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLS(); //Chama a função que atualiza as notas e salva no localStorage.
    });

    document.body.appendChild(note);
}


//Função para atualizar o conteúdo da textarea e inserir no localStorage
function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}