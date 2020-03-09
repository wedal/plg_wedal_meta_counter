<?php if (!defined('_JEXEC')) die('Direct Access to ' . basename(__FILE__) . ' is not allowed.');

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

		if ($option !== 'com_content' && $option !== 'com_menus' && $option !== 'com_jshopping') {
			return;
		}

		if ($view !== 'item' && $view !== 'article' && $task !== 'edit') {
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
