---
sidebar_position: 6
---

# Development document

## Repo workspace

Recommend sử dụng [visual studio code](https://code.visualstudio.com/).

Các extension được sử dụng:

- [Sqlite3 viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer): dùng để xem database.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): auto format code.
- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): code linting cho ReactJS.
- [OpenAPI](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi): chỉnh sửa OpenAPI file.

Các package được sử dụng:

- [Widdershins](https://www.npmjs.com/package/widdershins): Dùng để generate markdown từ OpenAPI.
- [Swagger UI](https://www.npmjs.com/package/open-swagger-ui): Serve một swagger ui server tại local để người dùng xem được API.
- [Swagger Editor](https://www.npmjs.com/package/openapi-editor): Server một swagger editor server tại local để người dùng chỉnh sửa được API.

### Core workspace

Các package được sử dụng:

- [gulp](https://www.npmjs.com/package/gulp): tool dùng để tự động hoá quá trình biên dịch, chạy thử code.
- [rollup](https://www.npmjs.com/package/rollup): tool dùng để biên dịch và gói gọn code lại thành một file.
- [@rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript): plugin dùng để biên dịch typescript.
- [tslib](https://www.npmjs.com/package/tslib): Hỗ trợ [@rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript) biên dịch typescript.
- [@rollup/plugin-json](https://www.npmjs.com/package/@rollup/plugin-json): plugin dùng để include file có định dạng `.json` vào code.
- [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon): auto restart code khi code thay đổi
- [pkg](https://www.npmjs.com/package/pkg): dùng để xuất ra binary file cho từng hệ thống khác nhau.
