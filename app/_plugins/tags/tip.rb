module Jekyll
  class Tip < Liquid::Block
    def initialize(tag_name, markup, options)
      super

      @markup = markup.strip
    end

    def render(context)
      content = Kramdown::Document.new(super).to_html

      <<~TIP
        <div class="custom-block tip">
          <p>#{content}</p>
        </div>
      TIP
    end
  end
end

Liquid::Template.register_tag('tip', Jekyll::Tip)
