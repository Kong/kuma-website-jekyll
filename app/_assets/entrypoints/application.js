//
// Note:
// We need to split the includes in this way
// because custom needs tailwind-utilities and
// we can't import it in a .scss file

import '@/styles/core.scss'

import 'virtual:windi-utilities.css'

import 'vuepress-plugin-tabs/dist/themes/default.styl'

import '@/styles/custom.scss'


//
// Javascript
//
import Sidebar from '@/javascripts/sidebar'
import '@/javascripts/page_masthead_waves'
import '@/javascripts/newsletter_waves'

new Sidebar();
