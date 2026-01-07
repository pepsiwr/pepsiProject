<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">สมัครสมาชิก (Register)</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label">ชื่อผู้ใช้</label>
                <input
                  v-model="formData.username"
                  type="text"
                  class="form-control"
                  required
                  placeholder="ใส่ชื่อผู้ใช้"
                  :disabled="isLoading"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">อีเมล</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  required
                  placeholder="example@mail.com"
                  :disabled="isLoading"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">รหัสผ่าน</label>
                <input
                  v-model="formData.password"
                  type="password"
                  class="form-control"
                  minlength="6"
                  required
                  placeholder="รหัสผ่านอย่างน้อย 6 ตัว"
                  :disabled="isLoading"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="isLoading"
              >
                <span
                  v-if="isLoading"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {{ isLoading ? "กำลังบันทึกข้อมูล..." : "บันทึกข้อมูล" }}
              </button>
            </form>

            <div
              v-if="message"
              :class="[
                'alert',
                isError ? 'alert-danger' : 'alert-success',
                'mt-3',
              ]"
            >
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlapi from "@/typeScript/urlapi";

export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
      },
      message: "",
      isError: false,
      isLoading: false, // 1. เพิ่มสถานะ loading
    };
  },
  methods: {
    async handleRegister() {
      this.message = "";
      this.isLoading = true; // 2. เริ่มต้นการโหลด

      try {
        const response = await axios.post(
          `${urlapi}/api/register`,
          this.formData
        );
        console.log(response);
        this.message = response.data.message;
        this.isError = false;
        this.formData = { username: "", email: "", password: "" };
        if (response.status == 201) {
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        this.isError = true;
        this.message =
          error.response?.data?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ";
      } finally {
        this.isLoading = false; // 3. สิ้นสุดการโหลด (ไม่ว่าจะสำเร็จหรือพลาด)

        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
  },
};
</script>