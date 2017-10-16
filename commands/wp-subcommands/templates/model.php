<?php

{{#namespace}}
namespace {{namespace}};
{{/namespace}}

use wpscholar\WordPress\PostModelBase;

/**
 * Class {{className}}
 {{#namespace}}
  *
  * @package {{namespace}}
 {{/namespace}}
 */
class {{className}} extends PostModelBase {

    const POST_TYPE = '{{postType}}';

	/**
	 * Get the ID
	 *
	 * @return int
	 */
	function id() {
		return $this->post->ID;
	}

}
