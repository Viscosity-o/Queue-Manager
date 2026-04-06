import { useState } from 'react';

const Menu = () => {
    const [cartItems] = useState([
        {
            id: 1,
            name: 'Verdant Harvest Bowl',
            price: 24.00,
            portion: 'Standard portion'
        },
        {
            id: 2,
            name: 'Truffle Frites',
            price: 9.00,
            portion: 'Side portion'
        }
    ]);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const service = subtotal * 0.05;
    const total = subtotal + service;

    return (
        <>
            {/* Fonts & Icons */}
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f8faf9;
                    color: #191c1c;
                }

                h1, h2, h3 {
                    font-family: 'Manrope', sans-serif;
                }

                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }

                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    background: rgba(23, 54, 40, 0.8);
                    backdrop-filter: blur(80px);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                    box-shadow: 0 25px 50px -12px rgba(23, 54, 40, 0.2);
                }

                .header-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                }

                .header-nav {
                    display: none;
                    gap: 32px;
                    align-items: center;
                }

                @media (min-width: 768px) {
                    .header-nav {
                        display: flex;
                    }
                }

                .header-nav a {
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .header-nav a.active {
                    color: #5eead4;
                }

                .header-nav a:not(.active) {
                    color: rgba(209, 250, 229, 0.7);
                }

                .header-nav a:hover:not(.active) {
                    color: white;
                }

                .header-actions {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }

                .search-box {
                    display: none;
                    align-items: center;
                    background: rgba(23, 54, 40, 0.4);
                    border-radius: 9999px;
                    padding: 8px 16px;
                    gap: 8px;
                }

                @media (min-width: 768px) {
                    .search-box {
                        display: flex;
                    }
                }

                .search-box input {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 14px;
                    width: 128px;
                    outline: none;
                }

                .search-box input::placeholder {
                    color: rgba(209, 250, 229, 0.4);
                }

                .icon-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: color 0.3s ease;
                }

                .icon-btn:hover {
                    color: #5eead4;
                }

                .hero {
                    position: relative;
                    height: 614px;
                    min-height: 400px;
                    width: 100%;
                    overflow: hidden;
                    margin-bottom: 64px;
                    margin-top: 80px;
                }

                .hero-image {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, rgba(23, 54, 40, 0.8), transparent);
                }

                .hero-content {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 100%;
                    padding: 0 24px;
                    max-width: 1280px;
                    margin: 0 auto;
                }

                .hero-badge {
                    display: inline-block;
                    padding: 8px 16px;
                    background: #c7ebd6;
                    color: #012114;
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    border-radius: 9999px;
                    width: fit-content;
                    margin-bottom: 24px;
                }

                .hero-title {
                    font-size: 48px;
                    font-weight: 800;
                    color: white;
                    line-height: 1.2;
                    margin-bottom: 16px;
                    max-width: 512px;
                    letter-spacing: -0.025em;
                }

                @media (min-width: 768px) {
                    .hero-title {
                        font-size: 56px;
                    }
                }

                .hero-description {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 18px;
                    max-width: 448px;
                    line-height: 1.6;
                }

                .main-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .content-wrapper {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 48px;
                }

                @media (min-width: 1024px) {
                    .content-wrapper {
                        grid-template-columns: 256px 1fr;
                    }
                }

                @media (min-width: 1280px) {
                    .content-wrapper {
                        grid-template-columns: 256px 1fr 320px;
                    }
                }

                .sidebar {
                    display: none;
                }

                @media (min-width: 1024px) {
                    .sidebar {
                        display: block;
                    }
                }

                .sidebar-sticky {
                    position: sticky;
                    top: 112px;
                    space: 8px;
                }

                .category-label {
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #424844;
                    margin-bottom: 24px;
                    margin-left: 8px;
                }

                .category-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 9999px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    border: none;
                    background: none;
                    font-size: 14px;
                }

                .category-link.active {
                    background: #c7ebd6;
                    color: #012114;
                }

                .category-link:not(.active) {
                    color: #424844;
                }

                .category-link:not(.active):hover {
                    background: #e6e9e8;
                }

                .menu-section {
                    margin-bottom: 80px;
                }

                .section-header {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    border-bottom: none;
                    margin-bottom: 32px;
                }

                .section-title {
                    font-size: 30px;
                    font-weight: bold;
                    letter-spacing: -0.025em;
                    color: #173628;
                }

                .section-subtitle {
                    font-size: 12px;
                    color: #424844;
                    font-weight: 500;
                }

                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                    margin-bottom: 32px;
                }

                @media (min-width: 768px) {
                    .grid-2 {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                .featured-item {
                    position: relative;
                    overflow: hidden;
                    border-radius: 12px;
                    background: #f2f4f3;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .featured-item:hover {
                    box-shadow: 0 25px 50px -12px rgba(23, 54, 40, 0.05);
                }

                .featured-item-image {
                    aspect-ratio: 16 / 10;
                    overflow: hidden;
                }

                .featured-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.7s ease;
                }

                .featured-item:hover .featured-item-image img {
                    transform: scale(1.1);
                }

                .featured-item-content {
                    padding: 24px;
                }

                .featured-item-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 8px;
                }

                .featured-item-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #191c1c;
                }

                .featured-item-price {
                    color: #173628;
                    font-weight: bold;
                }

                .featured-item-description {
                    font-size: 14px;
                    color: #424844;
                    margin-bottom: 24px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .featured-item-button {
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(to right, #173628, #2e4d3e);
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    border-radius: 9999px;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.1s ease;
                }

                .featured-item-button:active {
                    transform: scale(0.95);
                }

                .featured-item-badge {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    padding: 8px 12px;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(16px);
                    color: #173628;
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                    border-radius: 9999px;
                }

                .menu-item {
                    display: flex;
                    gap: 24px;
                    padding: 16px;
                    border-radius: 12px;
                    transition: background-color 0.3s ease;
                    cursor: pointer;
                }

                .menu-item:hover {
                    background: #ffffff;
                }

                .menu-item-image {
                    width: 96px;
                    height: 96px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .menu-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .menu-item-content {
                    flex-grow: 1;
                }

                .menu-item-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 8px;
                }

                .menu-item-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #191c1c;
                }

                .menu-item-price {
                    color: #173628;
                    font-weight: bold;
                }

                .menu-item-description {
                    font-size: 14px;
                    color: #424844;
                    margin-bottom: 8px;
                }

                .menu-item-tag {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: -0.025em;
                    color: #173628;
                }

                .menu-item-button {
                    height: 40px;
                    width: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9999px;
                    background: #eceeed;
                    color: #173628;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .menu-item-button:hover {
                    background: #173628;
                    color: white;
                }

                .grid-3 {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }

                @media (min-width: 768px) {
                    .grid-3 {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                .side-item {
                    background: #f2f4f3;
                    padding: 16px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .side-item:hover {
                    background: #e6e9e8;
                }

                .side-item-image {
                    aspect-ratio: 1;
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 16px;
                }

                .side-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .side-item-name {
                    font-size: 14px;
                    font-weight: bold;
                    color: #191c1c;
                    margin-bottom: 8px;
                }

                .side-item-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .side-item-price {
                    font-size: 12px;
                    color: #173628;
                    font-weight: bold;
                }

                .right-sidebar {
                    display: none;
                }

                @media (min-width: 1280px) {
                    .right-sidebar {
                        display: block;
                    }
                }

                .order-card {
                    position: sticky;
                    top: 112px;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(64px);
                    border-radius: 24px;
                    padding: 32px;
                    box-shadow: 0 12px 32px -4px rgba(25, 28, 28, 0.06);
                    space: 32px;
                }

                .order-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 32px;
                }

                .order-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #173628;
                }

                .order-badge {
                    background: rgba(23, 54, 40, 0.1);
                    color: #173628;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: bold;
                }

                .order-items {
                    space: 16px;
                    margin-bottom: 32px;
                }

                .order-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .order-item-name {
                    font-size: 14px;
                    font-weight: bold;
                    color: #191c1c;
                }

                .order-item-portion {
                    font-size: 10px;
                    color: #424844;
                }

                .order-totals {
                    padding-top: 32px;
                    space: 16px;
                    background: #f2f4f3;
                    padding: 16px;
                    border-radius: 16px;
                    margin-bottom: 32px;
                }

                .order-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                }

                .order-row.total {
                    padding-top: 8px;
                    border-top: none;
                }

                .order-row.total .label {
                    font-size: 18px;
                    font-weight: bold;
                    color: #173628;
                }

                .order-row.total .value {
                    font-size: 18px;
                    font-weight: bold;
                    color: #173628;
                }

                .order-row .label {
                    color: #424844;
                }

                .order-row .value {
                    color: #191c1c;
                    font-weight: 500;
                }

                .order-button {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(to right, #173628, #2e4d3e);
                    color: white;
                    font-size: 12px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border-radius: 9999px;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 8px 16px -2px rgba(23, 54, 40, 0.2);
                    transition: transform 0.1s ease;
                }

                .order-button:active {
                    transform: scale(0.95);
                }

                .bottom-nav {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    justify-content: space-around;
                    align-items: center;
                    padding: 0 24px 8px 24px;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(64px);
                    z-index: 50;
                    border-radius: 32px 32px 0 0;
                    box-shadow: 0 -12px 32px -4px rgba(25, 28, 28, 0.06);
                }

                @media (min-width: 768px) {
                    .bottom-nav {
                        display: none;
                    }
                }

                .nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    padding: 8px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    background: none;
                    color: #727974;
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                }

                .nav-item.active {
                    background: #173628;
                    color: white;
                    border-radius: 9999px;
                    width: 56px;
                    height: 56px;
                    transform: translateY(-8px);
                    box-shadow: 0 8px 16px -2px rgba(23, 54, 40, 0.2);
                }

                .nav-item:hover:not(.active) {
                    color: #173628;
                }

                .fab {
                    display: flex;
                    position: fixed;
                    bottom: 96px;
                    right: 24px;
                    z-index: 40;
                    height: 64px;
                    width: 64px;
                    border-radius: 9999px;
                    background: #173628;
                    color: white;
                    border: none;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    transition: transform 0.1s ease;
                }

                @media (min-width: 768px) {
                    .fab {
                        display: none;
                    }
                }

                .fab:active {
                    transform: scale(0.95);
                }

                .fab-badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: #482727;
                    color: white;
                    font-size: 10px;
                    height: 24px;
                    width: 24px;
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                }

                main {
                    padding-top: 80px;
                    padding-bottom: 160px;
                }

                @media (min-width: 768px) {
                    main {
                        padding-bottom: 0;
                    }
                }
            `}</style>

            {/* Header */}
            <header className="header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="header-title">The Culinary Editorial</span>
                </div>
                <nav className="header-nav">
                    <a href="#" className="active">Menu</a>
                    <a href="#">Orders</a>
                    <a href="#">Favorites</a>
                    <a href="#">Profile</a>
                </nav>
                <div className="header-actions">
                    <div className="search-box">
                        <span className="material-symbols-outlined" style={{ color: '#5eead4', fontSize: '14px' }}>search</span>
                        <input type="text" placeholder="Search dish..." />
                    </div>
                    <button className="icon-btn">
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section className="hero">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyVaohl_H6HY58yagjJn-os7Y2aPmYIJMClYORWee--8nKxV1tV4VA4lHN2XMzlNoNTPgL05imtxhdYfc6SeZgc-vaPQMMSNI_Jyo-LWbYETjccrjkxPNGpguVg5x77ftJbJSSbSRYunQrZVazkWzFgHuhC1Pyn06600tD6g5y6DgDFib0nLACw1krix5jRwZrv05QbEZZFVvWUWJlaOZrLs1SU2MH3W1_4dvnIsQ2gNF-ByT4EX-Zlp4qz-vzQJua6uArRt8K8_w"
                        alt="The Garden Atrium Canteen Interior"
                        className="hero-image"
                    />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <span className="hero-badge">Now Serving</span>
                        <h1 className="hero-title">The Garden Atrium Canteen</h1>
                        <p className="hero-description">
                            A curated editorial approach to seasonal dining, where architectural greenery meets artisan culinary mastery.
                        </p>
                    </div>
                </section>

                {/* Menu Content */}
                <div className="main-container">
                    <div className="content-wrapper">
                        {/* Left Sidebar */}
                        <aside className="sidebar">
                            <div className="sidebar-sticky">
                                <p className="category-label">Categories</p>
                                <a href="#chefs-specials" className="category-link active">
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>star</span>
                                    Chef's Specials
                                </a>
                                <a href="#main-course" className="category-link">
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>restaurant</span>
                                    Main Course
                                </a>
                                <a href="#artisan-sides" className="category-link">
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>lunch_dining</span>
                                    Artisan Sides
                                </a>
                            </div>
                        </aside>

                        {/* Center Content */}
                        <section style={{ flexGrow: 1, marginBottom: '160px' }}>
                            {/* Chef's Specials */}
                            <div className="menu-section" id="chefs-specials">
                                <div className="section-header">
                                    <h2 className="section-title">Chef's Specials</h2>
                                    <span className="section-subtitle">Seasonal Selection</span>
                                </div>
                                <div className="grid-2">
                                    {/* Item 1 */}
                                    <div className="featured-item">
                                        <div className="featured-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSYQxO1pg6FygFTLKRkHfbRgMJaO_PNjlcPYwyXCl9s6eekMKLszRd4VdOUfhe6pKBXQhqXh1V90CjrT3zpqCyjUrNCgke75-VoFoItoN2Im8MOyMfECXjzbrYl7X0vl5DPPmFcM8D1RjDcCwyVkjCqRnat7Uyp60gZ96gcN2Yy0xgmRxdA47n51B8275uQXmkGzu7QEunCgM8OcrsNYlXhiK6cBlkbGmPYcXsWeBO7UxH3XE5MZHNScphTMDRsvnu6qJcbQJ8thQ"
                                                alt="Verdant Harvest Bowl"
                                            />
                                        </div>
                                        <span className="featured-item-badge">New</span>
                                        <div className="featured-item-content">
                                            <div className="featured-item-header">
                                                <h3 className="featured-item-title">Verdant Harvest Bowl</h3>
                                                <span className="featured-item-price">$24.00</span>
                                            </div>
                                            <p className="featured-item-description">
                                                Ancient grains with fire-roasted kale, heirloom radishes, and a signature tahini-miso drizzle.
                                            </p>
                                            <button className="featured-item-button">Add to Selection</button>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="featured-item">
                                        <div className="featured-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbaLuEe_JVgPlQTIScw9_TVLY9a2H5z679fxjW4-rTJuHW7pBwSXMmoOXAnaB96PV5YXwDF6J1KQrrQ3IKJB6ywHkVY-PhmydYdd_IVqY_xE000FX0X0lWLuIpWLfADO9HxW6PerBf_BZdfK3w2VhxnwP8hTe26Edwcx_Pm1EiaOypQLVjLfJtqyJgR9HKeZof7A0jvRlNtwDDpyaPxm7MCaUpxKJQrIwirjQEni2kP9a03Me0qJwhS45VVWTKfyPCfOwT07drRY8"
                                                alt="Sun-Drenched Medley"
                                            />
                                        </div>
                                        <div className="featured-item-content">
                                            <div className="featured-item-header">
                                                <h3 className="featured-item-title">Sun-Drenched Medley</h3>
                                                <span className="featured-item-price">$21.50</span>
                                            </div>
                                            <p className="featured-item-description">
                                                Vine-ripened heritage tomatoes, buffalo mozzarella, and cold-pressed olive oil infusion.
                                            </p>
                                            <button className="featured-item-button">Add to Selection</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Course */}
                            <div className="menu-section" id="main-course">
                                <div className="section-header">
                                    <h2 className="section-title">Main Course</h2>
                                    <span className="section-subtitle">Hearty & Wholesome</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {/* Item 1 */}
                                    <div className="menu-item">
                                        <div className="menu-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx3KWLxXv7bAwYNKREwYlzXGIOMZEO1G2WKlEryTS43lNE3VFBtwHQ92dWTiBYRdglsYZPFNGTbuU-5BGrbjFfo2QHKGP28VNULkRI2xMTTYRnJ3CTRy293cH19scg7WN3-25rD2AuYXFLPLHerdHov1jFJDzsmwyEkqFhG1tZGovr5wrLv2N4qOG_xKFj2CsAn_cjwoKuctBjfVgBE29-KDfnbiylztOiwQ2h-emXU_5mcTXzw9j9WrXxzXfLFIyhLSIa4xFczqc"
                                                alt="Wild Mushroom Tagliatelle"
                                            />
                                        </div>
                                        <div className="menu-item-content">
                                            <div className="menu-item-header">
                                                <h3 className="menu-item-title">Wild Mushroom Tagliatelle</h3>
                                                <span className="menu-item-price">$28.00</span>
                                            </div>
                                            <p className="menu-item-description">
                                                Hand-rolled pasta, roasted woodland mushrooms, and black truffle cream essence.
                                            </p>
                                            <div className="menu-item-tag">
                                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>eco</span>
                                                Vegetarian
                                            </div>
                                        </div>
                                        <button className="menu-item-button">
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                                        </button>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="menu-item">
                                        <div className="menu-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNiwbquRrsksfSmf5vk_GhokMvZUrbqSxArlOt6tcKOwswGUagg3sSx58angylIZtNmcXhxfCv3WqVcZxkVM7o2bebFPttDp3Z3atPSAmonr0Qq0UneS-5qPpRxhrU55MfFa9GgllbuLhIjlN1LjbaXeahDEzy9mEcdwgpqIjDYVSs0Tdsb3xq0AkquDnvsPTOxQyOMiujzsrPCmGYvrt3BY7s8QUxNdloyhgYgqXi3NokpqOxvLONEWlIwLWrl85qJIFK3eD2k3o"
                                                alt="Artic Sea Bass"
                                            />
                                        </div>
                                        <div className="menu-item-content">
                                            <div className="menu-item-header">
                                                <h3 className="menu-item-title">Artic Sea Bass</h3>
                                                <span className="menu-item-price">$34.00</span>
                                            </div>
                                            <p className="menu-item-description">
                                                Pan-seared fillet, lemon-butter reduction, and charred asparagus spears.
                                            </p>
                                            <div className="menu-item-tag">
                                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>set_meal</span>
                                                Sustainable
                                            </div>
                                        </div>
                                        <button className="menu-item-button">
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                                        </button>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="menu-item">
                                        <div className="menu-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsMTDwMKEjrais3x4LPeES0ojGyPUPd-eETBeujrFFH97-atB2lDn2rXN1Jqjt1W5kPFCPD_D04otuai1hwmovJJ7d-vNmK4wZ-6aDdQy2HcFU22UdN9XKoK1Zi-Ku_FxiIK_iafz_oH3tk17RdFNps8VjlCdMc7D4Gfs5Nad8ZDQbqUy9hSIbAqyheWNx0BsGOObizu17Tj3_6lw2znmoJiHqwsI9NH5qkyLmLxiqrT4rQknQpuJsyVEOISqYKZEIHgP-mhVTA4w"
                                                alt="Braised Short Rib"
                                            />
                                        </div>
                                        <div className="menu-item-content">
                                            <div className="menu-item-header">
                                                <h3 className="menu-item-title">Braised Short Rib</h3>
                                                <span className="menu-item-price">$32.00</span>
                                            </div>
                                            <p className="menu-item-description">
                                                12-hour slow-cooked beef, silk-smooth pomme purée, and red wine jus.
                                            </p>
                                        </div>
                                        <button className="menu-item-button">
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Artisan Sides */}
                            <div className="menu-section" id="artisan-sides">
                                <div className="section-header">
                                    <h2 className="section-title">Artisan Sides</h2>
                                    <span className="section-subtitle">Small Plates</span>
                                </div>
                                <div className="grid-3">
                                    {/* Item 1 */}
                                    <div className="side-item">
                                        <div className="side-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu1uqSrLEdmDf-CHBaT1rjflEcBWHTqVZcOhzOeDG6uAqDUrHHZ50Rt5nax8iVI2F_ZniVdF7fOnBv7rUYHGqNy1tlt1j_ikP_5NKGyvara9XH_U1Baz3SlCoM-4_XLSUpUVRijfQiiSCF5r8sSzc6phr1yNgP601zK9TZEi-q_y07-YnZOULY1vpwteNi9UWFLOIFFfBpaTW_u1a0wLm44I2m7pMuO9fqCRGd1WpRo5heUVABgtizpIh2meLHDv-9-3f0fd0oMeA"
                                                alt="Truffle Frites"
                                            />
                                        </div>
                                        <h3 className="side-item-name">Truffle Frites</h3>
                                        <div className="side-item-footer">
                                            <span className="side-item-price">$9.00</span>
                                            <span className="material-symbols-outlined" style={{ color: '#173628', fontSize: '20px' }}>add_circle</span>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="side-item">
                                        <div className="side-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZD9XGTUtRJH2r0EQUUxy4COUe73a3ip3Pu6dyGH-rlEwt0x3zcV9cxR-q8Db0IpXwnrCwz3kQM88zcy0lUqdwlgdB0nDMIzbc18rTelXOzZMTL_SlkvTEJZkbSX8vNGiBetdTu5Gl6Tn4qSVwp_C1WDMTxKTwraV7MWHzZ_dtI5sZU4G0PBYEBptHbLEy0VR1JL-HWGGU2MjGqRv9ko1hVS1yTXNxmQCD9MpWcSp6o5ttd5LuAZsNarurFrz2DfEvzzw09Es_FO4"
                                                alt="Charred Broccolini"
                                            />
                                        </div>
                                        <h3 className="side-item-name">Charred Broccolini</h3>
                                        <div className="side-item-footer">
                                            <span className="side-item-price">$8.50</span>
                                            <span className="material-symbols-outlined" style={{ color: '#173628', fontSize: '20px' }}>add_circle</span>
                                        </div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="side-item">
                                        <div className="side-item-image">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Q6J4q_uSdkvVx0wMVgmI1xcwjw34MFZ3cQ3Oe0E3yS9R2VRwQpu2xmBlTc1S-6a4WpnkO0C2zWR2-q4G9_BGmEhpcDHi-IH3UtzOYuif-naR1ODNSNTG3OpYFrZZchr8YRESr38D3zboh_xDcJS8jIwcOJFkl1vWYkJe7J6CR3OAAE-G4tJxG21NNcmjkWu3XV4Dnh4bRNj_SPhy70x9oU58hldw-P5XlUmiRMkh-gGJqtgVb33DhSuO93NoX__6RFqWdCMYvyw"
                                                alt="Sourdough Basket"
                                            />
                                        </div>
                                        <h3 className="side-item-name">Sourdough Basket</h3>
                                        <div className="side-item-footer">
                                            <span className="side-item-price">$7.00</span>
                                            <span className="material-symbols-outlined" style={{ color: '#173628', fontSize: '20px' }}>add_circle</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Right Sidebar - Order Card */}
                        <aside className="right-sidebar">
                            <div className="order-card">
                                <div className="order-header">
                                    <h2 className="order-title">Current Order</h2>
                                    <span className="order-badge">{cartItems.length} ITEMS</span>
                                </div>
                                <div className="order-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <div>
                                                <div className="order-item-name">{item.name}</div>
                                                <div className="order-item-portion">{item.portion}</div>
                                            </div>
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-totals">
                                    <div className="order-row">
                                        <span className="label">Subtotal</span>
                                        <span className="value">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="order-row">
                                        <span className="label">Service (5%)</span>
                                        <span className="value">${service.toFixed(2)}</span>
                                    </div>
                                    <div className="order-row total">
                                        <span className="label">Total</span>
                                        <span className="value">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="order-button">Finalize Order</button>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation - Mobile Only */}
            <nav className="bottom-nav">
                <button className="nav-item active">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>restaurant_menu</span>
                    <span>Menu</span>
                </button>
                <button className="nav-item">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>receipt_long</span>
                    <span>Orders</span>
                </button>
                <button className="nav-item">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>favorite</span>
                    <span>Likes</span>
                </button>
                <button className="nav-item">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>person</span>
                    <span>User</span>
                </button>
            </nav>

            {/* FAB - Mobile Only */}
            <button className="fab">
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shopping_basket</span>
                <span className="fab-badge">{cartItems.length}</span>
            </button>
        </>
    );
};

export default Menu;