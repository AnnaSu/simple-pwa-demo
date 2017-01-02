(function(window, document) {
    // 取得會用到的 DOM 物件
    const todoInput = document.getElementById('todoInput');
    const unfinishCount = document.getElementById('unfinishCount');
    const todoListDOM = document.getElementById('todoList');

    // Modle
    const todoList = [];

    // 建立 todo item 的
    const newItem = value => ({ name: value, isComplete: false })

    // 新增、修改、刪除三個函式，具有 sideEffect => render
    const addItem = item => { 
        todoList.push(item); 
        render(todoList);
    }
    const toggleItem = (index) => {
        todoList[index].isComplete = !todoList[index].isComplete;
        render(todoList);
    }
    const removeItem = (index) => {
        console.log(index);
        todoList.splice(index, 1);
        console.log(todoList);
        render(todoList);
    }

    // 綁定 input keydown 事件，按下 Enter 後 addItem 並清空 input
    todoInput.addEventListener('keydown', (event) => {
        if(event.keyCode === 13 && event.target.value) {
            addItem(newItem(event.target.value))
            event.target.value = '';
        }
    });

    // 綁定 ul click 事件，用到了 delegation 的觀念
    todoListDOM.addEventListener('click', event => {
        const target = event.target;
        if(target && (target.matches('a.unfinish') || target.matches('a.finish'))) {
            // 按下了 check button，進行 toggle
            toggleItem(target.dataset.index)
        } else if(target && target.matches('a.del')) {
            // 按下了 del button，進行 remove
            removeItem(target.dataset.index)
        }
    });

    // render 未完成的 item 數量
    function renderUnfinishCount(todoList) {
        const count = todoList.filter(item => !item.isComplete).length;
        unfinishCount.innerText = count;
    }

    // render 所有 todo item
    function renderTodoList(todoList) {
        const html = todoList.map((item, index) => `<li class="list">
                <a class="${item.isComplete ? 'finish' : 'unfinish'}" data-index=${index}></a>
                <p class="unfinishName">
                    ${item.name}
                </p>
                <a class="del" data-index=${index}></a>
            </li>`).join('')
        todoListDOM.innerHTML = html;
    }

    // 合併兩個 render 方法
    function render(todoList) {
        renderTodoList(todoList);
        renderUnfinishCount(todoList);
    }

}(window, document))