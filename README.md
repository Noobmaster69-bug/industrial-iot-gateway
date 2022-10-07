# Table of Content

## Introduction

In the industrial environment, there are many devices with many protocols that need to collect data, an IoT Gateway requires reading all of them and programmers have to update code to support all of the protocols.

This software is designed in microservice architecture to help programmer can easily "plug" new protocol support features into the existing program by running a new protocol program in a new process and registering them to this program.

## Feature

- Supported devices protocol:

  - Modbus RTU
  - Modbus TCP

- Supported cloud protocol:

  - MQTT
  - HTTP/HTTPS

- Other feature:

  - Web UI
  - User management
  - Devices management
  - Devices template
  - Microservice management

- Supported microservice IPC protocol:

  - HTTP/HTTPS

## Unfinished feature

<!-- - Supported devices protocol:

- Supported cloud protocol:

- Other feature: -->

- Microservice IPC protocols:
  - Unix socket
  - TCP socket
  - Redis pub/sub

## Supported devices and requirement

Every devices can run Ubuntu 18.04.6 LTS or later and other equivalent Linux distro.

## Philosophy [Vietnamese] [Bản chưa chính thức]

### Nhiệm vụ của gateway

- Cho phép người dùng cấu hình thông qua một website. Website này có thể truy cập tại localhost hoặc từ xa thông qua vpn, tóm lại là một private network.
- Chạy các task thu thập dữ liệu định kì và đẩy lên server.
- Thực hiện một vài phép toán đơn giản như cộng trừ nhân chia với hằng số.
- Hỗ trợ được nhiều loại thiết bị.

### Phân tích các đối tượng sử dụng gateway

- Kĩ sư, người lắp đặt: Là những người có kiến thức sâu rộng về thiết bị, làm việc nhiều với các IoT Gateway khác nhau. Đối tượng này sẽ sử dụng website để config hoạt động của gateway, có thể train các khoá học để sử dụng gateway. Đôi khi người này sẽ sử dụng gateway để điều khiển thiết bị.

- Thiết bị: Đối tượng mà gateway sẽ tương tác định kì, trả dữ liệu về cho gateway, xử lý tình huống, tính toán cơ bản. Đôi khi sẽ gateway sẽ nhận lệnh từ cloud, kĩ sư/ người lắp đặt để tương tác ngược lại với thiết bị.

- Cloud: Dữ liệu mà gateway đọc được sẽ được đẩy lên cloud thông qua một network protocol nào đó. Đôi khi cloud sẽ tương tác ngược lại với gateway để có thể điều khiển thiết bị, thay đổi thiết lập gateway.

### Kết luận

- Gateway sẽ là một thiết bị nhúng chạy hệ điều hành linux, có cấu hình khiêm tốn, phần cứng sẽ thiên về độ bền, được bảo vệ tốt, giá thành khá đắt.
- Gateway sẽ hosting một website tại LAN hoặc VLAN (thông qua VPN). Vì vậy ứng dụng sẽ phát triển gồm front-end và một back-end.
- Backend sẽ được triển khai bằng framework ExpressJS, ngôn ngữ JavaScript và NodeJS runtime. NestJS sẽ không được sử dụng vì TypeScipt khá nặng so với cấu hình Gateway. Đây là một điểm trừ vì các hệ thống nhúng không nên sử dụng NodeJS. Vì backend sẽ được chạy ở LAN và có lưu lượng truy cập thấp nên các phương pháp như load balance và sercurity sẽ được đơn giản hoá. Ngoài ra, back-end còn cần 2 cơ chế đó là cơ chế log và cơ chế export/import config, factory-reset.
- Frontend sẽ được triển khai bằng ReactJS vì đa phần team dev đều quen với framework này cộng với điểm mạnh của Client Side Rendering là một phần logic, hiển thị sẽ được xử lý ở front-end, có thể giảm tải cho back-end đang chạy trên máy có cấu hình yếu.

### Phân tích back-end

Back-end sẽ gồm các tính năng sau:

- đăng nhập, xác thực, phân quyền người dùng: Mặc dù được triển khai ở LAN nhưng thiết bị này cũng cần có cơ chế này để tăng tính bảo mật.
- database: Để lưu trữ thông tin cài đặt của gateway.
- task scheduler: Để thu thập dữ liệu định kì.
- device driver: Để tương tác với thiết bị.
- cloud connector: Để tương tác với cloud.
- monitor gateway: Để giám sát hoạt động của gateway.
- front-end api: API để tương tác với front-end.

#### Đăng nhập, xác thực, phân quyền người dùng

Theo yêu cầu hiện tại, phân quyền người dùng chỉ có admin với toàn quyền trên hệ thống. Đăng nhập, xác thực sẽ xử dụng JWT lưu trong cookie với thời hạn 2 giờ kể từ khi đăng nhập, không cần dùng đến refresh token vì một phiên đăng nhập chỉ kéo dài 2 giờ.

#### Database

Database sẽ lưu các thông tin về tất cả mọi thứ cúa gateway, do logic của gateway khá phức tạp nên database sẽ sử dụng SQL thay vì NoSQL. SQLite3 sẽ được chọn vì nó nhỏ gọn, tối ưu cho các thiết bị nhỏ (Hiện đang được sử dụng cho các thiết bị di động)

#### Config

Database table:

