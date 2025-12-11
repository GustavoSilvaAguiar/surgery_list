import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'


const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'pt',
    messages: {pt}
  },
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#079DDF',
          secondary: '#067EB2',
          terciary: '#1CB5F8',
        },
      },
    },
  },
})

export default vuetify
