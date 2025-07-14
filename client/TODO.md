# 🗺️ Community Platform - Client Roadmap

## 🌟 Tổng quan

Lộ trình phát triển client, chia theo phần & ưu tiên.  
Sắp xếp để tránh conflict logic, dễ triển khai từng feature.

---

## ✅ 1️⃣ Authentication & Auth Context

- [x] Setup context quản lý user (`AuthContext`)
- [ ] Kết nối `/auth/me` để check token
- [ ] Tích hợp refresh token hoặc logic revalidate (nếu cần)
- [ ] Xử lý redirect khi chưa đăng nhập
- [ ] UI cơ bản: Login, Register, Forgot Password

---

## ✅ 2️⃣ Global Layout & Theme

- [ ] Thiết kế khung layout global (`app/layout.tsx`)
- [ ] Navbar: hiển thị user info, avatar, logout
- [ ] Sidebar (nếu có, ví dụ cho dashboard)
- [ ] Footer
- [ ] Setup global style (`globals.css` hoặc Tailwind)

---

## ✅ 3️⃣ Dashboard (Admin)

- [ ] Trang `/dashboard`
- [ ] Trang quản lý posts (`/dashboard/posts/manage`)
- [ ] Trang quản lý users (`/dashboard/users/manage`)
- [ ] Trang quản lý comments (`/dashboard/comments/manage`)
- [ ] Trang quản lý notifications (`/dashboard/notifications/manage`)
- [ ] Middleware hoặc server action check role admin

---

## ✅ 4️⃣ CRUD Bài viết (Posts)

- [ ] Trang list posts (`/posts`)
- [ ] Trang detail bài viết (`/posts/[id]`)
- [ ] Trang edit bài viết (`/posts/[id]/edit`)
- [ ] Trang quản lý posts cá nhân (`/posts/manage`)
- [ ] Component Editor (nội dung bài viết)
- [ ] Upload ảnh (optional)

---

## ✅ 5️⃣ Hồ sơ cá nhân (Profile)

- [ ] Trang `/profile` (view profile self)
- [ ] Trang `/profile/edit`
- [ ] Trang `/profile/[id]` (guest view, optional)
- [ ] Logic hiển thị các bài viết của user

---

## ✅ 6️⃣ Comments

- [ ] Comment list trong detail post
- [ ] Create comment
- [ ] Edit / delete comment
- [ ] Hiển thị comment của user trong dashboard (admin)

---

## ✅ 7️⃣ Notifications

- [ ] Danh sách notifications
- [ ] API nhận thông báo mới
- [ ] UI badge "unread"
- [ ] Đánh dấu đã đọc

---

## ✅ 8️⃣ Middleware & Server Actions

- [ ] Middleware check auth
- [ ] Middleware check role (admin)
- [ ] Server action bảo vệ update, delete

---

## ✅ 9️⃣ UI/UX Polish

- [ ] Loading states & skeletons
- [ ] Toast thông báo success/error
- [ ] Animations (Framer Motion)
- [ ] SEO meta tag (head)

---

## ✅ 10️⃣ Extras

- [ ] Testing components (unit & integration)
- [ ] Write docs (README)
- [ ] Deploy Vercel / Netlify

---

## ⭐ Ưu tiên (high-level)

1️⃣ Auth & layout
→ 2️⃣ Dashboard & phân quyền
→ 3️⃣ Post CRUD
→ 4️⃣ Profile
→ 5️⃣ Comment
→ 6️⃣ Notification
→ 7️⃣ Polish

---

## 📍 Ghi chú

- Các phần có thể assign song song nếu auth & layout xong.
- Luôn build từ "core logic" → "UI detail" → "optimize".