- Logging mode
- Đường dẫn đến logfile và error file
- JWT secret key

Khi gateway chạy lần đầu, gateway sẽ load config từ file config.json, khởi tạo JWT secret key và lưu vào database. Table config sẽ chỉ chứa một row.

#### Accounts

Database table:

- username
- password
- role

Khi gateway chạy lần đầu, một tài khoản có username và password là admin sẽ được khởi tạo và lưu vào database. Người dùng có thể đổi mật khẩu hoặc là tạo một user khác.

#### Devices

Database table:

- name: Tên thiết bị, không được trùng với các thiết bị khác.
- status: Trạng thái của thiết bị. Phần này đang được phân tích thêm.
- model name: Tên sản xuất của thiết bị. Ví dụ như SUN2000...
- manufacturer: Tên nhà sản xuất thiết bị. Ví dụ như Huawei...
- type: Loại thiết bị, ví dụ như Power Meter...
- upProtocol: Giao thức để giao tiếp với server, ví dụ như MQTT, HTTP...
- downProtocol: Giao thức để giao tiếp với thiết bị, ví dụ như Modbus-RTU, Modbus-TCP
- channels: Hay còn được gọi là attributes, properties trong các hệ thống IoT khác. Là một thuộc tính mà thiết bị tương tác, ví dụ như nhiệt độ, độ ẩm, độ PH... đối với sensor, tốc độ động cơ, trạng thái switch, van khí... đối với actuator.

Một thiết bị sẽ được thêm vào bởi người dùng. Các trường upProtocol, downProtocol, channels sẽ được tách thành một table riêng do tính phức tạp của loại dữ liệu này.

#### Template

Database table:

- name: Tên thiết bị, không được trùng với các thiết bị khác.
- model name: Tên sản xuất của thiết bị. Ví dụ như SUN2000...
- manufacturer: Tên nhà sản xuất thiết bị. Ví dụ như Huawei...
- type: Loại thiết bị, ví dụ như Power Meter...
- channels: Hay còn được gọi là attributes, properties trong các hệ thống IoT khác. Là một thuộc tính mà thiết bị tương tác, ví dụ như nhiệt độ, độ ẩm, độ PH... đối với sensor, tốc độ động cơ, trạng thái switch, van khí... đối với actuator.

Template là một thiết bị mẫu, chứa một vài thuộc tính giống thiết bị. Các thuộc tính này có thể được copy vào form khi người dùng config thiết bị.

Ví dụ thực tế, một trạm điện năng lượng mặt trời có 10 inverter, đều là SUN2000 của hãng Huawei, mỗi Inverter có 30 channels. Ta có thể thấy 10 inverter này đều có cùng thuộc tính channels, model name, manufacturer, type, theo cơ chế config thông thường, người kĩ sư/lắp đặt sẽ phải nhập dữ liệu về 300 channel và các dữ liệu khác bị trùng lặp nhau, điều này vừa phí sức, vừa dễ xảy ra sai sót không đáng có. Chính vì vậy cần có một cơ chế copy để tăng tốc độ config, tránh xảy ra sai sót. Đối với protocol cũng sẽ có cơ chế template tương tự.

#### Services

Database table:

- name

Hiện nay để có thể giao tiếp được nhiều thiết bị, gateway phải được lập trình để hỗ trợ nhiều protocol nhất có thể. Điều này sẽ khó khăn khi chương trình update, thêm feature, thêm protocol. Chính vì vậy, chương trình sẽ có một cơ chế services (vì mô hình triển khai tương tự với microservice) để thêm một protocol mới vào hệ thống. Service có thể chia làm 2 loại

- Intergrated Module: là một module trong chương trình.

- Plug-in: một process chạy song song với chương trình và giao tiếp thông qua API mà chương trình cung cấp (cho nên chương trình này gọi là core).

#### upProtocol

Database table:

- name

Khi một up-plug-in được cài đặt, một table có tên upProtocol\_ + plug-in id (ex "upProtocol_1") sẽ được tạo ra và được thiết lập quan hệ với bản upProtocol

#### downProtocol

Database table:

- name

Khi một down-plug-in được cài đặt, một table có tên downProtocol\_ + plug-in id (ex "downProtocol_1") sẽ được tạo ra và được thiết lập quan hệ với bảng này.

#### channels

Database table:

- name

Khi một down-plug-in được cài đặt, một table có tên Channel\_ + plug-in id (ex "Channel_1") sẽ được tạo ra và được thiết lập quan hệ với bảng này.

#### Task

Database table:

- name

Task sẽ được thực hiện bằng thư viện node-cron với tính năng chạy task định kì. Hiện tại tark chỉ có một loại worker đó là thu thập dữ liệu từ sensor và gửi lên server.

#### Giám sát hoạt động gateway

Các hoạt động giám sát gateway:

- Logging: Module utilities sẽ thêm timestamp, color và đẩy data vào log file mỗi khi stdout và stderror được xuất ra. Ngoài ra event \_\_log và \_\_error sẽ được emmit trong process instance, data sẽ là log, error đã được thêm timestamp, color, sau đó data này sẽ được truyền qua socket.io front-end và hiển thị cho người dùng xem.
- System information: Các thông tin như tình trạng RAM, ROM, CPU, network,... sẽ được truyền đến front-end thông qua socket.io để hiển thị cho người dùng xem.
