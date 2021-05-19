import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  // onSubmit使用理由はEnter押下時にもイベントを発生させるため。
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');

      // submitイベントはブラウザの再読み込みを発生させるため、以下の関数を呼び出して防ぐ。
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="TODOを入力してください"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
