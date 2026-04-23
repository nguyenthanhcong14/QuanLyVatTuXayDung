const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// KẾT NỐI SQL SERVER
const sequelize = new Sequelize('Quanlyvattu', 'sa', '123456', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: { options: { encrypt: false, trustServerCertificate: true } },
    logging: false
});

const defineModel = (name, fields) => sequelize.define(name, fields, { timestamps: false, freezeTableName: true });


const models = {
    'vattu': defineModel('VATTU', { MaVT: { type: DataTypes.STRING, primaryKey: true }, TenVT: DataTypes.STRING, DonVi: DataTypes.STRING, LoaiVT: DataTypes.STRING }),
    'kho': defineModel('KHOHANG', { MaKHO: { type: DataTypes.STRING, primaryKey: true }, TenKHO: DataTypes.STRING, DiaChi: DataTypes.STRING }),
    'ncc': defineModel('NHACUNGCAP', { MaNCC: { type: DataTypes.STRING, primaryKey: true }, TenNCC: DataTypes.STRING, DiaChi: DataTypes.STRING, Email: DataTypes.STRING }),
    'nhan-vien': defineModel('NHANVIEN', { MaNV: { type: DataTypes.STRING, primaryKey: true }, TenNV: DataTypes.STRING, GioiTinh: DataTypes.STRING, NamSinh: DataTypes.INTEGER, DiaChi: DataTypes.STRING }),
    'cong-trinh': defineModel('CONGTRINH', { MaCT: { type: DataTypes.STRING, primaryKey: true }, TenCT: DataTypes.STRING, DiaDiem: DataTypes.STRING }),
    'ton-kho': defineModel('TONKHO', { 
        MaKHO: { type: DataTypes.STRING, primaryKey: true }, 
        MaVT: { type: DataTypes.STRING, primaryKey: true }, 
        SoLuong: DataTypes.INTEGER 
    })
};


