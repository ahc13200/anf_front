import * as mb from '@/helpers/loaders/model.load'
import Vue from 'vue'
export const state = Vue.observable({
  site: mb.instance('Site'),
  url: process.env.BASE_URL,
  image_url: process.env.BASE_URL
})

