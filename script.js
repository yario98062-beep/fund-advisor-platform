// 汉堡菜单功能
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

// 初始化汉堡菜单
function initHamburgerMenu() {
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // 点击菜单项关闭菜单并跳转页面
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(e) {
        if (!hamburgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// 滚动隐藏导航栏功能
function initScrollHide() {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动且超过100px时隐藏导航栏
            navbar.classList.add('hidden');
        } else {
            // 向上滚动时显示导航栏
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
}

// 页面切换功能
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    document.getElementById(pageId).classList.add('active');
    
    // 更新导航激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    // 加载对应页面内容
    loadPageContent(pageId);
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 加载页面内容
function loadPageContent(pageId) {
    const contentContainers = {
        'fund-analysis': 'fund-analysis-content',
        'portfolio-diagnosis': 'portfolio-diagnosis-content',
        'family-config': 'family-config-content'
    };
    
    const containerId = contentContainers[pageId];
    if (!containerId) return;
    
    const container = document.getElementById(containerId);
    if (container.innerHTML) return; // 内容已加载
    
    // 加载实际内容
    setTimeout(() => {
        loadActualContent(pageId, container);
    }, 500);
}

// 加载实际内容
function loadActualContent(pageId, container) {
    let content = '';
    
    switch(pageId) {
        case 'fund-analysis':
            content = getFundAnalysisContent();
            break;
        case 'portfolio-diagnosis':
            content = getPortfolioDiagnosisContent();
            break;
        case 'family-config':
            content = getFamilyConfigContent();
            break;
    }
    
    container.innerHTML = content;
    initializeCharts(pageId);
}

// 基金深度分析内容 - 完整内容
function getFundAnalysisContent() {
    return `
        <div class="card">
        <div class="card-title">📊 基金概况与标签</div>
        <div class="margin-bottom">
        <span class="tag high-risk">中高风险</span>
        <span class="tag">混合型</span>
        <span class="tag">偏股</span>
        <span class="tag">港股通</span>
        <span class="tag">医药主题</span>
        </div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">基金经理信息</h3>
        <p><strong>王方舟</strong> - 硕士，从业1.1年，目前管理6只基金，资产规模25.97亿元。</p>
        <p class="content-paragraph">该基金任职期间回报：18.36%，年化回报：365.56%</p>
        </div>
        <div>
        <h3 class="section-heading">资产配置</h3>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">股票占比</div>
        <div class="performance-value neutral">86.28%</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">债券占比</div>
        <div class="performance-value neutral">5.18%</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">现金占比</div>
        <div class="performance-value neutral">16.78%</div>
        </div>
        </div>
        <p class="content-paragraph">注：各类资产占比之和可能超过100%，因部分资产同时计入多个类别</p>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">📈 业绩表现分析</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">阶段收益率</h3>
        <div class="table-container"><table class="data-table">
        <thead>
        <tr>
        <th>时间周期</th>
        <th>收益率</th>
        <th>同类排名</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>近1周</td>
        <td class="positive">+5.53%</td>
        <td>前10%</td>
        </tr>
        <tr>
        <td>近1月</td>
        <td class="positive">+21.42%</td>
        <td>前10%</td>
        </tr>
        <tr>
        <td>近3月</td>
        <td class="positive">+2.73%</td>
        <td>前30%</td>
        </tr>
        <tr>
        <td>近6月</td>
        <td class="positive">+2.44%</td>
        <td>后50%</td>
        </tr>
        <tr>
        <td>近1年</td>
        <td class="positive">+55.49%</td>
        <td>前30%</td>
        </tr>
        <tr>
        <td>今年以来</td>
        <td class="positive">+15.27%</td>
        <td>前10%</td>
        </tr>
        <tr>
        <td>成立以来</td>
        <td class="positive">+86.12%</td>
        <td>前10%</td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <div>
        <h3 class="section-heading">风险收益指标</h3>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">近1年波动率</div>
        <div class="performance-value negative">36.77%</div>
        <div class="margin-top">优于4.49%同类</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">近1年最大回撤</div>
        <div class="performance-value negative">-29.26%</div>
        <div class="margin-top">优于2.26%同类</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">近1年夏普比率</div>
        <div class="performance-value positive">1.53</div>
        <div class="margin-top">优于45.18%同类</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">近2年夏普比率</div>
        <div class="performance-value positive">1.32</div>
        <div class="margin-top">优于83.41%同类</div>
        </div>
        </div>
        </div>
        </div>
        <div class="insight-box">
        <div class="insight-title"><span class="insight-icon">💡</span>📋 业绩分析要点</div>
        <div class="insight-content">
        <p>1. <strong>高收益伴随高波动</strong>：基金近1年收益率55.49%表现突出，但波动率36.77%显著高于同类平均水平，表明基金波动较大。</p>
        <p>2. <strong>风险控制能力偏弱</strong>：最大回撤-29.26%，优于仅2.26%的同类基金，说明抗回撤能力较弱。</p>
        <p>3. <strong>风险调整后收益良好</strong>：夏普比率1.53表明单位风险获得的超额回报较高，投资性价比较好。</p>
        <p>4. <strong>近期表现强劲</strong>：近1个月收益率达21.42%，排名前10%，显示近期医药板块表现活跃。</p>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">📉 回撤分析</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">最大回撤指标</h3>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">近1年最大回撤</div>
        <div class="performance-value negative">-29.26%</div>
        <div class="margin-top">同类排名：后97.74%</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">今年以来最大回撤</div>
        <div class="performance-value negative">-20.15%</div>
        <div class="margin-top">同类排名：后91.35%</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">成立以来最大回撤</div>
        <div class="performance-value negative">-29.26%</div>
        <div class="margin-top">同类排名：后33.27%</div>
        </div>
        </div>
        </div>
        <div>
        <h3 class="section-heading">回撤承受能力评估</h3>
        <div class="insight-box" style="background: #fff3e0;">
        <div class="insight-title"><span class="insight-icon">💡</span>⚠️ 回撤风险提示</div>
        <div class="insight-content">
        <p>1. 该基金最大回撤水平显著高于同类平均，表明基金在下跌行情中调整幅度较大。</p>
        <p>2. 投资者需有较高的风险承受能力，能够承受短期内30%左右的净值波动。</p>
        <p>3. 建议配置比例不宜过高，可作为卫星配置而非核心持仓。</p>
        <p>4. 医药行业本身具有高波动特征，叠加港股市场特性，基金波动性进一步放大。</p>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">🎯 Brinson业绩归因分析</div>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">超额收益 (ER)</div>
        <div class="performance-value positive">+10.45%</div>
        <div class="margin-top">基金相对于基准的超额回报</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">配置收益 (AR)</div>
        <div class="performance-value negative">-10.69%</div>
        <div class="margin-top">行业/资产配置带来的贡献</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">选股收益 (SR)</div>
        <div class="performance-value positive">+21.14%</div>
        <div class="margin-top">个股选择能力带来的贡献</div>
        </div>
        </div>
        <div class="insight-box">
        <div class="insight-title"><span class="insight-icon">💡</span>📊 归因分析结论</div>
        <div class="insight-content">
        <p>1. <strong>选股能力突出</strong>：选股收益贡献21.14%，表明基金经理在个股选择上表现出色，这是基金超额收益的主要来源。</p>
        <p>2. <strong>配置能力较弱</strong>：配置收益为-10.69%，显示基金的行业配置或资产配置策略未能创造正收益，甚至拖累了整体表现。</p>
        <p>3. <strong>净超额收益显著</strong>：尽管配置端表现不佳，但凭借强大的选股能力，基金仍实现了10.45%的超额收益。</p>
        <p>4. <strong>投资风格判断</strong>：该基金经理属于典型的"自下而上"选股型选手，擅长挖掘个股alpha，但在宏观配置层面需要改进。</p>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">📊 持仓穿透分析</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">股票持仓前十大重仓股</h3>
        <p class="content-paragraph">数据截止：2025年12月31日 | 股票投资比例：69.71%</p>
        <div class="stock-grid">
        <div class="stock-item">
        <div class="stock-code">09926</div>
        <div class="stock-name">康方生物</div>
        <div class="stock-ratio">持仓比例：8.32%</div>
        <div class="stock-change negative">较上期：-0.37%</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">01530</div>
        <div class="stock-name">三生制药</div>
        <div class="stock-ratio">持仓比例：8.00%</div>
        <div class="stock-change positive" style="color: #27ae60;">新增持仓</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">06990</div>
        <div class="stock-name">科伦博泰生物-B</div>
        <div class="stock-ratio">持仓比例：8.00%</div>
        <div class="stock-change negative">较上期：-0.38%</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">09606</div>
        <div class="stock-name">映恩生物-B</div>
        <div class="stock-ratio">持仓比例：8.00%</div>
        <div class="stock-change positive">较上期：+0.64%</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">01801</div>
        <div class="stock-name">信达生物</div>
        <div class="stock-ratio">持仓比例：7.85%</div>
        <div class="stock-change negative">较上期：-0.68%</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">01093</div>
        <div class="stock-name">石药集团</div>
        <div class="stock-ratio">持仓比例：6.83%</div>
        <div class="stock-change positive" style="color: #27ae60;">新增持仓</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">01276</div>
        <div class="stock-name">恒瑞医药</div>
        <div class="stock-ratio">持仓比例：6.27%</div>
        <div class="stock-change negative">较上期：-0.65%</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">06160</div>
        <div class="stock-name">百济神州</div>
        <div class="stock-ratio">持仓比例：6.11%</div>
        <div class="stock-change negative">较上期：-2.52%</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">03692</div>
        <div class="stock-name">翰森制药</div>
        <div class="stock-ratio">持仓比例：6.03%</div>
        <div class="stock-change negative">较上期：-2.13%</div>
        </div>
        <div class="stock-item">
        <div class="stock-code">09995</div>
        <div class="stock-name">荣昌生物</div>
        <div class="stock-ratio">持仓比例：4.30%</div>
        <div class="stock-change negative">较上期：-0.08%</div>
        </div>
        </div>
        </div>
        <div>
        <h3 class="section-heading">债券持仓明细</h3>
        <p class="content-paragraph">债券投资比例：5.19%</p>
        <div class="table-container"><table class="data-table">
        <thead>
        <tr>
        <th>债券代码</th>
        <th>债券名称</th>
        <th>持仓比例</th>
        <th>变动</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>019766</td>
        <td>25国债01</td>
        <td>4.08%</td>
        <td class="negative">-0.39%</td>
        </tr>
        <tr>
        <td>019785</td>
        <td>25国债13</td>
        <td>0.61%</td>
        <td class="positive">+0.50%</td>
        </tr>
        <tr>
        <td>019773</td>
        <td>25国债08</td>
        <td>0.25%</td>
        <td class="positive">+0.01%</td>
        </tr>
        <tr>
        <td>019792</td>
        <td>25国债19</td>
        <td>0.25%</td>
        <td style="color: #27ae60;">新增</td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="margin-top">
        <h4 class="sub-heading">行业配置分析</h4>
        <p class="note-text">基金主要投资于港股医药板块，前十大重仓股均为医药生物企业，行业集中度极高，符合"港股通医药"的主题定位。</p>
        </div>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">💡 投资建议与风险提示</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">优势与机会</h3>
        <div class="insight-box" style="background: #e8f5e8;">
        <div class="insight-content">
        <p>✅ <strong>选股能力突出</strong>：Brinson归因显示选股收益达21.14%，基金经理具备优秀的个股挖掘能力。</p>
        <p>✅ <strong>主题鲜明</strong>：专注港股医药赛道，受益于创新药、生物科技等长期成长趋势。</p>
        <p>✅ <strong>业绩表现优异</strong>：近1年收益55.49%，成立以来收益86.12%，均排名同类前30%。</p>
        <p>✅ <strong>风险调整后收益良好</strong>：夏普比率1.53，表明承担单位风险获得的回报较高。</p>
        </div>
        </div>
        </div>
        <div>
        <h3 class="section-heading">风险与挑战</h3>
        <div class="insight-box" style="background: #ffebee;">
        <div class="insight-content">
        <p>⚠️ <strong>高波动高回撤</strong>：波动率36.77%显著高于同类，最大回撤-29.26%风险较大。</p>
        <p>⚠️ <strong>行业集中度高</strong>：重仓港股医药板块，行业风险较为集中。</p>
        <p>⚠️ <strong>配置能力偏弱</strong>：Brinson归因显示配置收益为负值，宏观配置能力有待提升。</p>
        <p>⚠️ <strong>港股市场风险</strong>：港股市场受国际资金流动、汇率等因素影响较大。</p>
        </div>
        </div>
        </div>
        </div>
        <div class="margin-top">
        <h3 class="section-heading">投资者适配性建议</h3>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">风险等级匹配</div>
        <div class="performance-value">积极型及以上</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">建议持仓比例</div>
        <div class="performance-value">≤15%</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">建议持有期限</div>
        <div class="performance-value">≥2年</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">盈利概率(半年)</div>
        <div class="performance-value positive">79.02%</div>
        </div>
        </div>
        </div>
        </div>
        
        <div class="footnote">
        <p><strong>报告说明：</strong></p>
        <p>1. 本报告基于天天基金网、东方财富网公开数据，通过qieman-mcp服务获取并分析生成。</p>
        <p>2. 数据截止日期：基金净值数据截至2026年4月15日，持仓数据截至2025年12月31日。</p>
        <p>3. 业绩归因分析采用Brinson模型，分解超额收益为配置收益(AR)和选股收益(SR)。</p>
        <p>4. 本报告仅供参考，不构成投资建议。投资者应根据自身风险承受能力审慎决策。</p>
        <p>5. 基金有风险，投资需谨慎。过往业绩不代表未来表现。</p>
        <p><strong>报告生成时间：</strong>2026年4月16日 17:00 | <strong>分析师：</strong>OpenClaw Fund-Advisor AI</p>
        </div>
        </div>
        
        `
}

// 组合诊断优化内容 - 完整内容
function getPortfolioDiagnosisContent() {
    return `
        <div class="card">
                    <div class="card-title">📊 现有组合配置</div>
                    <div class="portfolio-grid">
                        <div class="portfolio-item">
                            <div class="fund-code">000001</div>
                            <div class="fund-name">华夏成长</div>
                            <div class="fund-weight">配置比例：30%</div>
                            <div style="margin-bottom: 10px;">
                                <span class="tag high-risk">中高风险</span>
                                <span class="tag">混合型</span>
                                <span class="tag">半导体</span>
                            </div>
                            <div class="fund-return">近1年收益：33.97%</div>
                            <div style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">基金经理：刘睿聪、郑晓辉</div>
                        </div>
                        <div class="portfolio-item">
                            <div class="fund-code">110011</div>
                            <div class="fund-name">易方达优质精选混合(QDII)</div>
                            <div class="fund-weight">配置比例：40%</div>
                            <div style="margin-bottom: 10px;">
                                <span class="tag medium-risk">中风险</span>
                                <span class="tag">QDII</span>
                                <span class="tag">偏股混合</span>
                            </div>
                            <div class="fund-return negative">近1年收益：-3.26%</div>
                            <div style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">基金经理：张坤（从业13.6年）</div>
                        </div>
                        <div class="portfolio-item">
                            <div class="fund-code">270001</div>
                            <div class="fund-name">广发聚富</div>
                            <div class="fund-weight">配置比例：30%</div>
                            <div style="margin-bottom: 10px;">
                                <span class="tag medium-risk">中风险</span>
                                <span class="tag">混合型</span>
                                <span class="tag">航空</span>
                            </div>
                            <div class="fund-return">近1年收益：15.90%</div>
                            <div style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">基金经理：林英睿、陈宇庭</div>
                        </div>
                    </div>
                    <div class="insight-box">
                        <div class="insight-title">📋 组合特征分析</div>
                        <div class="insight-content">
                            <p>1. <strong>风格集中</strong>：三只基金均为偏股混合型，风格偏向成长，缺乏债券等低风险资产配置。</p>
                            <p>2. <strong>风险偏高</strong>：组合整体风险评级为中高风险，110011作为QDII基金增加了海外市场风险暴露。</p>
                            <p>3. <strong>业绩分化</strong>：华夏成长表现优异（近1年+33.97%），但易方达优质精选表现较差（近1年-3.26%）。</p>
                            <p>4. <strong>资产配置</strong>：股票仓位整体较高（平均约80%），缺乏防御性配置。</p>
                        </div>
                    </div>
                </div>
        
                <div class="card">
                    <div class="card-title">📈 相关性分析</div>
                    <div class="correlation-matrix">
                        <div class="correlation-cell header">基金</div>
                        <div class="correlation-cell header">华夏成长</div>
                        <div class="correlation-cell header">易方达优质精选</div>
                        <div class="correlation-cell header">广发聚富</div>
                        
                        <div class="correlation-cell header">华夏成长</div>
                        <div class="correlation-cell">
                            <div class="correlation-value">1.00</div>
                            <div style="font-size: 12px; color: #7f8c8d;">完全相关</div>
                        </div>
                        <div class="correlation-cell">
                            <div class="correlation-value medium">0.50</div>
                            <div style="font-size: 12px; color: #7f8c8d;">中等相关</div>
                        </div>
                        <div class="correlation-cell">
                            <div class="correlation-value medium">0.59</div>
                            <div style="font-size: 12px; color: #7f8c8d;">中等相关</div>
                        </div>
                        
                        <div class="correlation-cell header">易方达优质精选</div>
                        <div class="correlation-cell">
                            <div class="correlation-value medium">0.50</div>
                            <div style="font-size: 12px; color: #7f8c8d;">中等相关</div>
                        </div>
                        <div class="correlation-cell">
                            <div class="correlation-value">1.00</div>
                            <div style="font-size: 12px; color: #7f8c8d;">完全相关</div>
                        </div>
                        <div class="correlation-cell">
                            <div class="correlation-value medium">0.63</div>
                            <div style="font-size: 12px; color: #7f8c8d;">中等偏高</div>
                        </div>
                        
                        <div class="correlation-cell header">广发聚富</div>
                        <div class="correlation-cell">
                            <div class="correlation-value medium">0.59</div>
                            <div style="font-size: 12px; color: #7f8c8d;">中等相关</div>
                        </div>
                        <div class="correlation-cell">
                            <div class="correlation-value medium">0.63</div>
                            <div style="font-size: 12px; color: #7f8c8d;">中等偏高</div>
                        </div>
                        <div class="correlation-cell">
                            <div class="correlation-value">1.00</div>
                            <div style="font-size: 12px; color: #7f8c8d;">完全相关</div>
                        </div>
                    </div>
                    <div class="insight-box">
                        <div class="insight-title">🔍 相关性解读</div>
                        <div class="insight-content">
                            <p>1. <strong>分散性不足</strong>：三只基金相关性在0.50-0.63之间，属于中等偏高相关性，未能有效分散风险。</p>
                            <p>2. <strong>同涨同跌风险</strong>：市场下跌时，三只基金可能同步下跌，组合波动较大。</p>
                            <p>3. <strong>优化空间</strong>：理想组合的基金相关性应低于0.3，建议加入低相关性资产（如债券基金、商品基金等）。</p>
                            <p>4. <strong>风格重叠</strong>：三只基金均偏向大盘成长风格，缺乏价值、小盘等风格互补。</p>
                        </div>
                    </div>
                </div>
        
                <div class="card">
                    <div class="card-title">📉 历史回测分析（近5年：2021-2026）</div>
                    <div class="performance-grid">
                        <div class="performance-item">
                            <div class="performance-label">年化收益率</div>
                            <div class="performance-value negative">-3.26%</div>
                            <div style="font-size: 12px; color: #7f8c8d;">组合整体亏损</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">最大回撤</div>
                            <div class="performance-value negative">-42.72%</div>
                            <div style="font-size: 12px; color: #7f8c8d;">发生在2021.05-2024.09</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">波动率</div>
                            <div class="performance-value">16.73%</div>
                            <div style="font-size: 12px; color: #7f8c8d;">年度化标准差</div>
                        </div>
                        <div class="performance-item">
                            <div class="performance-label">夏普比率</div>
                            <div class="performance-value negative">-0.38</div>
                            <div style="font-size: 12px; color: #7f8c8d;">风险调整后收益为负</div>
                        </div>
                    </div>
                    <div class="warning-box">
                        <div class="warning-title">⚠️ 回测风险提示</div>
                        <div class="insight-content">
                            <p>1. <strong>持续亏损</strong>：近5年年化收益-3.26%，意味着10万元投资5年后缩水至约8.5万元。</p>
                            <p>2. <strong>回撤风险大</strong>：最大回撤-42.72%，在最差情况下投资可能腰斩，需要极强的风险承受能力。</p>
                            <p>3. <strong>风险收益比差</strong>：夏普比率-0.38，表明承担风险未能获得相应回报。</p>
                            <p>4. <strong>市场环境影响</strong>：回测期间（2021-2026）市场整体震荡，但组合表现显著弱于同类平均水平。</p>
                        </div>
                    </div>
                </div>
        
                <div class="card">
                    <div class="card-title">🎲 蒙特卡洛模拟（未来3年）</div>
                    <div class="simulation-controls">
                        <button class="simulation-button" onclick="runMonteCarlo('current')">模拟当前组合</button>
                        <button class="simulation-button" onclick="runMonteCarlo('optimized1')">模拟优化方案1</button>
                        <button class="simulation-button" onclick="runMonteCarlo('optimized2')">模拟优化方案2</button>
                        <div style="margin-left: auto; font-size: 14px; color: #7f8c8d;">
                            模拟次数：<span id="simCount">10,000</span>次 | 初始本金：10万元
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="monteCarloChart"></canvas>
                    </div>
                    <div id="simulationResults" style="margin-top: 20px;">
                        <!-- 模拟结果将动态显示在这里 -->
                    </div>
                    <div class="insight-box">
                        <div class="insight-title">📊 模拟说明</div>
                        <div class="insight-content">
                            <p>1. <strong>模型假设</strong>：基于历史波动率和相关性，使用几何布朗运动模型模拟未来3年收益分布。</p>
                            <p>2. <strong>参数设置</strong>：使用近3年历史数据计算波动率（华夏成长20.52%、易方达优质精选21.30%、广发聚富15.14%）。</p>
                            <p>3. <strong>情景分析</strong>：分别模拟当前组合、优化方案1（调整权重）、优化方案2（加入债券基金）的未来表现。</p>
                            <p>4. <strong>风险提示</strong>：模拟结果基于历史数据，不代表未来实际表现，仅供参考。</p>
                        </div>
                    </div>
                </div>
        
                <div class="card">
                    <div class="card-title">💡 优化建议方案</div>
                    <div class="optimization-grid">
                        <div class="optimization-item">
                            <div class="optimization-title">方案1：权重调整（保持原基金）</div>
                            <div style="margin-bottom: 15px;">
                                <p><strong>配置调整：</strong></p>
                                <ul style="padding-left: 20px; margin-top: 10px; color: #5d6d7e;">
                                    <li>华夏成长（000001）：<strong>50%</strong>（原30%）</li>
                                    <li>易方达优质精选（110011）：<strong>20%</strong>（原40%）</li>
                                    <li>广发聚富（270001）：<strong>30%</strong>（原30%）</li>
                                </ul>
                            </div>
                            <div style="margin-top: 15px;">
                                <p><strong>预期改善：</strong></p>
                                <div class="performance-grid" style="grid-template-columns: repeat(2, 1fr); margin-top: 10px;">
                                    <div class="performance-item" style="padding: 10px;">
                                        <div class="performance-label">年化收益</div>
                                        <div class="performance-value negative">-1.96%</div>
                                    </div>
                                    <div class="performance-item" style="padding: 10px;">
                                        <div class="performance-label">最大回撤</div>
                                        <div class="performance-value negative">-43.17%</div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; font-size: 13px; color: #7f8c8d;">
                                <strong>逻辑：</strong>增持表现优异的华夏成长，减持表现不佳的易方达优质精选。
                            </div>
                        </div>
                        <div class="optimization-item">
                            <div class="optimization-title">方案2：加入债券基金（推荐）</div>
                            <div style="margin-bottom: 15px;">
                                <p><strong>配置调整：</strong></p>
                                <ul style="padding-left: 20px; margin-top: 10px; color: #5d6d7e;">
                                    <li>华夏成长（000001）：<strong>40%</strong></li>
                                    <li>易方达优质精选（110011）：<strong>10%</strong></li>
                                    <li>广发聚富（270001）：<strong>20%</strong></li>
                                    <li>华夏聚利债券A（000014）：<strong>30%</strong></li>
                                </ul>
                            </div>
                            <div style="margin-top: 15px;">
                                <p><strong>预期改善：</strong></p>
                                <div class="performance-grid" style="grid-template-columns: repeat(2, 1fr); margin-top: 10px;">
                                    <div class="performance-item" style="padding: 10px;">
                                        <div class="performance-label">年化收益</div>
                                        <div class="performance-value positive">+0.53%</div>
                                    </div>
                                    <div class="performance-item" style="padding: 10px;">
                                        <div class="performance-label">最大回撤</div>
                                        <div class="performance-value negative">-35.29%</div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; font-size: 13px; color: #7f8c8d;">
                                <strong>逻辑：</strong>加入债券基金降低组合波动，改善风险收益比。
                            </div>
                        </div>
                        <div class="optimization-item">
                            <div class="optimization-title">方案3：风格分散化</div>
                            <div style="margin-bottom: 15px;">
                                <p><strong>配置调整：</strong></p>
                                <ul style="padding-left: 20px; margin-top: 10px; color: #5d6d7e;">
                                    <li>华夏成长（000001）：<strong>30%</strong>（成长风格）</li>
                                    <li>景顺长城沪深300增强（000311）：<strong>30%</strong>（指数增强）</li>
                                    <li>华夏聚利债券A（000014）：<strong>30%</strong>（债券防御）</li>
                                    <li>华夏能源革新（003834）：<strong>10%</strong>（主题投资）</li>
                                </ul>
                            </div>
                            <div style="margin-top: 15px;">
                                <p><strong>核心优势：</strong></p>
                                <ul style="padding-left: 20px; margin-top: 10px; color: #5d6d7e; font-size: 13px;">
                                    <li>风格分散：成长+价值+债券+主题</li>
                                    <li>相关性降低：预计平均相关性<0.3</li>
                                    <li>风险控制：债券提供稳定收益，平滑波动</li>
                                    <li>长期增长：保持足够的股票仓位获取增长</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="insight-box">
                        <div class="insight-title">🎯 优化建议总结</div>
                        <div class="insight-content">
                            <p>1. <strong>优先推荐方案2</strong>：加入30%债券基金（华夏聚利债券A），可将年化收益转正（+0.53%），最大回撤降低7.4个百分点。</p>
                            <p>2. <strong>调整核心问题</strong>：当前组合最大的问题是易方达优质精选（110011）权重过高且近期表现不佳，建议大幅降低其权重至10-20%。</p>
                            <p>3. <strong>增强分散性</strong>：建议加入与现有基金相关性较低的资产，如债券基金、指数基金、商品基金等。</p>
                            <p>4. <strong>长期优化方向</strong>：构建"核心-卫星"组合，核心部分（60-70%）配置稳健型基金，卫星部分（30-40%）配置高增长潜力基金。</p>
                        </div>
                    </div>
                </div>
        
                <div class="card">
                    <div class="card-title">📋 操作执行建议</div>
                    <div class="section-grid">
                        <div>
                            <h3 style="margin-bottom: 15px; color: #2c3e50;">立即调整建议</h3>
                            <div class="insight-box" style="background: #e8f5e8;">
                                <div class="insight-content">
                                    <p>1. <strong>第一步</strong>：将易方达优质精选（110011）权重从40%降至10-20%。</p>
                                    <p>2. <strong>第二步</strong>：增持华夏成长（000001）至40-50%。</p>
                                    <p>3. <strong>第三步</strong>：加入华夏聚利债券A（000014）占20-30%。</p>
                                    <p>4. <strong>第四步</strong>：每半年进行一次再平衡，维持目标配置比例。</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 style="margin-bottom: 15px; color: #2c3e50;">长期跟踪指标</h3>
                            <div class="performance-grid" style="grid-template-columns: repeat(2, 1fr);">
                                <div class="performance-item">
                                    <div class="performance-label">年化收益目标</div>
                                    <div class="performance-value positive">5-8%</div>
                                </div>
                                <div class="performance-item">
                                    <div class="performance-label">最大回撤控制</div>
                                    <div class="performance-value negative">≤ -30%</div>
                                </div>
                                <div class="performance-item">
                                    <div class="performance-label">夏普比率目标</div>
                                    <div class="performance-value">≥ 0.5</div>
                                </div>
                                <div class="performance-item">
                                    <div class="performance-label">再平衡频率</div>
                                    <div class="performance-value">每半年</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="warning-box">
                        <div class="warning-title">⚠️ 重要风险提示</div>
                        <div class="insight-content">
                            <p>1. 本报告基于历史数据和分析，不构成投资建议，投资者应独立判断并承担投资风险。</p>
                            <p>2. 基金投资有风险，过往业绩不代表未来表现，投资者可能面临本金损失。</p>
                            <p>3. 建议在调整投资组合前，咨询专业理财顾问，根据自身风险承受能力制定投资策略。</p>
                            <p>4. 市场环境可能发生变化，建议定期（每季度）审查投资组合并进行必要调整。</p>
                        </div>
                    </div>
                </div>
        
                <div class="footnote">
                    <p><strong>报告说明：</strong></p>
                    <p>1. 本报告基于天天基金网、东方财富网公开数据，通过qieman-mcp服务获取并分析生成。</p>
                    <p>2. 历史回测基于近5年（2021年4月-2026年4月）基金净值数据计算，采用等权重再平衡策略。</p>
                    <p>3. 相关性分析基于近3年日度收益率数据计算，反映基金之间的联动程度。</p>
                    <p>4. 蒙特卡洛模拟基于几何布朗运动模型，使用历史波动率和相关性参数，模拟10,000次未来3年收益分布。</p>
                    <p>5. 优化方案的回测结果基于相同历史期间计算，不代表未来实际表现。</p>
                    <p><strong>报告生成时间：</strong>2026年4月16日 17:26 | <strong>分析师：</strong>OpenClaw Fund-Advisor AI</p>
                    <p><strong>数据更新：</strong>基金净值数据截至2026年4月15日 | <strong>风险提示：</strong>投资有风险，决策需谨慎</p>
                </div>
            </div>
        
            <div id="simulationResults"></div>
            </div>
        </div>
        `;
}

// ==================== 组合诊断优化 - 蒙特卡洛模拟功能 ====================

// 基金数据
const funds = {
    '000001': { name: '华夏成长', volatility: 0.2052, return: 0.3397, weight: 0.3 },
    '110011': { name: '易方达优质精选', volatility: 0.2130, return: -0.0326, weight: 0.4 },
    '270001': { name: '广发聚富', volatility: 0.1514, return: 0.1590, weight: 0.3 },
    '000014': { name: '华夏聚利债券A', volatility: 0.1106, return: 0.2294, weight: 0.3 }
};

// 相关性矩阵
const correlationMatrix = {
    '000001': { '000001': 1.00, '110011': 0.50, '270001': 0.59 },
    '110011': { '000001': 0.50, '110011': 1.00, '270001': 0.63 },
    '270001': { '000001': 0.59, '110011': 0.63, '270001': 1.00 }
};

// 优化方案配置
const portfolios = {
    current: {
        name: '当前组合',
        funds: [
            { code: '000001', weight: 0.3 },
            { code: '110011', weight: 0.4 },
            { code: '270001', weight: 0.3 }
        ],
        color: '#3498db'
    },
    optimized1: {
        name: '优化方案1',
        funds: [
            { code: '000001', weight: 0.5 },
            { code: '110011', weight: 0.2 },
            { code: '270001', weight: 0.3 }
        ],
        color: '#27ae60'
    },
    optimized2: {
        name: '优化方案2',
        funds: [
            { code: '000001', weight: 0.4 },
            { code: '110011', weight: 0.1 },
            { code: '270001', weight: 0.2 },
            { code: '000014', weight: 0.3 }
        ],
        color: '#e74c3c'
    }
};

// 蒙特卡洛模拟参数
const INITIAL_CAPITAL = 100000;
const YEARS = 3;
const SIMULATIONS = 10000;
const MONTHS_PER_YEAR = 12;
const TOTAL_MONTHS = YEARS * MONTHS_PER_YEAR;

let monteCarloChart = null;

// 正态分布随机数生成
function normalRandom(mean = 0, std = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// 计算组合波动率（基于权重、波动率和相关性）
function calculatePortfolioVolatility(portfolio) {
    const n = portfolio.funds.length;
    let variance = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const fundI = portfolio.funds[i];
            const fundJ = portfolio.funds[j];
            const volI = funds[fundI.code].volatility;
            const volJ = funds[fundJ.code].volatility;
            const weightI = fundI.weight;
            const weightJ = fundJ.weight;

            // 获取相关性（如果找不到，假设为0）
            let corr = 0;
            if (correlationMatrix[fundI.code] && correlationMatrix[fundI.code][fundJ.code] !== undefined) {
                corr = correlationMatrix[fundI.code][fundJ.code];
            } else if (fundI.code === fundJ.code) {
                corr = 1;
            }

            variance += weightI * weightJ * volI * volJ * corr;
        }
    }

    return Math.sqrt(variance);
}

// 计算加权平均收益
function calculateWeightedReturn(portfolio) {
    let weightedReturn = 0;
    for (const fund of portfolio.funds) {
        weightedReturn += fund.weight * funds[fund.code].return;
    }
    return weightedReturn;
}

// 运行蒙特卡洛模拟
function runMonteCarlo(portfolioKey) {
    const portfolio = portfolios[portfolioKey];
    const portfolioVolatility = calculatePortfolioVolatility(portfolio);
    const expectedReturn = calculateWeightedReturn(portfolio);

    console.log(`模拟组合: ${portfolio.name}, 预期年化收益: ${(expectedReturn*100).toFixed(2)}%, 波动率: ${(portfolioVolatility*100).toFixed(2)}%`);

    // 模拟结果数组
    const finalValues = [];

    for (let sim = 0; sim < SIMULATIONS; sim++) {
        let value = INITIAL_CAPITAL;

        // 按月模拟
        for (let month = 0; month < TOTAL_MONTHS; month++) {
            // 月收益率 = 月化预期收益 + 随机波动
            const monthlyReturn = expectedReturn / MONTHS_PER_YEAR +
                                 (portfolioVolatility / Math.sqrt(MONTHS_PER_YEAR)) * normalRandom();

            value *= (1 + monthlyReturn);
        }

        finalValues.push(value);
    }

    // 分析结果
    const results = analyzeResults(finalValues, expectedReturn);

    // 更新显示
    updateSimulationDisplay(results, portfolio);

    // 绘制图表
    drawMonteCarloChart(finalValues, portfolio);
}

// 分析模拟结果
function analyzeResults(finalValues, expectedReturn) {
    const sorted = [...finalValues].sort((a, b) => a - b);
    const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
    const median = sorted[Math.floor(sorted.length / 2)];

    // 分位数
    const p5 = sorted[Math.floor(sorted.length * 0.05)];
    const p25 = sorted[Math.floor(sorted.length * 0.25)];
    const p75 = sorted[Math.floor(sorted.length * 0.75)];
    const p95 = sorted[Math.floor(sorted.length * 0.95)];

    // 概率统计
    const probPositive = sorted.filter(v => v > INITIAL_CAPITAL).length / sorted.length * 100;
    const probLoss10 = sorted.filter(v => v < INITIAL_CAPITAL * 0.9).length / sorted.length * 100;
    const probGain20 = sorted.filter(v => v > INITIAL_CAPITAL * 1.2).length / sorted.length * 100;

    // 年化收益率分布
    const annualizedReturns = sorted.map(v => Math.pow(v / INITIAL_CAPITAL, 1/YEARS) - 1);
    const meanAnnualReturn = annualizedReturns.reduce((a, b) => a + b, 0) / annualizedReturns.length;

    return {
        mean, median, p5, p25, p75, p95,
        probPositive, probLoss10, probGain20,
        meanAnnualReturn,
        sorted
    };
}

// 更新模拟结果显示
function updateSimulationDisplay(results, portfolio) {
    const resultsDiv = document.getElementById('simulationResults');

    const html = `
        <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin-top: 20px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">${portfolio.name} 模拟结果</h3>
            <div class="performance-grid">
                <div class="performance-item">
                    <div class="performance-label">平均终值</div>
                    <div class="performance-value ${results.mean > INITIAL_CAPITAL ? 'positive' : 'negative'}">
                        ¥${results.mean.toLocaleString('zh-CN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                    </div>
                </div>
                <div class="performance-item">
                    <div class="performance-label">平均年化收益</div>
                    <div class="performance-value ${results.meanAnnualReturn > 0 ? 'positive' : 'negative'}">
                        ${(results.meanAnnualReturn * 100).toFixed(2)}%
                    </div>
                </div>
                <div class="performance-item">
                    <div class="performance-label">盈利概率</div>
                    <div class="performance-value ${results.probPositive > 50 ? 'positive' : 'negative'}">
                        ${results.probPositive.toFixed(1)}%
                    </div>
                </div>
                <div class="performance-item">
                    <div class="performance-label">损失超10%概率</div>
                    <div class="performance-value ${results.probLoss10 < 30 ? 'positive' : 'negative'}">
                        ${results.probLoss10.toFixed(1)}%
                    </div>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <p><strong>分位数分析：</strong></p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 10px;">
                    <div style="background: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d;">5%分位（悲观）</div>
                        <div style="font-weight: 600; color: #c0392b;">¥${results.p5.toLocaleString('zh-CN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d;">25%分位</div>
                        <div style="font-weight: 600; color: #f39c12;">¥${results.p25.toLocaleString('zh-CN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d;">75%分位</div>
                        <div style="font-weight: 600; color: #27ae60;">¥${results.p75.toLocaleString('zh-CN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d;">95%分位（乐观）</div>
                        <div style="font-weight: 600; color: #27ae60;">¥${results.p95.toLocaleString('zh-CN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    resultsDiv.innerHTML = html;
}

// 绘制蒙特卡洛图表
function drawMonteCarloChart(finalValues, portfolio) {
    const ctx = document.getElementById('monteCarloChart').getContext('2d');

    // 销毁旧图表
    if (monteCarloChart) {
        monteCarloChart.destroy();
    }

    // 创建直方图数据
    const min = Math.min(...finalValues);
    const max = Math.max(...finalValues);
    const binCount = 30;
    const binWidth = (max - min) / binCount;

    const bins = new Array(binCount).fill(0);
    finalValues.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1);
        bins[binIndex]++;
    });

    const binLabels = [];
    for (let i = 0; i < binCount; i++) {
        binLabels.push(`¥${Math.round(min + i * binWidth).toLocaleString('zh-CN')}`);
    }

    monteCarloChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: binLabels,
            datasets: [{
                label: `${portfolio.name} 资产终值分布`,
                data: bins,
                backgroundColor: portfolio.color + '80',
                borderColor: portfolio.color,
                borderWidth: 1,
                barPercentage: 0.9
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `蒙特卡洛模拟结果 - ${portfolio.name} (${SIMULATIONS.toLocaleString()}次模拟)`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#2c3e50'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const percentage = (value / SIMULATIONS * 100).toFixed(1);
                            return `频次: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '3年后资产终值（元）',
                        color: '#2c3e50'
                    },
                    ticks: {
                        maxTicksLimit: 10,
                        callback: function(value, index) {
                            // 只显示部分标签
                            if (index % 5 === 0) {
                                return binLabels[index];
                            }
                            return '';
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '出现频次',
                        color: '#2c3e50'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// 页面加载后自动运行当前组合的模拟
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        runMonteCarlo('current');
    }, 1000);
});

