import { defineConfig } from 'vite'

export default defineConfig({
  // 相对路径，部署到根目录或任意子目录都能正常访问资源
  base: './',
  build: {
    outDir: 'dist',
    // index.html 内联了 2MB base64 模型，产物体积本来就大，关掉体积告警
    chunkSizeWarningLimit: 4096
  }
})
