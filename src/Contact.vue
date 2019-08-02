<template>
  <v-ons-page>
      <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
        <div class="center">お問い合わせ</div>
      </v-ons-toolbar>
    <div>
      <v-card>
        <v-container>
          <v-form ref="form" v-model="contactFormValidation.valid" lazy-validation>
            <v-text-field
                v-model="contactForm.name"
                :rules="contactFormValidation.nameRules"
                placeholder="名前"
                required
                    ></v-text-field>
                    <v-text-field
                            v-model="contactForm.email"
                            :rules="contactFormValidation.emailRules"
                            placeholder="メールアドレス"
                            required
                    ></v-text-field>
                    <v-textarea
                            v-model="contactForm.contents"
                            :rules="contactFormValidation.contentsRules"
                            placeholder="内容"
                            required
                    ></v-textarea>
                    <v-btn
                            :loading="contactForm.loading"
                            :disabled="!contactFormValidation.valid"
                            @click="sendMail()"
                            block
                            large
                            color="info"
                            class="mt-4 font-weight-bold"
                    >送信
                    </v-btn>
                </v-form>
            </v-container>
        </v-card>
        <v-snackbar
                v-model="snackBar.show"
                :color="snackBar.color"
                bottom
                right
                :timeout="6000"
                class="font-weight-bold"
        >
            {{snackBar.message}}
        </v-snackbar>
    </div>
  </v-ons-page>
</template>

<script>
import { functions } from '@/plugins/firebase'

  export default {
    data: () => ({
      contactForm: {
        name: '',
        contents: '',
        email: '',
        loading: false
      },
      contactFormValidation: {
        valid: false,
        nameRules: [v => !!v || '名前は必須項目です'],
        emailRules: [v => !!v || 'メールアドレスは必須項目です'],
        contentsRules: [v => !!v || '内容は必須項目です']
      },
      snackBar: {
        show: false,
        color: '',
        message: ''
      }
    }),
    methods: {
      sendMail: function () {
        if (this.$refs.form.validate()) {
          this.contactForm.loading = true
          const mailer = functions.httpsCallable('sendMail')

          mailer(this.contactForm)
            .then(() => {
              this.formReset()
              this.showSnackBar(
                'success',
                'お問い合わせありがとうございます。送信完了しました'
              )
            })
            .catch(err => {
              this.showSnackBar(
                'error',
                '送信に失敗しました。時間をおいて再度お試しください'
              )
              console.log(err)
            })
            .finally(() => {
              this.contactForm.loading = false
            })
        }
      },
      showSnackBar: function (color, message) {
        this.snackBar.message = message
        this.snackBar.color = color
        this.snackBar.show = true
      },
      formReset: function () {
        this.$refs.form.reset()
      }
    },
  props: ['pageStack']
  }
</script>