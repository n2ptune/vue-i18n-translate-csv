<template>
  <div>
    {{ $v('Hello World') }}
    {{ $v('번역 된 거 1') }}
    {{ $v("번역 안된 거 1") }}
    {{ $v('번역 안된 거 2') }}
    {{ $t('COMMON') }}
    <span
      class="name-form-noti"
      v-html="$v('<b>{shareName}</b>을 {state}하시겠습니까?<br>NAS 명을 동일하게 입력해주세요.', {
        shareName: shareDetailData.shareName,
        state: updateShareData
          ? $i18n.locale === 'en' ? 'change' : '변경'
          : $i18n.locale === 'en' ? 'delete' : '삭제'
      })"
    />
    <!-- Not Matched -->
    <span
      :title="$v('Private Cloud 월별 청구 금액 (최근 12개월)')"
    />
  </div>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    someTest() {
      const s = this.$v('번역 안된 거 3')
      const v = s ? this.$v(s) : this.$v(__dirname)
      const b = this.$v('번역 안된 거 4 {n} 변수와 함께', { n: 2 })
      const m = this.$v(`fjhuqf ${b}`) // Not Mathced
    }
  }
}
</script>
