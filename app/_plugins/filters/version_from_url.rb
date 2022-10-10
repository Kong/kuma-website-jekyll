# frozen_string_literal: true

module Jekyll
  module VersionFromURL
    def version_from_url(url)
      splits = url.delete_suffix('.html').split('/')
      current_version = splits[2]

      if current_version == 'latest'
        current_version = @context
          .registers[:site]
          .data['latest_version']['release']
      end

      current_version
    end
  end
end

Liquid::Template.register_filter(Jekyll::VersionFromURL)
