<template>
  <div>
    {{ $v('Hello World') }}
    {{ $v('번역 된 거 1') }}
    {{ $v("번역 안된 거 1") }}
    {{ $v('번역 안된 거 2') }}
    {{ $t('COMMON') }}
    <!-- Not Matched -->
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