// 家庭配置方案内容 - 完整内容
function getFamilyConfigContent() {
    return `
        <div class="card">
        <div class="card-title">📋 家庭财务状况概览</div>
        <div class="finance-summary">
        <div class="finance-item">
        <div class="finance-label">家庭总资产</div>
        <div class="finance-value">¥1,000,000</div>
        </div>
        <div class="finance-item">
        <div class="finance-label">家庭总负债</div>
        <div class="finance-value negative">¥200,000</div>
        </div>
        <div class="finance-item">
        <div class="finance-label">家庭净资产</div>
        <div class="finance-value positive">¥800,000</div>
        </div>
        <div class="finance-item">
        <div class="finance-label">月收入</div>
        <div class="finance-value positive">¥30,000</div>
        </div>
        <div class="finance-item">
        <div class="finance-label">月支出</div>
        <div class="finance-value">¥10,000</div>
        </div>
        <div class="finance-item">
        <div class="finance-label">月结余</div>
        <div class="finance-value positive">¥20,000</div>
        </div>
        </div>
        <div class="insight-box">
        <div class="insight-title"><span class="insight-icon">💡</span>💰 财务健康状况分析</div>
        <div class="insight-content">
        <p>1. <strong>资产负债结构健康</strong>：负债率20%（负债/资产），处于安全范围内，财务杠杆适中。</p>
        <p>2. <strong>现金流充裕</strong>：月结余20,000元，储蓄率66.7%，具备较强的投资能力。</p>
        <p>3. <strong>投资空间充足</strong>：800,000元可投资资产，适合构建多元化的基金投资组合。</p>
        <p>4. <strong>风险承受能力</strong>：中等风险偏好，适合均衡型投资策略，追求稳健增长。</p>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">🎯 推荐基金投资组合</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">组合配置策略</h3>
        <p class="content-paragraph">基于您的中等风险承受能力，采用"稳健打底、均衡配置、适度进取"的配置思路：</p>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">稳健型配置</div>
        <div class="performance-value">40%</div>
        <div style="font-size: 12px; color: #7f8c8d;">债券基金，提供稳定收益</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">均衡型配置</div>
        <div class="performance-value">40%</div>
        <div style="font-size: 12px; color: #7f8c8d;">混合基金，平衡风险收益</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">进取型配置</div>
        <div class="performance-value">20%</div>
        <div style="font-size: 12px; color: #7f8c8d;">指数/主题基金，获取增长潜力</div>
        </div>
        </div>
        </div>
        <div>
        <h3 class="section-heading">资金分配方案</h3>
        <div class="table-container"><table class="data-table">
        <thead>
        <tr>
        <th>配置类型</th>
        <th>比例</th>
        <th>金额</th>
        <th>每月定投</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>一次性投入</td>
        <td>100%</td>
        <td>¥800,000</td>
        <td>-</td>
        </tr>
        <tr>
        <td>每月定投</td>
        <td>-</td>
        <td>-</td>
        <td>¥10,000</td>
        </tr>
        <tr>
        <td>应急准备金</td>
        <td>建议保留</td>
        <td>¥40,000</td>
        <td>-</td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">📊 精选优质基金组合</div>
        <div class="fund-grid">
        <div class="fund-item">
        <div class="fund-code">000014</div>
        <div class="fund-name">华夏聚利债券A</div>
        <div class="fund-weight">配置比例：40% (¥320,000)</div>
        <div class="margin-bottom">
        <span class="tag low-risk">中低风险</span>
        <span class="tag">债券型</span>
        </div>
        <div class="fund-return">近1年收益：22.94%</div>
        <div class="margin-top">基金经理：武文琦、陆晓天</div>
        </div>
        <div class="fund-item">
        <div class="fund-code">000021</div>
        <div class="fund-name">华夏优势增长混合</div>
        <div class="fund-weight">配置比例：25% (¥200,000)</div>
        <div class="margin-bottom">
        <span class="tag medium-risk">中高风险</span>
        <span class="tag">混合型</span>
        </div>
        <div class="fund-return">近1年收益：44.99%</div>
        <div class="margin-top">基金经理：郑晓辉（从业14.4年）</div>
        </div>
        <div class="fund-item">
        <div class="fund-code">000311</div>
        <div class="fund-name">景顺长城沪深300增强A</div>
        <div class="fund-weight">配置比例：20% (¥160,000)</div>
        <div class="margin-bottom">
        <span class="tag medium-risk">中风险</span>
        <span class="tag">指数增强</span>
        </div>
        <div class="fund-return">近1年收益：29.59%</div>
        <div class="margin-top">基金经理：黎海威（从业12.5年）</div>
        </div>
        <div class="fund-item">
        <div class="fund-code">000031</div>
        <div class="fund-name">华夏复兴混合A</div>
        <div class="fund-weight">配置比例：15% (¥120,000)</div>
        <div class="margin-bottom">
        <span class="tag medium-risk">中高风险</span>
        <span class="tag">混合型</span>
        </div>
        <div class="fund-return">近1年收益：61.76%</div>
        <div class="margin-top">基金经理：黄皓、郑煜</div>
        </div>
        </div>
        <div class="insight-box">
        <div class="insight-title"><span class="insight-icon">💡</span>🎯 基金筛选逻辑</div>
        <div class="insight-content">
        <p>1. <strong>风险分散</strong>：涵盖债券型、混合型、指数型，实现风险有效分散。</p>
        <p>2. <strong>业绩筛选</strong>：精选近1年收益排名前30-40%的优质基金。</p>
        <p>3. <strong>经理经验</strong>：选择基金经理平均从业年限>5年的基金，经验丰富。</p>
        <p>4. <strong>公司实力</strong>：优选华夏基金、景顺长城等头部基金公司产品。</p>
        <p>5. <strong>风险匹配</strong>：组合整体风险评级为中风险，与您的风险承受能力匹配。</p>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">📈 组合历史回测分析（近5年）</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">回测关键指标</h3>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">年化收益率</div>
        <div class="performance-value positive">2.92%</div>
        <div style="font-size: 12px; color: #7f8c8d;">基于历史净值加权计算</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">最大回撤</div>
        <div class="performance-value negative">-38.13%</div>
        <div style="font-size: 12px; color: #7f8c8d;">发生在2021.12-2024.09</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">波动率</div>
        <div class="performance-value">15.10%</div>
        <div style="font-size: 12px; color: #7f8c8d;">年度化标准差</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">夏普比率</div>
        <div class="performance-value">0.0025</div>
        <div style="font-size: 12px; color: #7f8c8d;">风险调整后收益</div>
        </div>
        </div>
        </div>
        <div>
        <h3 class="section-heading">回测结果解读</h3>
        <div class="insight-box">
        <div class="insight-content">
        <p>1. <strong>收益率分析</strong>：年化2.92%的收益率偏低，主要受近5年市场震荡影响。</p>
        <p>2. <strong>风险控制</strong>：最大回撤-38.13%处于中等水平，符合均衡型配置特征。</p>
        <p>3. <strong>市场环境</strong>：回测期间（2021-2026）经历了市场调整期，整体表现受到压制。</p>
        <p>4. <strong>未来展望</strong>：当前市场估值处于历史较低位置，未来有望获得更好的回报。</p>
        </div>
        </div>
        </div>
        </div>
        <div class="warning-box">
        <div class="warning-title"><span class="warning-icon">⚠️</span>⚠️ 重要风险提示</div>
        <div class="insight-content">
        <p>1. 历史回测仅供参考，不代表未来表现。过去5年市场环境特殊，包含多次大幅调整。</p>
        <p>2. 组合最大回撤-38.13%，意味着在最差情况下，您的投资可能面临约30万元的浮亏。</p>
        <p>3. 债券基金占比40%有助于平滑波动，但在利率上行期可能面临净值回调。</p>
        <p>4. 建议持有期限至少3年，以穿越市场周期，获取合理回报。</p>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">💡 投资执行建议</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">分批建仓策略</h3>
        <div class="table-container"><table class="data-table">
        <thead>
        <tr>
        <th>阶段</th>
        <th>时间</th>
        <th>投资金额</th>
        <th>说明</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>第一阶段</td>
        <td>第1个月</td>
        <td>¥400,000</td>
        <td>投入50%资金，建立基础仓位</td>
        </tr>
        <tr>
        <td>第二阶段</td>
        <td>第2-3个月</td>
        <td>¥200,000</td>
        <td>每月投入10万元，逐步加仓</td>
        </tr>
        <tr>
        <td>第三阶段</td>
        <td>第4-6个月</td>
        <td>¥200,000</td>
        <td>完成全部建仓</td>
        </tr>
        <tr>
        <td>持续定投</td>
        <td>第7个月起</td>
        <td>¥10,000/月</td>
        <td>利用月结余进行长期定投</td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <div>
        <h3 class="section-heading">风险控制措施</h3>
        <div class="recommendation-grid">
        <div class="recommendation-item">
        <div class="performance-label">最大浮亏容忍度</div>
        <div class="performance-value negative">-20%</div>
        <div style="font-size: 12px; color: #7f8c8d;">约16万元</div>
        </div>
        <div class="recommendation-item">
        <div class="performance-label">再平衡频率</div>
        <div class="performance-value">每半年</div>
        <div style="font-size: 12px; color: #7f8c8d;">恢复目标配置比例</div>
        </div>
        <div class="recommendation-item">
        <div class="performance-label">止盈目标</div>
        <div class="performance-value positive">+15%</div>
        <div style="font-size: 12px; color: #7f8c8d;">年化收益率目标</div>
        </div>
        <div class="recommendation-item">
        <div class="performance-label">应急准备金</div>
        <div class="performance-value">¥40,000</div>
        <div style="font-size: 12px; color: #7f8c8d;">保留3-6个月生活费</div>
        </div>
        </div>
        </div>
        </div>
        <div class="insight-box">
        <div class="insight-title"><span class="insight-icon">💡</span>📋 后续操作指南</div>
        <div class="insight-content">
        <p>1. <strong>账户开立</strong>：建议在支付宝、天天基金或券商APP开立基金账户。</p>
        <p>2. <strong>买入操作</strong>：按上述分批建仓策略执行，避免一次性满仓。</p>
        <p>3. <strong>定期跟踪</strong>：每月查看一次组合表现，每季度进行一次全面评估。</p>
        <p>4. <strong>再平衡操作</strong>：每半年检查各基金比例，偏离目标5%以上时进行调整。</p>
        <p>5. <strong>心态管理</strong>：市场波动是正常现象，坚持长期投资，避免情绪化操作。</p>
        </div>
        </div>
        </div>
        
        <div class="card">
        <div class="card-title">🎯 预期收益与风险评估</div>
        <div class="section-grid">
        <div>
        <h3 class="section-heading">未来3年预期表现</h3>
        <div class="performance-grid">
        <div class="performance-item">
        <div class="performance-label">乐观情景</div>
        <div class="performance-value positive">8-12%</div>
        <div style="font-size: 12px; color: #7f8c8d;">年化收益率</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">中性情景</div>
        <div class="performance-value">5-8%</div>
        <div style="font-size: 12px; color: #7f8c8d;">年化收益率</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">悲观情景</div>
        <div class="performance-value negative">0-3%</div>
        <div style="font-size: 12px; color: #7f8c8d;">年化收益率</div>
        </div>
        <div class="performance-item">
        <div class="performance-label">最大回撤预期</div>
        <div class="performance-value negative">-25%至-35%</div>
        <div style="font-size: 12px; color: #7f8c8d;">极端市场条件下</div>
        </div>
        </div>
        </div>
        <div>
        <h3 class="section-heading">组合适应性评估</h3>
        <div class="insight-box" style="background: #e8f5e8;">
        <div class="insight-content">
        <p>✅ <strong>风险匹配度：高</strong> - 组合整体风险评级为中风险，与您的中等风险承受能力匹配。</p>
        <p>✅ <strong>流动性匹配：良好</strong> - 保留4万元应急资金，满足短期流动性需求。</p>
        <p>✅ <strong>收益预期合理</strong> - 预期年化5-8%的收益率，符合中等风险投资目标。</p>
        <p>✅ <strong>投资期限匹配</strong> - 建议持有3年以上，与您的长期财务规划相符。</p>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        <div class="footnote">
        <p><strong>报告说明：</strong></p>
        <p>1. 本报告基于您提供的家庭财务状况和中等风险承受能力制定。</p>
        <p>2. 基金数据来源于天天基金网、东方财富网，通过qieman-mcp服务获取。</p>
        <p>3. 历史回测基于近5年（2021年4月-2026年4月）基金净值数据计算。</p>
        <p>4. 预期收益为基于历史数据和当前市场环境的估算，不构成收益承诺。</p>
        <p>5. 投资有风险，入市需谨慎。建议在投资前咨询专业理财顾问。</p>
        <p><strong>报告生成时间：</strong>2026年4月16日 17:15 | <strong>投资顾问：</strong>OpenClaw Fund-Advisor AI</p>
        <p><strong>数据更新：</strong>基金净值数据截至2026年4月15日 | <strong>风险提示：</strong>过往业绩不代表未来表现</p>
        </div>
        </div>
        
        <script>
        // 创建资产配置饼图
        document.addEventListener('DOMContentLoaded', function() {
        const ctx = document.createElement('canvas');
        ctx.id = 'allocationChart';
        document.querySelector('.card:nth-child(3)').appendChild(ctx);
                    
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.appendChild(ctx);
        document.querySelector('.card:nth-child(3)').appendChild(chartContainer);
                    
        const allocationChart = new Chart(ctx, {
        type: 'pie',
        data: {
        labels: ['华夏聚利债券A (40%)', '华夏优势增长混合 (25%)', '景顺长城沪深300增强A (20%)', '华夏复兴混合A (15%)'],
        datasets: [{
        data: [40, 25, 20, 15],
        backgroundColor: [
        '#3498db', // 蓝色 - 债券
        '#27ae60', // 绿色 - 混合1
        '#f39c12', // 橙色 - 指数
        '#e74c3c'  // 红色 - 混合2
        ],
        borderWidth: 1
        }]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
        position: 'right',
        labels: {
        padding: 20,
        usePointStyle: true
        }
        },
        title: {
        display: true,
        text: '基金组合配置比例',
        font: {
        size: 16,
        weight: 'bold'
        },
        color: '#2c3e50'
        }
        }
        }
        });
        });
        </script>
        
        `
    }

