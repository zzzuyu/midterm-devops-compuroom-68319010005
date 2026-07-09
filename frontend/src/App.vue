<template>
  <div class="container">
    <h2>ระบบบันทึกข้อมูลเครื่องคอมพิวเตอร์ประจำห้อง</h2>

    <h3>ชื่อ-นามสกุล : นาชนวีร์ สุขะ</h3>
    <h3>รหัสนักศึกษา : 68319010005</h3>

    <hr>

    <h2>Computer List</h2>
    <hr>

<input v-model="form.asset_code" placeholder="รหัสครุภัณฑ์">

<input v-model="form.brand_model" placeholder="ยี่ห้อ/รุ่น">

<input v-model="form.cpu" placeholder="CPU">

<input v-model="form.ram_gb" type="number" placeholder="RAM">

<input v-model="form.room" placeholder="ห้อง">

<input v-model="form.status" placeholder="สถานะ">

<br><br>

<button @click="saveComputer">

{{ editingId ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล" }}

</button>

<hr>
    <button @click="loadData">โหลดข้อมูล</button>

    <table border="1" cellspacing="0" cellpadding="10">

      <tr>

        <th>ID</th>
        <th>รหัสครุภัณฑ์</th>
        <th>ยี่ห้อ</th>
        <th>CPU</th>
        <th>RAM</th>
        <th>ห้อง</th>
        <th>สถานะ</th>
        <th>จัดการ</th>

      </tr>

      <tr
        v-for="computer in computers"
        :key="computer.id"
      >

        <td>{{ computer.id }}</td>
        <td>{{ computer.asset_code }}</td>
        <td>{{ computer.brand_model }}</td>
        <td>{{ computer.cpu }}</td>
        <td>{{ computer.ram_gb }}</td>
        <td>{{ computer.room }}</td>
        <td>{{ computer.status }}</td>

        <td>

          <button
            @click="editComputer(computer)"
          >

            แก้ไข

          </button>

          <button
            @click="deleteComputer(computer.id)"
          >

            ลบ

          </button>

        </td>

      </tr>

    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const computers = ref([]);
const form = ref({
  asset_code: "",
  brand_model: "",
  cpu: "",
  ram_gb: "",
  room: "",
  status: ""
});

const editingId = ref(null);

const loadData = async () => {
  const res = await axios.get("http://localhost:3001/api/computers");
  computers.value = res.data;
};

const saveComputer = async () => {

  if (editingId.value) {

    await axios.put(
      `http://localhost:3001/api/computers/${editingId.value}`,
      form.value
    );

  } else {

    await axios.post(
      "http://localhost:3001/api/computers",
      form.value
    );

  }

  form.value = {
    asset_code:"",
    brand_model:"",
    cpu:"",
    ram_gb:"",
    room:"",
    status:""
  };

  editingId.value = null;

  loadData();

};

const deleteComputer = async(id)=>{

  if(confirm("ลบข้อมูลใช่ไหม?")){

    await axios.delete(
      `http://localhost:3001/api/computers/${id}`
    );

    loadData();

  }

}

const editComputer = (computer)=>{

  editingId.value = computer.id;

  form.value = {

    asset_code: computer.asset_code,
    brand_model: computer.brand_model,
    cpu: computer.cpu,
    ram_gb: computer.ram_gb,
    room: computer.room,
    status: computer.status

  };

}

loadData();
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

.container {
  width: 900px;
  margin: 30px auto;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>