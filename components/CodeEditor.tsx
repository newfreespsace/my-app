'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

export default function CodeEditor() {
  const [code, setCode] = useState<string>('// 在此编写你的代码...\n\nfunction solution() {\n  \n}');

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  return (
    <div className='border rounded-md overflow-hidden'>
      <Editor
        height='400px' // 或者使用 vh
        defaultLanguage='javascript'
        defaultValue={code}
        theme='vs-dark' // 可选: "light" | "vs-dark"
        options={{
          minimap: { enabled: false }, // 禁用缩略图
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true, // 自动适应容器大小
          scrollBeyondLastLine: false,
        }}
        onChange={handleEditorChange}
      />
      {/* 隐藏的 input 或通过 state 提交数据 */}
      <input type='hidden' name='code' value={code} />
    </div>
  );
}
