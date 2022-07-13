<template>
  <div>app</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import http from './http'
import { downloadFile, generatorFile, parseFileName, generatorFileAxios } from '../src'

onMounted(() => {
  http
    .get('/file', { params: { file: 'zip' }, responseType: 'arraybuffer' })
    .then(res => {
      console.log('res:', res, typeof res.data, res.data.byteLength)
      console.log('parseFileName(res):', parseFileName(res.headers['content-disposition']))
      // generatorFileAxios(res)
      // downloadFile('123.xls', res.data, 'application/vnd.ms-excel;charset=UTF-8')
    })
    .catch(err => {
      console.log('err:', err)
    })
})
</script>

<style></style>
