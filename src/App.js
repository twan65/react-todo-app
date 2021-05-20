import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: 'やること',
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  // refを使用して変数に保存
  // refを使う理由としてはIdはレンダリング対象ではないため
  const nextId = useRef(2501);

  // コンポーネントの性能向上のためuseCallbackを使用
  // propsで渡す関数の場合はuseCallbackを使った方が良い。
  const onInsert = useCallback((text) => {
    // TODO: メッセージ表示
    if (!text) return;

    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1; // nextIdを1増やす
  }, []);

  // TODO削除:filter使って永続性を守る
  const onRemove = useCallback((id) => {
    const tempTodos = todos.filter((todo) => todo.id !== id);
    setTodos((todos) => tempTodos);
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
