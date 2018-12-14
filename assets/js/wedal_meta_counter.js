(function($) {
    $(document).ready(function() {

        var m_title_max = 60;
        var m_desc_max = 160;
        var m_title = [];
        var m_desc = [];
        var m_title_badge = [];
        var m_desc_badge = [];
        var badge;

        if(plg_system_wedal_meta_counter_params.params.title_length > 0) {
            m_title_max = plg_system_wedal_meta_counter_params.params.title_length;
        }

        if(plg_system_wedal_meta_counter_params.params.desc_length > 0) {
            m_desc_max = plg_system_wedal_meta_counter_params.params.desc_length;
        }

        m_title[0] = $('.com_menus.view-item #jform_title');
        m_title[1] = $('.com_menus.view-item #jform_params_page_title');
        m_title[2] = $('.com_content.view-article #jform_title');
        m_title[3] = $('.com_content.view-article #jform_attribs_article_page_title');

        m_desc[0] = $('.com_menus.view-item #jform_params_menu_meta_description');
        m_desc[1] = $('.com_content.view-article #jform_metadesc');

        $.each(m_title, function(i) {
            field_length = (m_title[i].val() || '').length;
            if (field_length == 0) {
                field_length = m_title_max;
            } else {
                field_length = m_title_max - field_length;
            }
            badge = '<span style="margin-left: 5px;" class="label label-success hasTooltip" title="" data-original-title="'+plg_system_wedal_meta_counter_params.PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT+'">'+field_length+'</span>';
            m_title[i].after(badge);
            m_title_badge[i] = m_title[i].next('.label');
            CharsCounter (m_title[i], m_title_max, m_title_badge[i]);
        });


        $.each(m_desc, function(i) {
            field_length = (m_desc[i].val() || '').length;
            if (field_length == 0) {
                field_length = m_desc_max;
            } else {
                field_length = m_desc_max - field_length;
            }
            badge = '<span style="margin-left: 5px;" class="label label-success hasTooltip" title="" data-original-title="'+plg_system_wedal_meta_counter_params.PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT+'">'+field_length+'</span>';
            m_desc[i].after(badge);
            m_desc_badge[i] = m_desc[i].next('.label');
            CharsCounter (m_desc[i], m_desc_max, m_desc_badge[i]);
        });

    });

    function CharsCounter (CountedInput, max, CountedBage) {
        $(CountedInput).keyup(function() {
            var count = $(this).val().length;
            var num = max - count;
            $(CountedBage).text(num);
            if (num > -1) {
                $(CountedBage).removeClass('label-important');
                $(CountedBage).addClass('label-success');
            } else {
                $(CountedBage).removeClass('label-success');
                $(CountedBage).addClass('label-important');
            }
        });

        $(CountedInput).on('focusout', function(event) {
            count = $(this).val().length;
            var num = max - count;
            $(CountedBage).text(num);
            if (num > -1) {
                $(CountedBage).removeClass('label-important');
                $(CountedBage).addClass('label-success');
            } else {
                $(CountedBage).removeClass('label-success');
                $(CountedBage).addClass('label-important');
            }
        });
    }

})(jQuery);
