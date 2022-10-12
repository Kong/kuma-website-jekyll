require 'erb'
require 'securerandom'

module Jekyll
  module Tabs
    class TabsBlock < Liquid::Block
      def initialize(tag_name, options, tokens)
        super

        @options = options.split(' ').each_with_object({}) do |o, h|
          key, value = o.split('=')
          h[key] = value
        end
      end

      def render(context)
        environment = context.environments.first
        environment['tabs'] = {} # reset each time

        super

        options = @options
        templateFile = File.read(File.expand_path('template.erb', __dir__))
        template = ERB.new(templateFile)
        template.result(binding)
      end
    end

    class TabBlock < Liquid::Block
      alias_method :render_block, :render

      def initialize(tag_name, tab_name, tokens)
        super

        @tab = tab_name
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

        environment = context.environments.first
        environment['tabs'] ||= {}
        environment['tabs'][@tab] = converter.convert(render_block(context))
      end
    end
  end
end

Liquid::Template.register_tag('tab', Jekyll::Tabs::TabBlock)
Liquid::Template.register_tag('tabs', Jekyll::Tabs::TabsBlock)
