var mywiki = {
    getCSS: function(url) {
        var tag = '<link rel="stylesheet" type="text/css" href="' + url + '" />';
        $('body').append(tag);
    },
    disqus_shortname: 'wsmithrilswiki'
}

$(document).ready(function() {
    // DIE IE, DIE
    if ($.browser.msie) {
        $('div.content').replaceWith("DIE IE, DIE");
        return;
    }

    // copyright
    $('div#copyright').append(
        '<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/cn/"><img alt="知识共享许可协议" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/2.5/cn/88x31.png" /></a>'
      + '<br />'
      + '本作品由<span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">WsMithril</span>创作，采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/cn/">知识共享署名-非商业性使用-相同方式共享 2.5 中国大陆许可协议</a>进行许可。'
    );

    // toc
    var toggler = $('<div class="toggler" title="Click to Expand">Content</div>'),
    toc = $('.toc');
    toc.wrap('<div class="tocWrap">');

    $('.tocWrap').prepend(toggler)
    .delay(500)
    .fadeTo(500, '0.25')
    .hover(function() { $(this).stop().fadeTo(300, '0.9'); }, function() { $(this).stop().fadeTo(300, '0.25'); });

    $('html').keypress(function(e) {
        if (e.shiftKey && (e.charCode || e.keyCode) == '90') {
            e.preventDefault();
            $('div.tocWrap').toggle(200);
        }
    });

    toggler.click(function() {
        $('div.toc').slideToggle(300);
    });

    // add disqus comment
    if (!$.browser.msie) {
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + mywiki.disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    }

    // synatax hilight
    mywiki.getCSS("/SyntaxHighlighter/styles/shThemeRDark.css");
    (function() {
        $.getScript("/SyntaxHighlighter/scripts/shCore.js", function() {
        $.getScript("/SyntaxHighlighter/scripts/shAutoloader.js", function() {
            SyntaxHighlighter.autoloader(
              'applescript            /SyntaxHighlighter/scripts/shBrushAppleScript.js',
              'actionscript3 as3      /SyntaxHighlighter/scripts/shBrushAS3.js',
              'Bash bash shell        /SyntaxHighlighter/scripts/shBrushBash.js',
              'coldfusion cf          /SyntaxHighlighter/scripts/shBrushColdFusion.js',
              'cpp c                  /SyntaxHighlighter/scripts/shBrushCpp.js',
              'c# c-sharp csharp      /SyntaxHighlighter/scripts/shBrushCSharp.js',
              'css                    /SyntaxHighlighter/scripts/shBrushCss.js',
              'delphi pascal          /SyntaxHighlighter/scripts/shBrushDelphi.js',
              'diff patch pas         /SyntaxHighlighter/scripts/shBrushDiff.js',
              'erl erlang             /SyntaxHighlighter/scripts/shBrushErlang.js',
              'groovy                 /SyntaxHighlighter/scripts/shBrushGroovy.js',
              'java                   /SyntaxHighlighter/scripts/shBrushJava.js',
              'jfx javafx             /SyntaxHighlighter/scripts/shBrushJavaFX.js',
              'js jscript javascript  /SyntaxHighlighter/scripts/shBrushJScript.js',
              'perl pl                /SyntaxHighlighter/scripts/shBrushPerl.js',
              'php                    /SyntaxHighlighter/scripts/shBrushPhp.js',
              'text plain             /SyntaxHighlighter/scripts/shBrushPlain.js',
              'py python              /SyntaxHighlighter/scripts/shBrushPython.js',
              'ruby rails ror rb      /SyntaxHighlighter/scripts/shBrushRuby.js',
              'sass scss              /SyntaxHighlighter/scripts/shBrushSass.js',
              'scala                  /SyntaxHighlighter/scripts/shBrushScala.js',
              'sql                    /SyntaxHighlighter/scripts/shBrushSql.js',
              'vb vbnet               /SyntaxHighlighter/scripts/shBrushVb.js',
              'xml xhtml xslt html    /SyntaxHighlighter/scripts/shBrushXml.js',
              'scheme                 /SyntaxHighlighter/scripts/shBrushScheme.js',
              'hs haskell             /SyntaxHighlighter/scripts/shBrushHaskell.js',
              'asm x86 Asm            /SyntaxHighlighter/scripts/shBrushAsm.js'
            );
            SyntaxHighlighter.defaults['toolbar']    = false;
            SyntaxHighlighter.defaults['gutter']     = true;
            SyntaxHighlighter.defaults['smart-tabs'] = true;
            SyntaxHighlighter.defaults['ruler']      = true;
            SyntaxHighlighter.defaults['tab-size']   = 4;
            SyntaxHighlighter.all();
        });});
    })();


});
