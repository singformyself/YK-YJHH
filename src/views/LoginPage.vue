<template>
  <ion-page>
    <ion-content class="ion-padding">

      <!-- 顶部Logo区域 -->
      <div class="logo-container ion-text-center">
        <ion-text color="dark">
          <h1>永康交警应急护航</h1>
        </ion-text>
        <ion-text color="medium">
          <p class="subtitle">智慧交通 · 平安出行</p>
        </ion-text>
      </div>

      <!-- 登录表单 -->
      <div class="login-card">
        <div>
          <ion-list lines="none">
            <!-- 手机号输入 -->
            <ion-item class="custom-item">
              <ion-icon slot="start" :icon="phonePortraitOutline" color="medium"></ion-icon>
              <ion-input
                type="tel"
                placeholder="请输入手机号"
                v-model="phone"
                :maxlength="11"
                clear-input
              ></ion-input>
            </ion-item>

            <!-- 验证码输入 -->
            <ion-item class="custom-item verification-item">
              <ion-icon slot="start" :icon="keyOutline" color="medium"></ion-icon>
              <div class="verification-container">
                <ion-input
                  type="number"
                  placeholder="请输入验证码"
                  v-model="verificationCode"
                  :maxlength="6"
                  clear-input
                ></ion-input>
                <ion-button 
                  :disabled="!canSendCode"
                  @click="sendVerificationCode"
                  size="small"
                  class="send-code-btn"
                  fill="outline"
                >
                  {{ sendCodeText }}
                </ion-button>
              </div>
            </ion-item>
          </ion-list>

          <!-- 登录按钮 -->
          <div class="ion-padding">
            <ion-button 
              expand="block"
              :disabled="!canLogin"
              @click="handleLogin"
              class="login-button"
              shape="round"
            >
              <ion-icon slot="start" :icon="logInOutline"></ion-icon>
              登录
            </ion-button>
          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="footer ion-text-center">
        <ion-text color="medium">
          <small>©永康数城提供技术支持</small>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
} from '@ionic/vue';
import { 
  phonePortraitOutline, 
  keyOutline, 
  logInOutline,
} from 'ionicons/icons';
import { ref, computed, onUnmounted } from 'vue';

// 响应式状态
const phone = ref('');
const verificationCode = ref('');
const countdown = ref(0);
const timer = ref<number | null>(null);

// 计算属性
const canSendCode = computed(() => {
  return /^1[3-9]\d{9}$/.test(phone.value) && countdown.value === 0;
});

const canLogin = computed(() => {
  return /^1[3-9]\d{9}$/.test(phone.value) && /^\d{6}$/.test(verificationCode.value);
});

const sendCodeText = computed(() => {
  return countdown.value > 0 ? `${countdown.value}s` : '获取验证码';
});

// 方法
const startCountdown = () => {
  countdown.value = 60;
  timer.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    }
  }, 1000);
};

const sendVerificationCode = () => {
  if (!canSendCode.value) return;
  // TODO: 实现发送验证码的逻辑
  startCountdown();
};

const handleLogin = () => {
  if (!canLogin.value) return;
  // TODO: 实现登录逻辑
  console.log('登录信息：', {
    phone: phone.value,
    code: verificationCode.value
  });
};

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>
<style scoped>

/* Logo区域 */
.logo-container {
  margin-top: 10vh;
  margin-bottom: 6vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container h1 {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(120deg, #4d8bff, rgba(103, 12, 250, 0.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  text-shadow: 0 5px 10px rgba(21, 38, 70, 0.2);
}

.subtitle {
  margin-top: 12px;
  font-size: 15px;
  letter-spacing: 3px;
  color: #8b93a7;
  font-weight: 300;
}

/* 登录卡片 */
.login-card {
  margin: 0 16px;
}

/* 表单项 */
.custom-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 0;
  margin: 16px 0;
  border-radius: 12px;
  --background: rgba(240, 242, 245, 0.8);
  --border-color: transparent;
   --highlight-color-focused: #4d8bff;
}
.custom-item ion-input {
  --background: transparent;
  --padding-start: 8px;
  --placeholder-color: #8e8e93;
  --placeholder-opacity: 0.6;
}

.custom-item ion-icon {
  color: #8e8e93;
  opacity: 0.8;
  margin-right: 4px;
}

/* 验证码区域 */
.verification-container {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.verification-container ion-input {
  flex: 1;
  --border-width: 0;
  --border-style: none;
  --highlight-height: 0;
}

/* 发送验证码按钮 */
.send-code-btn {
  margin: 0;
  height: 36px;
  --border-radius: 18px;
  --color: #4d8bff;
  --border-color: #4d8bff;
  font-size: 13px;
  --padding-start: 16px;
  --padding-end: 16px;
  --background: rgba(77, 139, 255, 0.1);
  transition: all 0.3s ease;
}

.send-code-btn:hover {
  --background: rgba(77, 139, 255, 0.15);
}

/* 登录按钮 */
.login-button {
  margin-top: 32px;
  height: 50px;
  --border-radius: 25px;
  --background: linear-gradient(120deg, #4d8bff, #6c47ff);
  --box-shadow: 0 8px 20px rgba(77, 139, 255, 0.2);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  transition: all 0.3s ease;
}

.login-button ion-icon {
  font-size: 20px;
  margin-right: 8px;
  --ionicon-stroke-width: 48px;
  opacity: 0.95;
}

.login-button:hover {
  --background: linear-gradient(120deg, #5693ff, #724dff);
  --box-shadow: 0 8px 25px rgba(77, 139, 255, 0.25);
}

/* 底部版权信息 */
.footer {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>