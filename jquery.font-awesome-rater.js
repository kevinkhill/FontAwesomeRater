(function($) {
    $.fn.fontAwesomeRating = function(options) {
        var $this = this;
        var _far = {
            settings : $.extend(
                {
                    icon         : 'star',
                    classes      : '',
                    preset       : 0,
                    total        : 5,
                    defaultColor : "#ccc",
                    hoverColor   : "yellow"
                },
                options
            ),
            value : 0,
            setValue : function(val) {
                if(val)
                {
                    _far.value = val;
                    $this.val(_far.value);
                } else {
                    _far.value = _far.settings.preset;
                    $this.val(_far.value);
                }
            },
            renderIcons : function() {
                $this.hide();

                $this.wrap('<div class="font-awesome-rating"></div>')
                     .css('color', _far.settings.defaultColor);

                for(var a = 1; a <= _far.settings.total; a++)
                {
                    $this.parent('div')
                        .append('<i class="fa fa-' + _far.settings.icon + ' ' + _far.settings.classes + '" data-value="' + a + '"></i>')
                        .css({
                            color : _far.settings.defaultColor
                        });
                }
            },
            paintIcons : function(val) {
                var fill;

                if(val)
                {
                    fill = val;
                } else {
                    fill = _far.value;
                }

                $this.parent('div')
                    .find('i')
                    .each(function() {
                        if($(this).data('value') <= fill)
                        {
                            $(this).css('color', _far.settings.hoverColor);
                        } else {
                            $(this).css('color', _far.settings.defaultColor);
                        }
                    });
            },
            monitorMouseOver : function() {
                $this.parent('div')
                    .find('i')
                    .each(function() {
                        $(this).mouseover(function() {
                            $(this).css('cursor', 'pointer');
                            _far.paintIcons($(this).data('value'));
                        });
                    });
            },
            monitorMouseOut : function() {
                $this.parent('div')
                     .mouseout(function() {
                        _far.paintIcons();
                     });
            },
            monitorClick : function() {
                $this.parent('div')
                     .find('i')
                     .each(function() {
                        $(this).click(function() {
                            _far.setValue($(this).data('value'));
                            _far.paintIcons();
                        });
                     });
            },
            init : function() {
                _far.renderIcons();
                _far.setValue();
                _far.paintIcons();
                _far.monitorMouseOver();
                _far.monitorMouseOut();
                _far.monitorClick();
            }
        };

        _far.init();
    }
}(jQuery));
