# SGKart Marketplace — UI/UX Implementation Summary

A modern, high-performance Indian e-commerce marketplace UI/UX built for **SGKart**, inspired by Amazon and Flipkart while presenting a clean, original brand identity and shopping experience.

---

## Brand Identity & Design System

| Element | Specification | Visual Preview |
| :--- | :--- | :--- |
| **Brand Name** | **SGKart** | "SG" in White, "Kart" in Bright Yellow |
| **Tagline** | *"Everything You Need. All in One Place."* | Modern italicized subtitle |
| **Primary Color** | **Royal Blue** (`#174EA6`) | Header, primary CTAs, active highlights |
| **Secondary Color** | **Bright Yellow** (`#FFD54F`) | Logo accent, badges, primary cart buttons |
| **Page Background**| **Light Gray** (`#F5F7FA`) | Soft marketplace canvas |
| **Typography** | **Inter** (Body) & **Outfit** (Headings) | Google Fonts typography stack |
| **Currency** | **Indian Rupee (₹)** | Formatted via `.toLocaleString('en-IN')` |

---

## Implemented Pages & Application Routes

| # | Route | Page Component | Key Features & Capabilities |
| :--- | :--- | :--- | :--- |
| 1 | `/` | [`HomePage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/HomePage.jsx) | Hero carousel banner, 7 category shortcuts, Flash Deals with animated countdown clock, Trending Deals, Best Sellers, Recommended For You, Recently Viewed, Split promo banners, Newsletter with instant coupon. |
| 2 | `/products` | [`AllProductsPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/AllProductsPage.jsx) | Multi-attribute sidebar filtering (price slider up to ₹70k, categories, customer rating 4★+, brands, in-stock, SG Assured), active filter chips, search within results, grid/list view toggle, pagination. |
| 3 | `/category/:slug` | [`CategoryProductsPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/CategoryProductsPage.jsx) | Dynamic routing for Electronics, Fashion, Home & Kitchen, Beauty, Grocery, Sports, and Accessories. |
| 4 | `/product/:slug` | [`ProductDetailsPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/ProductDetailsPage.jsx) | Interactive image gallery with thumbnails, price & discount badges, quantity selector, 6-digit Indian PIN delivery checker, specifications table, features highlight, verified customer reviews + "Write a Review" interactive modal, related products. |
| 5 | `/search` | [`SearchResultsPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/SearchResultsPage.jsx) | Live query matching, keyword highlights, filter sidebar, and no-results fallback. |
| 6 | `/wishlist` | [`WishlistPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/WishlistPage.jsx) | Saved items grid, wishlist badges, move single or move all to cart, clear wishlist, empty state. |
| 7 | `/cart` | [`CartPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/CartPage.jsx) | Real-time item counters, save for later, free delivery threshold progress bar (₹499 milestone), coupon code engine (`SGKART10`, `WELCOME200`, `BANK10`), subtotal/tax/delivery breakdown. |
| 8 | `/checkout` | [`CheckoutPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/CheckoutPage.jsx) | 3-step checkout: Delivery Address selection/new address form, delivery speed (Standard Free vs 1-Day Express ₹49), payment method selection (UPI, Cards, NetBanking, COD), order summary, simulated confetti celebration, order confirmation screen with tracking ID. |
| 9 | `/auth` | [`AuthPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/AuthPage.jsx) | Tabbed Sign In / Register forms, password toggle, 1-click Demo Customer & Demo Admin quick login buttons. |
| 10 | `/account` | [`MyAccountPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/MyAccountPage.jsx) | Profile management, SG SuperCoins balance (₹480 reward points), address book (add/delete/set default address), quick shortcuts. |
| 11 | `/orders` | [`MyOrdersPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/MyOrdersPage.jsx) | Chronological past and active orders, visual status timeline (Confirmed → Processing → Shipped → Delivered), simulated GST invoice generator, order cancellation, return/exchange simulation. |
| 12 | `/admin` | [`AdminDashboardPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/AdminDashboardPage.jsx) | Independent Store Management Console: Overview stats cards, monthly sales trend bar charts, revenue-by-category breakdown, product catalog with Add/Edit modal, order management with live status updater, category taxonomy, and customer CRM. |
| 13 | `*` | [`NotFoundPage.jsx`](file:///e:/my_projects/ui%20ux%20design/sgkart_UI%20&%20UX/src/pages/NotFoundPage.jsx) | Friendly 404 illustration, quick navigation links to top categories. |

---

## State Management & LocalStorage Persistence

The application utilizes React Context API and automatically synchronizes all changes with `localStorage`:
- **`CartContext`** (`sgkart_cart`, `sgkart_applied_coupon`): Persists items, quantities, and active promo discounts.
- **`WishlistContext`** (`sgkart_wishlist`): Persists saved products across sessions.
- **`AuthContext`** (`sgkart_auth_user`): Persists user session, role ('customer' or 'admin'), and saved delivery addresses.
- **`OrderContext`** (`sgkart_orders`): Saves placed orders with unique IDs (`SG-ORD-XXXXX`), status changes, and tracking codes.
- **`ProductContext`** (`sgkart_products`): Allows the Admin Dashboard to add, update, or delete products and reflect immediately in the customer storefront.
- **`ToastContext`**: Provides notifications for user feedback.

---

## How to Run & Preview

```bash
# Start development server
node ./node_modules/vite/bin/vite.js --port 3000

# Build production bundle
node ./node_modules/vite/bin/vite.js build
```

Storefront URL: `http://localhost:3000/`  
Admin Dashboard: `http://localhost:3000/admin`
