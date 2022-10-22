//
// Note:
// We need to split the includes in this way
// because custom needs tailwind-utilities and
// we can't import it in a .scss file

import '@/styles/core.scss'
import 'virtual:windi-utilities.css'
import '@/styles/custom.scss'

//
// Javascript
//
import Sidebar from '@/javascripts/sidebar'
import DistributionDropdown from '@/javascripts/distribution_dropdown'
import HomeTabs from '@/javascripts/home_tabs'
import Tabs from '@/javascripts/tabs'
import Form  from '@/javascripts/form'
import FormPopUp from '@/javascripts/form_popup'
import NavBar from '@/javascripts/navbar'
import '@/javascripts/page_masthead_waves'
import '@/javascripts/newsletter_waves'
import '@/javascripts/carousels'
import '@/javascripts/version_selector'
import '@/javascripts/search'
import '@/javascripts/prism'

document.addEventListener('DOMContentLoaded', (event) => {
  new Sidebar();
  new DistributionDropdown();
  new HomeTabs();
  new Tabs();
  new Form();
  new FormPopUp();
  new NavBar();
});
