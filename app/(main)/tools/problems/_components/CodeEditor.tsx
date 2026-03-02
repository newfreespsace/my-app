'use client';

import Editor from '@monaco-editor/react';

// 可选：如果你想加速，可以指定国内的 CDN 镜像或本地 public 路径
// loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

const CodeEditor = ({ language, code, setCode }: { language: string; code: string; setCode: (val: string | undefined) => void }) => {
  return (
    <div className='border rounded-md overflow-hidden bg-white'>
      <Editor
        height='400px'
        language={language}
        value={code}
        onChange={setCode}
        theme=''
        options={{
          minimap: { enabled: true }, // 禁用缩略图能稍微提高渲染性能
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true, // 关键：容器大小改变时自动重绘
        }}
      />
    </div>
  );
};

export default CodeEditor;
