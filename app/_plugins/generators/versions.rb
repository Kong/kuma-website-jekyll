# frozen_string_literal: true

module Jekyll
  class Versions < Jekyll::Generator
    priority :high

    def generate(site)
      latest = site.data['versions'].reject { |v| v['release'] == 'dev' }.last

      site.data['latest_version'] = latest

      # Add a `version` property to every versioned page
      # TODO: Also create aliases under /latest/ for all x.x.x doc pages
      site.pages.each do |page|
        next unless page.path.start_with? 'docs'

        parts = Pathname(page.path).each_filename.to_a

        page.data['has_version'] = true
        page.data['version'] = parts[1]

        page.data['nav_items'] = site.data["docs_nav_kuma_#{parts[1].gsub(/\./, '')}"]

        # Clean up nav_items for generated pages as there's an
        # additional level of nesting
        page.data['nav_items'] = page.data['nav_items']['items'] if page.data['nav_items'].is_a?(Hash)
      end
    end
  end
end