// 初始化图表
function initializeCharts(pageId) {
    switch(pageId) {
        case 'fund-analysis':
            initFundPerformanceChart();
            initRiskMetricsChart();
            break;
        case 'portfolio-diagnosis':
            initCorrelationChart();
            initPortfolioAnalysis();
            break;
        case 'family-config':
            initAllocationChart();
            initFamilyPlanning();
            break;
    }
}

// 飞书对话功能
// 启动飞书应用
function launchFeishu() {
    // 尝试打开飞书应用，如果用户选择取消则不会跳转下载页面
    const feishuAppUrl = 'feishu://';
    const feishuDownloadUrl = 'https://www.feishu.cn/download';
    
    // 记录当前时间
    const startTime = Date.now();
    
    // 创建一个隐藏的iframe来尝试打开飞书应用
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = feishuAppUrl;
    document.body.appendChild(iframe);
    
    // 设置超时，如果用户没有在合理时间内响应，则提供下载选项
    setTimeout(() => {
        document.body.removeChild(iframe);
        
        // 检查页面是否仍然活跃（用户没有离开页面）
        // 如果用户选择了打开应用，他们通常会离开页面，所以我们不会跳转
        // 如果用户仍然在页面上，可能是应用未安装或用户取消了
        const timeElapsed = Date.now() - startTime;
        
        // 只有在用户可能没有成功打开应用的情况下才提示下载
        if (timeElapsed > 1000 && document.hasFocus()) {
            if (confirm('似乎无法打开飞书应用。是否要前往下载页面？')) {
                window.open(feishuDownloadUrl, '_blank');
            }
        }
    }, 1500);
    
    addActivity('尝试启动飞书应用', '📱');
}

