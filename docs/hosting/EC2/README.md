# Instroduction

Document này được viết với mục đích CI/CD trên AWS EC2 nhanh nhất và rẻ nhất

## Table of Content

## Choosing Instance

Instance rẻ nhất là t3.nano khoảng 100.000 VND mỗi tháng với 2 CPU và 0.5 RAM, storage sẽ được free tier với 30gb. Để tăng lượng RAM thì ta sẽ sử dụng SWAP (RAM ảo) để tăng khả năng xử lý của server.

## Setup Instance

Bỏ qua bước launch instance

### Setup swap

1. Kiểm tra thông tin về swap.

```bash
sudo swapon --show
```

Nếu terminal không in gì nghĩa là swapfile chưa được setup.

2. Kiểm tra dung lượng còn trống trên ổ cứng.

```bash
df -h
```

3. Tạo swapfile.

```bash
fallocate -l 1G /swapfile
```

Sửa 1G thành dung lượng cần thiết
Kiểm tra swapfile được tạo chưa

```bash
ls -lh /swapfile
```

4. Enable swapfile

```bash
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Kiểm tra

```
sudo swapon --show
```

5. Tạo swapfile khi reboot

Các bước trên chỉ thực hiện trong session hiện tại. Nếu reboot thì server sẽ không còn swap nữa.

Thêm swap file vào `/etc/fstab/`

Backup trước khi chỉnh sửa file

```bash
sudo cp /etc/fstab /etc/fstab.bak
```

Thêm thông tin swapfile vào cuối /etc/fstab

```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Setup Certbot

```bash
sudo apt-get install nginx -y
```

Kiểm tra hoạt động nginx

```bash
sudo service nginx status
```

Update snap

```bash
sudo snap install core; sudo snap refresh core
```

Remove old certbot

```bash
sudo apt remove certbot
```

Install certbot

```bash
sudo snap install --classic certbot
```

Config Nginx

### Setup NodeJS

```bash
sudo apt install npm -y
sudo npm install -g n
sudo n install lts
```

### Setup Docker

```bash

```
