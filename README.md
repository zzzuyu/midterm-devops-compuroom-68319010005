# ระบบบันทึกข้อมูลเครื่องคอมพิวเตอร์ประจำห้อง

![CI](https://github.com/zzzuyu/midterm-devops-compuroom-68319010005/actions/workflows/ci.yml/badge.svg)

## ข้อมูลผู้จัดทำ

ชื่อ-นามสกุล: นายชนวีร์ สุขะ
รหัสนักศึกษา: 68319010005  
ระดับชั้น/กลุ่มเรียน:ปวส.2/1

## คำอธิบายระบบ

ระบบสำหรับบันทึกข้อมูลเครื่องคอมพิวเตอร์ประจำห้อง สามารถเพิ่ม แสดง แก้ไข และลบข้อมูลเครื่องคอมพิวเตอร์ได้

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | ตรวจสอบสถานะระบบ |
| GET | `/api/computers` | แสดงข้อมูลคอมพิวเตอร์ทั้งหมด |
| GET | `/api/computers/:id` | แสดงข้อมูลคอมพิวเตอร์ตาม ID |
| POST | `/api/computers` | เพิ่มข้อมูลคอมพิวเตอร์ |
| PUT | `/api/computers/:id` | แก้ไขข้อมูลคอมพิวเตอร์ |
| DELETE | `/api/computers/:id` | ลบข้อมูลคอมพิวเตอร์ |

## วิธีรันแบบ Development

```bash
docker compose up --build