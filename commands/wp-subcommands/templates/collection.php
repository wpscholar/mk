<?php

{{#namespace}}
namespace {{namespace}};
{{/namespace}}

use wpscholar\WordPress\PostCollectionBase;

/**
 * Class {{className}}
 {{#namespace}}
  *
  * @package {{namespace}}
 {{/namespace}}
 */
class {{className}} extends PostCollectionBase {

    const POST_TYPE = '{{postType}}';

    /**
	 * Decorate posts
	 *
	 * @param \WP_Post $post
	 *
	 * @return {{modelName}}
	 */
	protected function _decorate( \WP_Post $post ) {
		return {{modelName}}::create( $post );
	}

}
