# Hướng dẫn Deploy lên GitHub Pages với Custom Domain

## Các bước đã được thiết lập:

1. ✅ **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Tự động build và deploy khi push code lên branch `master` hoặc `main`
   - Sử dụng GitHub Pages Actions mới nhất

2. ✅ **CNAME File** (`public/CNAME`)
   - Đã cấu hình domain: `lixi.quocpha.com`
   - File này sẽ được copy vào thư mục `dist` khi build

3. ✅ **SPA Routing Support**
   - File `404.html` để xử lý routing cho Single Page App
   - Script trong `index.html` để redirect đúng URL

4. ✅ **Vite Config**
   - Đã cấu hình `base: '/'` cho custom domain

## Các bước cần thực hiện trên GitHub:

### 1. Bật GitHub Pages trong Repository Settings

1. Vào repository trên GitHub
2. Vào **Settings** → **Pages**
3. Trong phần **Source**, chọn:
   - **Source**: `GitHub Actions`
4. Lưu lại

### 2. Cấu hình DNS cho Domain

Bạn cần cấu hình DNS records cho domain `lixi.quocpha.com`:

**Option 1: Sử dụng CNAME (Khuyến nghị)**
```
Type: CNAME
Name: lixi
Value: <username>.github.io
```

**Option 2: Sử dụng A Records**
```
Type: A
Name: lixi
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. Push code và Deploy

1. Commit và push code lên GitHub:
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin master
```

2. GitHub Actions sẽ tự động:
   - Build project
   - Deploy lên GitHub Pages
   - File CNAME sẽ được tạo tự động

### 4. Xác nhận Custom Domain trên GitHub

1. Sau khi deploy xong, vào **Settings** → **Pages**
2. Trong phần **Custom domain**, bạn sẽ thấy `lixi.quocpha.com`
3. Đảm bảo checkbox **Enforce HTTPS** được bật (sẽ tự động bật sau khi DNS được cấu hình đúng)

## Kiểm tra Deployment

- GitHub Actions: Vào tab **Actions** trong repository để xem trạng thái deploy
- Website: Sau khi DNS propagate (có thể mất vài phút đến 24 giờ), truy cập `https://lixi.quocpha.com`

## Lưu ý

- DNS propagation có thể mất từ vài phút đến 24 giờ
- Đảm bảo domain đã được cấu hình DNS đúng trước khi GitHub có thể verify
- HTTPS sẽ tự động được bật sau khi domain được verify