// 跳转飞书官网
function openFeishuWebsite() {
    window.open('https://www.feishu.cn', '_blank');
    addActivity('访问飞书官网', '🌐');
}

// 模拟AI响应
function getAIResponse(question) {
    const responses = {
        '分析华夏成长基金000001': `根据华夏成长基金(000001)的最新数据：
        
基金概况：
- 基金类型：混合型
- 风险等级：中高风险
- 最新净值：2.3456元
- 近1年收益：33.97%

业绩表现：
- 近1月：+8.23%
- 近3月：+12.45%
- 近1年：+33.97%
- 今年以来：+15.68%

投资建议：
该基金在半导体和科技板块配置较重，近期表现优异，建议作为成长型配置的一部分，建议持仓比例不超过15%。`,

        '优化我的基金组合': `基于您的当前组合分析，建议优化方案：

当前问题：
1. 组合相关性过高（0.50-0.63）
2. 缺乏债券等低风险资产
3. QDII基金占比过高

优化建议：
1. 降低易方达优质精选比例至25%
2. 加入20%债券基金（如华夏聚利债券）
3. 增加10%指数基金分散风险

预期改善：
- 年化收益率：从-3.26%提升至5-8%
- 最大回撤：从-42.72%改善至-25%
- 夏普比率：从-0.38提升至0.8+`,

        '家庭资产配置方案': `基于您的家庭财务状况，推荐配置方案：

资产配置：
- 稳健型（债券基金）：40% - ¥320,000
- 均衡型（混合基金）：40% - ¥320,000  
- 进取型（指数基金）：20% - ¥160,000

具体基金：
1. 华夏聚利债券A (40%)
2. 华夏优势增长混合 (25%)
3. 景顺长城沪深300增强A (20%)
4. 华夏复兴混合A (15%)

执行策略：
- 分批建仓，6个月完成
- 每月定投10,000元
- 每半年再平衡一次`,

        '风险评估和回撤分析': `风险评估报告：

主要风险指标：
- 波动率：16.73%（偏高）
- 最大回撤：-42.72%（严重）
- 夏普比率：-0.38（较差）

风险提示：
1. 组合波动较大，需有较强风险承受能力
2. 最大回撤超过40%，在最差情况下可能面临较大亏损
3. 建议加入债券基金降低整体波动

改进措施：
1. 增加低相关性资产
2. 降低高波动基金权重
3. 建立止损机制`
    };

    return responses[question] || `感谢您的提问："${question}"。作为OpenClaw基金投顾AI，我将为您分析这个问题并生成专业的报告。请稍候...\n\n在实际应用中，这里会调用真实的AI模型来生成个性化的分析报告。`;
}

