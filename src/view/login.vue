<template>
  <div
    class="mt-5 auth-container d-flex align-items-center justify-content-center"
  >
    <div
      class="card shadow-lg p-4"
      style="width: 100%; max-width: 400px; border-radius: 20px"
    >
      <div class="text-center mb-4">
        <h2 class="fw-bold text-primary">เข้าสู่ระบบ</h2>
        <p class="text-muted small">ยินดีต้อนรับสู่โปรเจกต์ Pepsi Test</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">อีเมล (Email)</label>
          <input
            v-model="loginData.email"
            type="text"
            class="form-control"
            placeholder="example@mail.com"
            required
          />
        </div>

        <div class="mb-4">
          <label class="form-label">รหัสผ่าน (Password)</label>
          <input
            v-model="loginData.password"
            type="password"
            class="form-control"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100 py-2 mb-3 shadow-sm rounded-pill"
        >
          เข้าสู่ระบบ
        </button>
      </form>

      <div
        v-if="statusMessage"
        :class="[
          'alert',
          isError ? 'alert-danger' : 'alert-success',
          'py-2 text-center',
        ]"
      >
        {{ statusMessage }}
      </div>

      <div class="text-center mt-3">
        <span class="text-muted">ยังไม่มีบัญชีใช่ไหม?</span>
        <button
          @click="$router.push('/registar')"
          class="btn btn-link text-decoration-none fw-bold p-0 ms-1"
        >
          สมัครสมาชิกที่นี่
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlapi from "@/typeScript/urlapi";
import Crypto from "@/typeScript/CryptoJS.ts";

export default {
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      statusMessage: "",
      isError: false,
    };
  },
  methods: {
    async handleLogin() {
      this.statusMessage = "กำลังตรวจสอบข้อมูล...";
      this.isError = false;

      try {
        const response = await axios.post(
          `${urlapi}/api/login`,
          this.loginData
        );
        this.statusMessage = response.data.message;
        console.log(response);
        if (response.status == 200) {
          const endcrypt = await Crypto.encrypted(
            JSON.stringify(response.data.user)
          );
          sessionStorage.setItem("userInfo", endcrypt);
          this.$router.push("/dashboard");
        }
      } catch (error) {
        console.error(error);
        this.isError = true;
        this.statusMessage =
          error.response?.data?.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
      } finally {
        setTimeout(() => {
          this.statusMessage = "";
        }, 3000); // ล้างข้อความหลังจาก 3 วินาที
      }
    },
  },
};
</script>