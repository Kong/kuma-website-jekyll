import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-yaml.min.js'
import 'prismjs/components/prism-json.min.js'

import 'prismjs/plugins/show-language/prism-show-language.min.js'
import 'prismjs/plugins/autoloader/prism-autoloader.min.js'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";

import 'prismjs/themes/prism.min.css'
import "prismjs/themes/prism-tomorrow.min.css";
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css'

import '@/styles/prismjs/prism-vs.scss'

Prism.hooks.add('complete', (env) => {
  const pre = env.element.parentNode;

  if (env.element.querySelector('.line-numbers-rows')) {
    let wrapper  = document.createElement('div');
    wrapper.classList.add('line-numbers-mode', env.element.className);
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
  }
});

Prism.highlightAll();
