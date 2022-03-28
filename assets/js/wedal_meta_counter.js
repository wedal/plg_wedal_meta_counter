(function($) {
    $(document).ready(function() {

        var m_title_max = 60;
        var m_desc_max = 160;
        var m_title = [];
        var m_desc = [];
        var m_title_badge = [];
        var m_desc_badge = [];
        var badge;
        var label_color = 'badge-success bg-success';

        if(plg_system_wedal_meta_counter_params.params.title_length > 0) {
            m_title_max = plg_system_wedal_meta_counter_params.params.title_length;
        }

        if(plg_system_wedal_meta_counter_params.params.desc_length > 0) {
            m_desc_max = plg_system_wedal_meta_counter_params.params.desc_length;
        }

        //=============================== Joomla support ===============================
        // Joomla title
        m_title.push($('.com_menus.view-item #jform_title'));
        m_title.push($('.com_menus.view-item #jform_params_page_title'));
        m_title.push($('.com_categories.view-category #jform_title'));
        m_title.push($('.com_content.view-article #jform_title'));
        m_title.push($('.com_content.view-article #jform_attribs_article_page_title'));

        // Joomla meta-desc
        m_desc.push($('.com_menus.view-item #jform_params_menu_meta_description'));
        m_desc.push($('.com_categories.view-category #jform_metadesc'));
        m_desc.push($('.com_content.view-article #jform_metadesc'));

        //=============================== Virtuemart support ===============================
        // Virtuemart title support
        m_title.push($('.virtuemart-admin-area #adminForm input#category_name'));
        m_title.push($('.virtuemart-admin-area #adminForm input#customtitle'));
        m_title.push($('.virtuemart-admin-area #adminForm input#product_name'));

        // Virtuemart meta-desc support
    	 m_desc.push($('.virtuemart-admin-area #adminForm #metadesc'));

        //=============================== JoomShopping support ===============================
    	//JoomShopping title support
        $('.com_jshopping input[name*=name_]').each(function(){
            m_title.push(this);
        });
        $('.com_jshopping input[name*=meta_title_]').each(function(){
            m_title.push(this);
        });

        //JoomShopping meta-desc support
        $('.com_jshopping textarea[name*=short_description_]').each(function(){
            m_desc.push(this);
        });
        $('.com_jshopping input[name*=meta_description_]').each(function(){
            m_desc.push(this);
        });
        //====================================================================================

        $.each(m_title, function(i) {
            field_length = ($(this).val() || '').length;
            if (field_length == 0) {
                field_length = m_title_max;
            } else {
                field_length = m_title_max - field_length;
                if (field_length < 0) {
                    label_color = 'badge-important bg-danger';
                } else {
                    label_color = 'badge-success bg-success';
                }
            }
            badge = '<span style="margin-left: 5px;" class="badge '+label_color+' hasTooltip" title="" data-original-title="'+plg_system_wedal_meta_counter_params.PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT+'">'+field_length+'</span>';
            $(this).after(badge);
            m_title_badge[i] = $(this).next('.badge');
            CharsCounter ($(this), m_title_max, m_title_badge[i]);
        });


        $.each(m_desc, function(i) {
            field_length = ($(this).val() || '').length;
            if (field_length == 0) {
                field_length = m_desc_max;
            } else {
                field_length = m_desc_max - field_length;
                if (field_length < 0) {
                    label_color = 'badge-important bg-danger';
                } else {
                    label_color = 'badge-success bg-success';
                }
            }
            badge = '<span style="margin-left: 5px;" class="badge '+label_color+' hasTooltip" title="" data-original-title="'+plg_system_wedal_meta_counter_params.PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT+'">'+field_length+'</span>';
            $(this).after(badge);
            m_desc_badge[i] = $(this).next('.badge');
            CharsCounter ($(this), m_desc_max, m_desc_badge[i]);
        });

    });

    function CharsCounter (CountedInput, max, CountedBage) {
        $(CountedInput).keyup(function() {
            var count = $(this).val().length;
            var num = max - count;
            $(CountedBage).text(num);
            if (num > -1) {
                $(CountedBage).removeClass('badge-important');
                $(CountedBage).addClass('badge-success');
            } else {
                $(CountedBage).removeClass('badge-success');
                $(CountedBage).addClass('badge-important');
            }
        });

        $(CountedInput).on('focusout', function(event) {
            count = $(this).val().length;
            var num = max - count;
            $(CountedBage).text(num);
            if (num > -1) {
                $(CountedBage).removeClass('badge-important');
                $(CountedBage).addClass('badge-success');
            } else {
                $(CountedBage).removeClass('badge-success');
                $(CountedBage).addClass('badge-important');
            }
        });
    }

})(jQuery);
