# OptimumPPT

这是一个可直接部署的静态演讲网页项目，核心文件如下：

- `index.html`
- `style.css`
- `script.js`
- `Assets/`

## 本地预览

直接双击 `index.html` 即可在浏览器中打开。

如果想用本地静态服务器预览，可以在项目根目录运行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 推荐部署方式

### 方式一：GitHub Pages

1. 新建一个 GitHub 仓库。
2. 将以下内容上传到仓库根目录：
   - `index.html`
   - `style.css`
   - `script.js`
   - `Assets/`
3. 进入仓库 `Settings > Pages`
4. 在 `Build and deployment` 中选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/root`
5. 保存后等待几分钟，GitHub 会生成一个公开访问链接。

### 方式二：Vercel

1. 进入 [Vercel](https://vercel.com)
2. 导入你的 GitHub 仓库
3. 框架选择留空或选择 `Other`
4. 不需要额外构建命令
5. 直接部署

适合当前项目的建议配置：

- Build Command: 留空
- Output Directory: 留空

### 方式三：Netlify

1. 进入 [Netlify](https://www.netlify.com)
2. 新建站点
3. 直接拖拽整个项目文件夹，或连接 GitHub 仓库
4. 等待部署完成并获得访问链接

## 部署时需要保留的内容

必须保留：

- `index.html`
- `style.css`
- `script.js`
- `Assets/`
- `Assets/camps-optimized/`

## 不建议上传的内容

这些文件或目录不是网页运行必需内容：

- `outputs/`
- `.DS_Store`
- `Assets/.DS_Store`
- `.~厦门文旅研学教育运营有限公司品牌画册.pptx`
- `厦门文旅研学教育运营有限公司品牌画册.pptx`

## 建议

如果你是发给别人做宣讲，推荐优先使用：

1. `Vercel`
2. `GitHub Pages`

原因：

- 链接稳定
- 不需要自己维护服务器
- 适合纯静态网页
- 更新内容后可以快速重新部署