async function seedData() {
    try {
        await sequelize.sync(); 
        if (await models['vattu'].count() === 0) {
            console.log("🛠 Đang khởi tạo 30 dòng dữ liệu mẫu cho 6 bảng...");

          
            await models['vattu'].bulkCreate([
                { MaVT: 'VT01', TenVT: 'Xi măng PC40', DonVi: 'Tấn', LoaiVT: 'Vật liệu thô' },
                { MaVT: 'VT02', TenVT: 'Sắt phi 12', DonVi: 'Cây', LoaiVT: 'Kim loại' },
                { MaVT: 'VT03', TenVT: 'Cát vàng xây tô', DonVi: 'Khối', LoaiVT: 'Vật liệu thô' },
                { MaVT: 'VT04', TenVT: 'Đá 1x2', DonVi: 'Khối', LoaiVT: 'Vật liệu thô' },
                { MaVT: 'VT05', TenVT: 'Gạch 4 lỗ', DonVi: 'Viên', LoaiVT: 'Vật liệu xây' }
            ]);

           
            await models['kho'].bulkCreate([
                { MaKHO: 'K01', TenKHO: 'Kho Quận 9', DiaChi: 'Lê Văn Việt, TP.HCM' },
                { MaKHO: 'K02', TenKHO: 'Kho Thủ Đức', DiaChi: 'Võ Văn Ngân, TP.HCM' },
                { MaKHO: 'K03', TenKHO: 'Kho Bình Chánh', DiaChi: 'Quốc lộ 1A, TP.HCM' },
                { MaKHO: 'K04', TenKHO: 'Kho Gia Lâm', DiaChi: 'Trâu Quỳ, Hà Nội' },
                { MaKHO: 'K05', TenKHO: 'Kho Đà Nẵng', DiaChi: 'Liên Chiểu, Đà Nẵng' }
            ]);

           
            await models['ncc'].bulkCreate([
                { MaNCC: 'NCC01', TenNCC: 'Tập đoàn Hòa Phát', DiaChi: 'Hưng Yên', Email: 'sales@hoaphat.com.vn' },
                { MaNCC: 'NCC02', TenNCC: 'Xi măng Insee', DiaChi: 'Kiên Giang', Email: 'contact@insee.vn' },
                { MaNCC: 'NCC03', TenNCC: 'Gạch Đồng Tâm', DiaChi: 'Long An', Email: 'info@dongtam.com.vn' },
                { MaNCC: 'NCC04', TenNCC: 'Nhựa Bình Minh', DiaChi: 'TP.HCM', Email: 'support@binhminh.vn' },
                { MaNCC: 'NCC05', TenNCC: 'Sơn Nippon', DiaChi: 'Đồng Nai', Email: 'care@nipponpaint.com.vn' }
            ]);

          
            await models['nhan-vien'].bulkCreate([
                { MaNV: 'NV01', TenNV: 'Nguyễn Thành Công', GioiTinh: 'Nam', NamSinh: 2005, DiaChi: 'Hà Nội' },
                { MaNV: 'NV02', TenNV: 'Trịnh Đình Thành', GioiTinh: 'Nam', NamSinh: 2005, DiaChi: 'Bắc Ninh' },
                { MaNV: 'NV03', TenNV: 'Triệu Quang Trung', GioiTinh: 'Nam', NamSinh: 2005, DiaChi: 'Nam Định' },
                { MaNV: 'NV04', TenNV: 'Lê Thị Mai', GioiTinh: 'Nữ', NamSinh: 1998, DiaChi: 'Hải Phòng' },
                { MaNV: 'NV05', TenNV: 'Phạm Bảo Nam', GioiTinh: 'Nam', NamSinh: 2000, DiaChi: 'TP.HCM' }
            ]);

         
            await models['cong-trinh'].bulkCreate([
                { MaCT: 'CT01', TenCT: 'Cầu Vĩnh Tuy 2', DiaDiem: 'Hà Nội' },
                { MaCT: 'CT02', TenCT: 'Metro Tuyến số 1', DiaDiem: 'TP.HCM' },
                { MaCT: 'CT03', TenCT: 'Chung cư Vinhomes', DiaDiem: 'Gia Lâm' },
                { MaCT: 'CT04', TenCT: 'Sân bay Long Thành', DiaDiem: 'Đồng Nai' },
                { MaCT: 'CT05', TenCT: 'Cầu Rồng 2', DiaDiem: 'Đà Nẵng' }
            ]);

         
            await models['ton-kho'].bulkCreate([
                { MaKHO: 'K01', MaVT: 'VT01', SoLuong: 150 },
                { MaKHO: 'K01', MaVT: 'VT02', SoLuong: 2000 },
                { MaKHO: 'K02', MaVT: 'VT01', SoLuong: 85 },
                { MaKHO: 'K03', MaVT: 'VT03', SoLuong: 500 },
                { MaKHO: 'K04', MaVT: 'VT05', SoLuong: 10000 }
            ]);

            console.log("✅ Đã hoàn tất nạp 5 mẫu dữ liệu cho mỗi bảng!");
        }
    } catch (err) { console.error("❌ Lỗi nạp dữ liệu:", err.message); }
}

app.get('/api/:table', async (req, res) => res.json(await models[req.params.table].findAll()));
app.post('/api/:table', async (req, res) => res.json(await models[req.params.table].create(req.body)));

app.put('/api/:table/:id', async (req, res) => {
    const model = models[req.params.table];
    if (req.params.table === 'ton-kho') {
        const [k, v] = req.params.id.split('_');
        await model.update(req.body, { where: { MaKHO: k, MaVT: v } });
    } else {
        const pk = model.primaryKeyAttributes[0];
        await model.update(req.body, { where: { [pk]: req.params.id } });
    }
    res.send("OK");
});

app.delete('/api/:table/:id', async (req, res) => {
    const model = models[req.params.table];
    if (req.params.table === 'ton-kho') {
        const [k, v] = req.params.id.split('_');
        await model.destroy({ where: { MaKHO: k, MaVT: v } });
    } else {
        const pk = model.primaryKeyAttributes[0];
        await model.destroy({ where: { [pk]: req.params.id } });
    }
    res.send("OK");
});

sequelize.authenticate().then(() => { seedData(); app.listen(3000, () => console.log("🚀 Server: http://localhost:3000")); });