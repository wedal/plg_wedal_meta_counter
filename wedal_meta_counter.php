<?php 
/*
* @Author Wedal
* @Url https://wedal.ru
* @License http://www.gnu.org/licenses/gpl-3.0.html GNU/GPL
* @Version 1.1.2
*/
if (!defined('_JEXEC')) die('Direct Access to ' . basename(__FILE__) . ' is not allowed.');

class plgSystemWedal_Meta_Counter extends JPlugin {

	protected $autoloadLanguage = true;

	function __construct($event,$params){
		parent::__construct($event,$params);
	}

	function onBeforeRender() {

		if(!JFactory::getApplication()->isAdmin()) {
			return;
		}

		if (JFactory::getDocument()->getType() !== 'html')
		{
			return;
		}

		$jinput = JFactory::getApplication()->input;
		$option = $jinput->get('option');
		$view = $jinput->get('view');
		$task = $jinput->get('task');

		//Component filter
		if ($option !== 'com_content' && $option !== 'com_categories'  && $option !== 'com_menus' && $option !== 'com_jshopping' && $option !== 'com_virtuemart') {
			return;
		}

		//page params filter
		if ($view !== 'item' && $view !== 'article' && $view !== 'category' && $view !== 'product' &&  $task !== 'edit') {
			return;
		}

		$plg_params['params'] = $this->params;
		$plg_params['PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT'] = JText::_('PLG_WEDAL_META_COUNTER_CHARACTERS_LEFT');

		$document = JFactory::getDocument();
		$document->addScript('/plugins/'.$this->_type.'/'.$this->_name.'/assets/js/wedal_meta_counter.js');
		$js= 'var plg_system_wedal_meta_counter_params = '.json_encode($plg_params).';';
		$document->addScriptDeclaration($js);
	}
}
