source 'https://rubygems.org'

gem 'jekyll', '~> 4.2'
gem 'liquid-c'
gem 'rouge', '3.30.0'

group :jekyll_plugins do
  gem 'jekyll-paginate-v2'
  gem 'jekyll-last-modified-at'
  gem 'jekyll-contentblocks'
  gem 'jekyll-vite'
  gem 'jekyll-generator-single-source', git: 'git@github.com:Kong/jekyll-generator-single-source.git', branch: 'support-single-and-multiple-products'
end

group :development do
  # Webrick is no longer bundled with ruby 3
  # https://github.com/jekyll/jekyll/issues/8523
  gem "webrick", "~> 1.7"
  gem 'byebug'
end
