<?php 

 /**
  *@file
  *Administration page callbacks for couplingviz module.
  */
  
  /**
  *Form builder. Configure annotations.
  *
  *@ingroup forms.
  *@see system_settings_forms().
  */
  
  function couplingviz_admin_settings(){
	
	$form['rest_viz_server_name'] = array(
		'#type' => 'textfield',
		'#title'=> t('Enter CouplingVizRest Server Address'),
		'#default_value' => variable_get('couplingviz_servername', array('http://localhost:8080')),
	);
	
	$form['#submit'][] = 'couplingviz_admin_settings_submit';
	return system_settings_form($form);
  }
  
  /**
  *Process couplingviz settings form submission
  */
  function couplingviz_admin_settings_submit($form, $form_state){
	  
	if(isset($form_state['values']['couplingviz_servername'])){
		watchdog("CouplingViz", 'The CouplingVizRest server name is : %key', array('%key' => $key));
	}else{
		watchdog("CouplingViz", 'No CouplingVizRest server name');
	} 

  }
  
  