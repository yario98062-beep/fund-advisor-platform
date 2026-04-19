# AI基金投顾智能平台

基于OpenClaw技术的专业基金分析与配置解决方案，为投资者提供智能化的基金投资顾问服务。

## 🚀 项目特色

- **AI驱动的智能分析** - 基于先进算法提供专业的基金分析
- **全方位投资服务** - 涵盖基金分析、组合优化、家庭配置等全流程
- **飞书深度集成** - 通过飞书与AI助手进行智能对话
- **专业级报告生成** - 自动生成专业的投资分析报告
- **响应式设计** - 完美适配各种设备屏幕

## 📋 核心功能

### 🔍 基金深度分析
- 业绩表现多维分析
- 风险指标评估
- 持仓穿透分析
- Brinson归因分析

### 📊 组合诊断优化
- 智能组合风险评估
- 相关性分析
- 蒙特卡洛模拟
- 科学优化建议

### 🏠 家庭配置方案
- 个性化财务规划
- 风险匹配配置
- 定投策略制定
- 家庭资产配置

### 💬 飞书智能对话
- 与AI助手直接对话
- 实时生成分析报告
- 报告自动同步到个人中心

### 📈 个人分析中心
- 投资报告管理
- 对话历史记录
- 数据统计分析
- 报告导出功能

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript
- **图表库**: Chart.js
- **部署**: GitHub Pages / 静态托管
- **设计**: 响应式设计，现代UI界面

## 🚀 快速开始

### 本地运行

```bash
# 克隆项目
git clone <repository-url>
cd fund-advisor-platform

# 使用Python启动本地服务器
python3 -m http.server 8000

# 或使用Node.js (需要安装http-server)
npx http-server

# 或使用PHP
php -S localhost:8000
```

访问 http://localhost:8000 查看网站

### 在线部署

#### GitHub Pages 部署

1. **创建GitHub仓库**
   - 登录GitHub，创建新仓库
   - 仓库名称：fund-advisor-platform（或其他名称）

2. **上传代码**
   ```bash
   git init
   git add .
   git commit -m "初始提交"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 main，目录选择 /root
   - 点击 Save

4. **访问网站**
   - 几分钟后访问：https://你的用户名.github.io/仓库名

#### 其他部署方式

- **Netlify**: 拖拽项目文件夹到Netlify部署区域
- **Vercel**: 连接GitHub仓库自动部署
- **阿里云OSS**: 上传到对象存储并配置静态网站托管

## 📁 项目结构

```
fund-advisor-platform/
├── index.html              # 主页面
├── styles.css              # 主要样式文件
├── enhanced-styles.css     # 增强样式
├── report-styles.css       # 报告页面样式
├── personal-center.css     # 个人中心样式
├── script.js               # 主要JavaScript逻辑
├── README.md              # 项目说明文档
└── package.json           # 项目配置
```

## 🎯 使用指南

### 首页功能
- 查看平台核心统计数据
- 快速访问各主要功能模块
- 跳转到飞书智能对话

### 基金深度分析
- 输入基金代码进行分析
- 查看详细的分析报告
- 了解基金的历史表现和风险指标

### 组合诊断优化
- 上传或输入投资组合
- 获取风险评估和优化建议
- 使用蒙特卡洛模拟预测

### 家庭配置方案
- 根据家庭财务状况制定配置
- 风险收益平衡分析
- 长期投资策略规划

### 飞书智能对话
- 与AI助手自然语言交流
- 实时生成个性化报告
- 报告自动保存到个人中心

## 🔧 自定义配置

### 修改主题颜色
编辑 `styles.css` 文件中的CSS变量：
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #00bcd4;
  /* 修改这些变量来改变主题色 */
}
```

### 添加新功能模块
1. 在 `index.html` 中添加新的页面section
2. 在CSS文件中添加对应的样式
3. 在 `script.js` 中注册新的页面逻辑

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

如有问题或建议，请通过以下方式联系：
- 提交GitHub Issue
- 发送邮件到项目维护者

---

**注意**: 本项目为演示用途，投资决策请咨询专业金融顾问。
