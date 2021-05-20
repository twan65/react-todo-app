import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    <List
      className="TodoList"
      width={512} // 全体大きさ
      height={513} // 全体高さ
      rowCount={todos.length} // 項目数
      rowHeight={57} // 項目高さ
      rowRenderer={rowRenderer} // 項目をレンダリングするときの関数
      list={todos} // 配列
      style={{ outline: 'none' }} // Listタグの基本スタイルを除外
    />
  );
};

export default React.memo(TodoList);
