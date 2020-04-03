(function($) {
    $(document).ready(function() {

        var m_title_max = 60;
        var m_desc_max = 160;
        var m_title = [];
        var m_desc = [];
        var m_title_badge = [];
        var m_desc_badge = [];
        var badge;
        var label_color = 'label-success';

        if(plg_system_wedal_meta_counter_params.params.title_length > 0) {
            m_title_max = plg_system_wedal_meta_counter_params.params.title_length;
        }

        if(plg_system_wedal_meta_counter_params.params.desc_length > 0) {
            m_desc_max = plg_system_wedal_meta_counter_params.params.desc_length;
        }

        // Joomla title
        m_title.push($('.com_menus.view-item #jform_title'));
        m_title.push($('.com_menus.view-item #jform_params_page_title'));
        m_title.push($('.com_categories.view-category #jform_title'));
        m_title.push($('.com_content.view-article #jform_title'));
        m_title.push($('.com_content.view-article #jform_attribs_article_page_title'));

        // Virtuemart title support
    	m_title.push($('.virtuemart-admin-area #adminForm input#category_name'));
    	m_title.push($('.virtuemart-admin-area #adminForm input#customtitle'));
    	m_title.push($('.virtuemart-admin-area #adminForm input#product_name'));

        // Joomla meta-desc
        m_desc.push($('.com_menus.view-item #jform_params_menu_meta_description'));
        m_desc.push($('.com_categories.view-category #jform_metadesc'));
        m_desc.push($('.com_content.view-article #jform_metadesc'));

        // Virtuemart meta-desc support
    	m_desc.push($('.virtuemart-admin-area #adminForm #metadesc'));

        $.each(m_title, function(i) {
            field_length = ($(this).val() || '').length;
            if (field_length == 0) {
                field_length = m_title_max;
            } else {
                field_length = m_title_max - field_length;
                if (field_length < 0) {
                    label_color = 'label-important';
                } else {
                    label_color = 'label-success';
                }
            }
            badge = '<span style="margin-left: 5px;" class="label '+label_color+' hasTooltip" title="" data-original-title="'+plg_system_wedal_meta_counter_params.PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT+'">'+field_length+'</span>';
            $(this).after(badge);
            m_title_badge[i] = $(this).next('.label');
            CharsCounter ($(this), m_title_max, m_title_badge[i]);
        });


        $.each(m_desc, function(i) {
            field_length = ($(this).val() || '').length;
            if (field_length == 0) {
                field_length = m_desc_max;
            } else {
                field_length = m_desc_max - field_length;
                if (field_length < 0) {
                    label_color = 'label-important';
                } else {
                    label_color = 'label-success';
                }
            }
            badge = '<span style="margin-left: 5px;" class="label '+label_color+' hasTooltip" title="" data-original-title="'+plg_system_wedal_meta_counter_params.PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT+'">'+field_length+'</span>';
            $(this).after(badge);
            m_desc_badge[i] = $(this).next('.label');
            CharsCounter ($(this), m_desc_max, m_desc_badge[i]);
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