// 添加动态报告
function addDynamicReport(question, response) {
    const container = document.getElementById('dynamicReports');
    
    // 移除空状态
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const reportId = 'report_' + Date.now();
    const reportCard = document.createElement('div');
    reportCard.className = 'dynamic-report-card';
    reportCard.setAttribute('data-report-id', reportId);
    reportCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <div>
                <h4 style="color: #1a237e; margin: 0 0 0.25rem 0;">AI生成报告</h4>
                <span style="font-size: 0.8rem; color: #666;">${new Date().toLocaleString()}</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="download-single-btn" style="background: #4CAF50; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; gap: 0.25rem;">
                    <span>📥</span> 下载
                </button>
                <button class="delete-single-btn" style="background: #f44336; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; gap: 0.25rem;">
                    <span>🗑️</span> 删除
                </button>
            </div>
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>用户问题：</strong>${question}
        </div>
        <div class="report-content" style="white-space: pre-line; line-height: 1.6;">${response}</div>
    `;
    
    container.appendChild(reportCard);
    container.scrollTop = container.scrollHeight;
    
    // 绑定下载和删除事件
    const downloadBtn = reportCard.querySelector('.download-single-btn');
    const deleteBtn = reportCard.querySelector('.delete-single-btn');
    
    downloadBtn.addEventListener('click', function() {
        downloadSingleReport(question, response, reportId);
    });
    
    deleteBtn.addEventListener('click', function() {
        deleteSingleReport(reportCard, container);
    });
    
    // 更新个人中心统计数据
    updatePersonalCenterStats();
}

// 下载单个报告
function downloadSingleReport(question, response, reportId) {
    const content = `=== AI基金投顾平台 - 单个分析报告 ===\n\n用户问题：${question}\n\nAI回复：\n${response}\n\n报告生成时间：${new Date().toLocaleString()}\n报告ID：${reportId}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI报告_${reportId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addActivity('下载单个报告', '📥');
}

// 删除单个报告
function deleteSingleReport(reportCard, container) {
    if (confirm('确定要删除这个报告吗？此操作不可恢复。')) {
        reportCard.remove();
        
        // 如果删除了所有报告，显示空状态
        const remainingReports = container.querySelectorAll('.dynamic-report-card');
        if (remainingReports.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📊</div>
                    <h3>暂无AI生成报告</h3>
                    <p>通过上方对话与AI助手交流后，生成的分析报告将显示在这里</p>
                </div>
            `;
        }
        
        updatePersonalCenterStats();
        addActivity('删除单个报告', '🗑️');
    }
}

// 更新个人中心统计数据
function updatePersonalCenterStats() {
    const reports = document.querySelectorAll('.dynamic-report-card');
    personalData.totalReports = reports.length;
    updateStats();
}

// 发送消息
function sendMessage() {
    const input = document.getElementById('chatInput');
    const question = input.value.trim();
    
    if (!question) return;
    
    // 添加用户消息
    const messagesContainer = document.getElementById('chatMessages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <div class="message-text">${question}</div>
            <div class="message-time">刚刚</div>
        </div>
    `;
    messagesContainer.appendChild(userMessage);
    
    // 清空输入框
    input.value = '';
    
    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // 模拟AI思考
    setTimeout(() => {
        const response = getAIResponse(question);
        
        // 添加AI消息
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-text">${response}</div>
                <div class="message-time">刚刚</div>
            </div>
        `;
        messagesContainer.appendChild(aiMessage);
        
        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // 添加到动态报告
        addDynamicReport(question, response);
        
    }, 1000 + Math.random() * 2000); // 模拟思考时间
}

// 事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // 功能卡片点击事件
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // 快速提问按钮
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            document.getElementById('chatInput').value = question;
            sendMessage();
        });
    });
    
    // 发送消息按钮
    document.getElementById('sendMessage').addEventListener('click', sendMessage);
    
    // 输入框回车发送
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 初始化首页
    showPage('home');
});

// 图表初始化函数（占位）
function initFundPerformanceChart() {
    const ctx = document.getElementById('fundPerformanceChart')?.getContext('2d');
    if (!ctx) return;
    // 图表初始化代码...
}

function initRiskMetricsChart() {
    const ctx = document.getElementById('riskMetricsChart')?.getContext('2d');
    if (!ctx) return;
    // 图表初始化代码...
}

function initCorrelationChart() {
    const ctx = document.getElementById('portfolioCorrelationChart')?.getContext('2d');
    if (!ctx) return;
    // 图表初始化代码...
}

function initPortfolioAnalysis() {
    // 组合分析初始化代码...
}

function initAllocationChart() {
    const ctx = document.getElementById('familyAllocationChart')?.getContext('2d');
    if (!ctx) return;
    // 图表初始化代码...
}

function initFamilyPlanning() {
    // 家庭规划初始化代码...
}

// ==================== 个人分析中心功能 ====================

// 个人中心数据存储
let personalData = {
    totalReports: 0,
    totalChats: 0,
    serviceTime: 0,
    activities: []
};

// 从localStorage加载个人数据
function loadPersonalData() {
    const savedData = localStorage.getItem('fundAdvisorPersonalData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            personalData = { ...personalData, ...parsedData };
        } catch (e) {
            console.error('加载个人数据失败:', e);
        }
    }
}

// 保存个人数据到localStorage
function savePersonalData() {
    try {
        localStorage.setItem('fundAdvisorPersonalData', JSON.stringify(personalData));
    } catch (e) {
        console.error('保存个人数据失败:', e);
    }
}

// 导出所有报告
function exportAllReports() {
    const reports = document.querySelectorAll('.dynamic-report-card');
    if (reports.length === 0) {
        alert('暂无报告可导出');
        return;
    }

    let allReports = '=== AI基金投顾平台 - 所有分析报告 ===\n\n';
    reports.forEach((report, index) => {
        const question = report.querySelector('div:nth-child(2) strong')?.nextSibling?.textContent || '未知问题';
        const content = report.querySelector('.report-content')?.textContent || '无内容';
        const time = report.querySelector('span')?.textContent || '未知时间';
        
        allReports += `--- 报告 ${index + 1} ---\n`;
        allReports += `生成时间: ${time}\n`;
        allReports += `用户问题: ${question}\n`;
        allReports += `报告内容:\n${content}\n\n`;
    });

    const blob = new Blob([allReports], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `所有报告_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addActivity('导出所有报告', '📥');
    alert(`成功导出 ${reports.length} 个报告`);
}

// 清空所有报告
function clearAllReports() {
    const reports = document.querySelectorAll('.dynamic-report-card');
    if (reports.length === 0) {
        alert('暂无报告可清空');
        return;
    }

    if (confirm(`确定要清空所有 ${reports.length} 个报告吗？此操作不可恢复。`)) {
        const container = document.getElementById('dynamicReports');
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <h3>暂无AI生成报告</h3>
                <p>通过上方对话与AI助手交流后，生成的分析报告将显示在这里</p>
            </div>
        `;
        personalData.totalReports = 0;
        updateStats();
        addActivity('清空所有报告', '🗑️');
        alert('所有报告已清空');
    }
}

// 显示分析历史
function showAnalysisHistory() {
    const reports = document.querySelectorAll('.dynamic-report-card');
    if (reports.length === 0) {
        alert('暂无分析历史记录');
        return;
    }

    // 创建历史分析模态框
    const modal = document.createElement('div');
    modal.className = 'analysis-history-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        width: 90%;
    `;

    let content = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2 style="margin: 0; color: #1a237e;">📈 分析历史记录</h2>
            <button onclick="this.closest('.analysis-history-modal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
        </div>
        <div style="margin-bottom: 1rem; color: #666;">共找到 ${reports.length} 条分析记录</div>
    `;

    reports.forEach((report, index) => {
        const question = report.querySelector('div:nth-child(2) strong')?.nextSibling?.textContent || '未知问题';
        const reportContent = report.querySelector('.report-content')?.textContent || '无内容';
        const time = report.querySelector('span')?.textContent || '未知时间';
        const reportId = report.getAttribute('data-report-id') || `report_${index}`;
        
        content += `
            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: #f8f9fa;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; color: #1a237e;">分析报告 ${index + 1}</h4>
                    <span style="font-size: 0.8rem; color: #666;">${time}</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong>用户问题：</strong>${question}
                </div>
                <div style="margin-bottom: 1rem; max-height: 150px; overflow-y: auto; padding: 0.5rem; background: white; border-radius: 4px;">
                    <strong>分析内容：</strong><br>
                    ${reportContent}
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="downloadAnalysisReport('${question}', '${reportContent.replace(/'/g, "\\'")}', '${reportId}')" style="background: #4CAF50; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                        下载报告
                    </button>
                    <button onclick="deleteAnalysisReport(this, '${reportId}')" style="background: #f44336; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                        删除记录
                    </button>
                </div>
            </div>
        `;
    });

    content += `
        <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
            <button onclick="exportAllAnalysisHistory()" style="background: #2196F3; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">
                📥 导出全部历史
            </button>
            <button onclick="this.closest('.analysis-history-modal').remove()" style="background: #666; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">
                关闭
            </button>
        </div>
    `;

    modalContent.innerHTML = content;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    addActivity('查看分析历史', '📈');
}

// 下载单个分析报告
function downloadAnalysisReport(question, content, reportId) {
    const fullContent = `=== AI基金投顾平台 - 分析报告 ===\n\n用户问题：${question}\n\n分析内容：\n${content}\n\n报告ID：${reportId}\n生成时间：${new Date().toLocaleString()}`;
    
    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `分析报告_${reportId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addActivity('下载分析报告', '📥');
}

// 删除分析报告
function deleteAnalysisReport(button, reportId) {
    if (confirm('确定要删除这条分析记录吗？此操作不可恢复。')) {
        const reportCard = document.querySelector(`[data-report-id="${reportId}"]`);
        if (reportCard) {
            reportCard.remove();
            
            // 更新统计
            const container = document.getElementById('dynamicReports');
            const remainingReports = container.querySelectorAll('.dynamic-report-card');
            if (remainingReports.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📊</div>
                        <h3>暂无AI生成报告</h3>
                        <p>通过上方对话与AI助手交流后，生成的分析报告将显示在这里</p>
                    </div>
                `;
            }
            
            updatePersonalCenterStats();
            addActivity('删除分析报告', '🗑️');
            
            // 关闭模态框并重新打开以刷新列表
            const modal = button.closest('.analysis-history-modal');
            if (modal) {
                modal.remove();
                showAnalysisHistory();
            }
        }
    }
}

// 导出全部分析历史
function exportAllAnalysisHistory() {
    const reports = document.querySelectorAll('.dynamic-report-card');
    if (reports.length === 0) {
        alert('暂无分析记录可导出');
        return;
    }

    let content = '=== AI基金投顾平台 - 全部分析历史 ===\n\n';
    reports.forEach((report, index) => {
        const question = report.querySelector('div:nth-child(2) strong')?.nextSibling?.textContent || '未知问题';
        const reportContent = report.querySelector('.report-content')?.textContent || '无内容';
        const time = report.querySelector('span')?.textContent || '未知时间';
        
        content += `--- 报告 ${index + 1} ---\n`;
        content += `生成时间: ${time}\n`;
        content += `用户问题: ${question}\n`;
        content += `分析内容:\n${reportContent}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `全部分析历史_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addActivity('导出全部分析历史', '📥');
}

// 显示个人设置
function showSettings() {
    alert('个人设置功能开发中...\n\n将包含：\n• 通知偏好设置\n• 报告格式配置\n• 数据同步选项\n• 隐私设置');
    addActivity('打开个人设置', '⚙️');
}

// 更新统计数据
function updateStats() {
    document.getElementById('totalReports').textContent = personalData.totalReports;
    document.getElementById('totalChats').textContent = personalData.totalChats;
    document.getElementById('serviceTime').textContent = personalData.serviceTime + '天';
}

// 添加活动记录
function addActivity(title, icon) {
    const activity = {
        title: title,
        icon: icon,
        time: new Date().toLocaleString('zh-CN'),
        id: Date.now()
    };

    personalData.activities.unshift(activity);
    // 增加活动记录数量到50条
    if (personalData.activities.length > 50) {
        personalData.activities = personalData.activities.slice(0, 50);
    }

    renderActivities();
    savePersonalData();
}

// 渲染活动列表
function renderActivities() {
    const container = document.getElementById('activityList');
    if (personalData.activities.length === 0) {
        container.innerHTML = `
            <div class="empty-activity">
                <div class="empty-icon">📝</div>
                <p>暂无活动记录</p>
            </div>
        `;
        return;
    }

    container.innerHTML = personalData.activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// 初始化个人中心
function initPersonalCenter() {
    // 加载保存的个人数据
    loadPersonalData();
    
    // 如果没有历史数据，则使用模拟数据
    if (personalData.serviceTime === 0) {
        personalData.serviceTime = Math.floor(Math.random() * 30) + 1;
    }
    if (personalData.totalChats === 0) {
        personalData.totalChats = Math.floor(Math.random() * 50) + 10;
    }
    
    updateStats();
    
    // 如果没有活动记录，添加一些初始活动
    if (personalData.activities.length === 0) {
        addActivity('登录系统', '👋');
        addActivity('查看基金分析', '📊');
    } else {
        renderActivities();
    }
}

// 导出活动记录
function exportActivityHistory() {
    if (personalData.activities.length === 0) {
        alert('暂无活动记录可导出');
        return;
    }

    let content = '=== AI基金投顾平台 - 活动记录 ===\n\n';
    personalData.activities.forEach((activity, index) => {
        content += `${index + 1}. ${activity.icon} ${activity.title} - ${activity.time}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `活动记录_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addActivity('导出活动记录', '📥');
}

// 清空活动记录
function clearActivityHistory() {
    if (confirm('确定要清空所有活动记录吗？此操作不可恢复。')) {
        personalData.activities = [];
        renderActivities();
        savePersonalData();
        addActivity('清空活动记录', '🗑️');
    }
}

// 显示所有活动记录
function showAllActivities() {
    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.innerHTML = '';
        personalData.activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            activityList.appendChild(activityItem);
        });
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initPersonalCenter();
    initHamburgerMenu();
    initScrollHide();
});