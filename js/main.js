// 商品数据
function getProducts() {
    return [
        {
            id: 1, name: 'JavaScript高级程序设计（第4版）',
            subtitle: 'JS红宝书，高级Web开发技术经典',
            price: 89.00, originalPrice: 119.00,
            author: 'Nicholas C. Zakas', publisher: '人民邮电出版社',
            isbn: '978-7-115-42843-4', sales: 3280,
            stock: 99, category: '编程',
            description: 'JavaScript高级程序员必备参考书，涵盖ES6+新特性，深入讲解JS核心概念、设计模式、浏览器API等内容。',
            image: '../images/product1.svg'
        },
        {
            id: 2, name: '计算机网络（第7版）',
            subtitle: '经典教材，系统学习网络协议',
            price: 45.00, originalPrice: 58.00,
            author: '谢希仁', publisher: '电子工业出版社',
            isbn: '978-7-121-34012-8', sales: 5620,
            stock: 100, category: '计算机基础',
            description: '系统讲解计算机网络体系结构、TCP/IP协议、路由交换等核心知识，是网络工程专业必修教材。',
            image: '../images/product2.svg'
        },
        {
            id: 3, name: 'Python编程：从入门到实践（第2版）',
            subtitle: 'Python入门经典，附赠代码下载',
            price: 62.00, originalPrice: 89.00,
            author: 'Eric Matthes', publisher: '人民邮电出版社',
            isbn: '978-7-115-52856-1', sales: 8900,
            stock: 100, category: '编程',
            description: 'Python入门首选书籍，涵盖基础语法、实战项目（数据可视化、Web开发、游戏开发等）。',
            image: '../images/product3.svg'
        },
        {
            id: 4, name: '算法导论（第3版）',
            subtitle: '算法领域经典，系统全面',
            price: 108.00, originalPrice: 138.00,
            author: 'Thomas H. Cormen', publisher: '机械工业出版社',
            isbn: '978-7-111-40701-0', sales: 2100,
            stock: 50, category: '编程',
            description: '算法领域经典教材，覆盖排序、图算法、动态规划等核心内容。',
            image: '../images/product4.svg'
        },
        {
            id: 5, name: 'HTTP权威指南',
            subtitle: 'Web开发必备参考书',
            price: 79.00, originalPrice: 109.00,
            author: 'David Gourley', publisher: '东南大学出版社',
            isbn: '978-7-121-15541-7', sales: 1850,
            stock: 60, category: 'Web开发',
            description: '详细讲解HTTP协议、Web技术内幕，是Web开发者的必备参考。',
            image: '../images/product5.svg'
        },
        {
            id: 6, name: '深入理解计算机系统（第3版）',
            subtitle: 'CSAPP，系统级编程经典',
            price: 139.00, originalPrice: 179.00,
            author: 'Randal E. Bryant', publisher: '机械工业出版社',
            isbn: '978-7-111-54493-2', sales: 4200,
            stock: 80, category: '计算机基础',
            description: '从程序员视角理解计算机系统，涵盖程序表示、处理器架构、内存层次等核心内容。',
            image: '../images/product6.svg'
        },
        {
            id: 7, name: 'Vue.js实战',
            subtitle: '渐进式JavaScript框架详解',
            price: 59.00, originalPrice: 79.00,
            author: '梁灏', publisher: '人民邮电出版社',
            isbn: '978-7-115-47042-4', sales: 3200,
            stock: 70, category: '前端框架',
            description: 'Vue.js框架实战指南，通过案例讲解组件、路由、状态管理等核心功能。',
            image: '../images/product7.svg'
        },
        {
            id: 8, name: 'CSS权威指南（第3版）',
            subtitle: '样式表现设计必备参考',
            price: 69.00, originalPrice: 99.00,
            author: 'Eric A. Meyer', publisher: '中国电力出版社',
            isbn: '978-7-5083-6688-5', sales: 1580,
            stock: 55, category: 'Web开发',
            description: 'CSS样式设计完整参考，涵盖CSS3新特性、布局模型、动画效果等。',
            image: '../images/product8.svg'
        }
    ];
}

// 渲染首页商品列表
function renderProducts(containerId, filterCategory) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const products = getProducts();
    const filtered = filterCategory ? products.filter(p => p.category === filterCategory) : products;
    let html = '';
    filtered.forEach(p => {
        html += `<div class="product-card" onclick="location.href='product.html?id=${p.id}'">
            <img src="${p.image || '../images/product1.jpg'}" alt="${p.name}">
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">¥${p.price} <small>¥${p.originalPrice}</small></div>
                <div class="product-sales">销量 ${p.sales}</div>
                <button class="add-cart-btn" onclick="event.stopPropagation();addToCart(${p.id})">加入购物车</button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

// 加入购物车
function addToCart(productId) {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) { alert('请先登录'); window.location.href = 'login.html'; return; }
    let cart = JSON.parse(localStorage.getItem('cart_' + user.username) || '[]');
    const idx = cart.findIndex(i => i.id === productId);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ id: productId, qty: 1 });
    localStorage.setItem('cart_' + user.username, JSON.stringify(cart));
    alert('已加入购物车！');
}

// Ajax模拟请求
function ajax(options) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (options.type === 'GET' && options.url.includes('products')) {
                resolve({ data: getProducts(), status: 200 });
            } else {
                resolve({ data: null, status: 200 });
            }
        }, 300);
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 渲染分类按钮
    const categoriesContainer = document.getElementById('categories');
    if (categoriesContainer) {
        const categories = ['全部', '编程', '计算机基础', 'Web开发', '前端框架'];
        let html = '';
        categories.forEach((cat, idx) => {
            const active = idx === 0 ? ' active' : '';
            const filter = cat === '全部' ? '' : cat;
            html += `<button class="category-btn${active}" onclick="filterCategory(this, '${filter}')">${cat}</button>`;
        });
        categoriesContainer.innerHTML = html;
    }

    // 渲染商品
    renderProducts('products');
});

// 分类筛选
function filterCategory(btn, category) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts('products', category);
}
