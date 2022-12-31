## Easy Url Converter
這是一個使用Node.js與Express所建立的短網址產生器，使用者輸入有效網址，即可轉換成一個由五位英文或數字組成的短網址。
<p align="center">
  <h3>輸入網址</h3>
  <img src="./README_images\index.jpg" width="100%" alt="index">
   <h3>成功產生短網址</h3>
  <img src="./README_images\show-page.jpg" width="100%" alt="show-page">
   <h3>若為無效網址無法送出</h3>
  <img src="./README_images\invalid-url-alert.jpg" width="100%" alt="invalid-url-alert">
</p>
## 功能 Features
1. 使用者輸入有效網址，按下Shorten按鈕，即可得到一個由五位英文或數字組成的短網址。
2. 亦可使用Copy按鈕複製短網址。
3. 將短網址貼在瀏覽器的網址列搜尋，會導向原始網址指向的網站。

## 安裝指南 Installation Guide
1. 進入[Node.js](https://nodejs.org/en/)官網依指示安裝Node.js
2. 打開終端機，複製此專案至本機
```
git clone https://github.com/yy933/.git
```
2. 進入此專案資料夾
```
cd shorten-url
```
3. 安裝npm套件 

```
npm install
```
```
npm install express@4.18.2
```
```
npm install express-handlebars@6.0.6
```
```
npm install mongoose@6.8.1
```
4. 匯入種子資料
```
npm run seed
```
當終端機顯示 `mongodb connected!` 及 `Seeder done`表示已成功匯入種子資料，按 ctrl + c 結束執行

5. 啟動伺服器
```
npm run start
```

6. 當終端機顯示 `Express is running on http://localhost:3000` ，代表已成功啟動伺服器並執行app.js檔案，至瀏覽器輸入 http://localhost:3000 即可使用本網站

## 執行環境與工具 Environment and Tools
1. [Node.js](https://nodejs.org/en/)(v14.16.0) - JavaScript執行環境
2. [Express](https://expressjs.com/)(v4.18.2) -網路框架(web framework)
3. [Express-handlebars](https://www.npmjs.com/package/express-handlebars)(v6.0.6) - 模板引擎
4. [Bootstrap](https://getbootstrap.com/)(v5.1.1) - 前端開發工具
5. [MongoDB](https://www.mongodb.com/) - 非關聯式資料庫（NoSQL）
6. [Mongoose](https://mongoosejs.com/)(v6.8.1) - MongoDB ODM
7. [nice-is-url](https://github.com/vigour-io/nice-is-url)(v1.0.2) - 檢查字串是否為有效網址
8. [Visual Studio Code](https://code.visualstudio.com/) - 程式碼編輯器
