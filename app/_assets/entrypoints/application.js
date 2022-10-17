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
import '@/javascripts/page_masthead_waves'
import '@/javascripts/newsletter_waves'
import '@/javascripts/carousels'

document.addEventListener('DOMContentLoaded', (event) => {
  new Sidebar();
  new DistributionDropdown();
});
