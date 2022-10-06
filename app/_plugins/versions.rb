# frozen_string_literal: true

module Jekyll
  class Versions < Jekyll::Generator
    priority :high

    def generate(site)
      latest = site.data['versions'].reject { |v| v['release'] == 'dev' }.last

      site.data['latest_version'] = latest
    end
  end
end
