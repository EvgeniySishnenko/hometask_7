/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// вызов фукции при загрузки браузера
addCookieTable();

// здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
filterNameInput.addEventListener('keyup', function() {
    const cookieObj = parsInt();

    listTable.innerHTML = '';

    for (let key in cookieObj) {
        if (!(isMatching(key, filterNameInput.value) || isMatching(cookieObj[key], filterNameInput.value))) {
            listTable.innerHTML = `<tr> 
                <td>${key}</td> 
                <td>${cookieObj[key]}</td> 
                <td><a href="" data-key="${key}">Удалить</a></td>
                </tr>`;

        }
    }

});

// сортировка куки
function isMatching (full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        return true;
    }

    return false;
}

// удаление куки
listTable.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target.dataset.key);
    if (e.target.dataset.key) {
        document.cookie = e.target.dataset.key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    addCookieTable();
});

// здесь можно обработать нажатие на кнопку "добавить cookie"
addButton.addEventListener('click', () => {
    
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    addCookieTable();
    addNameInput.value = '';
    addValueInput.value = '';
});

// функция добавление куки
function addCookieTable () {
    const cookieObj = parsInt();

    listTable.innerHTML = '';

    for (let key in cookieObj) {
        if (cookieObj) {
            listTable.innerHTML = `<tr> 
            <td>${key}</td> 
            <td>${cookieObj[key]}</td> 
            <td><a href="" data-key="${key}">Удалить</a></td>
            </tr>`;

        }
    }
}

// преобразование в объект куки 
function parsInt () {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});
}
