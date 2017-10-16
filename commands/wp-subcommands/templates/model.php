<?php

{{#namespace}}
namespace {{namespace}};
{{/namespace}}

use wpscholar\WordPress\PostModelBase;

/**
 * Class Event
 {{#namespace}}
  *
  * @package {{namespace}}
 {{/namespace}}
 */
class {{className}} extends PostModelBase {

    const POST_TYPE = '{{postType}}';

	/**
	 * Get the post ID
	 *
	 * @return int
	 */
	function id() {
		return $this->post->ID;
	}

}
