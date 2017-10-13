<?php

{{#namespace}}
namespace {{namespace}};
{{/namespace}}

/**
 * Class {{className}}
 {{#namespace}}
  *
  * @package {{namespace}}
 {{/namespace}}
 */
class {{className}} {

	const TAXONOMY = '{{taxonomyName}}';

	/**
	 * Setup hooks
	 */
	public static function initialize() {
		add_action( 'init', [ __CLASS__, 'register_taxonomy' ] );
	}

	/**
	 * Register taxonomy
	 */
	public static function register_taxonomy() {

		// Add new taxonomy, make it hierarchical (like categories)
		$labels = array(
			'name'              => esc_html_x( '{{PluralName}}', 'taxonomy general name', '{{textDomain}}' ),
			'singular_name'     => esc_html_x( '{{SingularName}}', 'taxonomy singular name', '{{textDomain}}' ),
			'search_items'      => esc_html__( 'Search {{PluralName}}', '{{textDomain}}' ),
			'all_items'         => esc_html__( 'All {{PluralName}}', '{{textDomain}}' ),
			'parent_item'       => esc_html__( 'Parent {{SingularName}}', '{{textDomain}}' ),
			'parent_item_colon' => esc_html__( 'Parent {{SingularName}}:', '{{textDomain}}' ),
			'edit_item'         => esc_html__( 'Edit {{SingularName}}', '{{textDomain}}' ),
			'update_item'       => esc_html__( 'Update {{SingularName}}', '{{textDomain}}' ),
			'add_new_item'      => esc_html__( 'Add New {{SingularName}}', '{{textDomain}}' ),
			'new_item_name'     => esc_html__( 'New {{SingularName}} Name', '{{textDomain}}' ),
            'menu_name'         => esc_html__( '{{PluralName}}', '{{textDomain}}' ),
		);

		$args = array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'show_in_rest'      => true,
			'rest_base'         => '{{restBase}}',
		);

		$args = apply_filters( 'taxonomy_args-' . self::TAXONOMY, $args );

		register_taxonomy( self::TAXONOMY, [], $args );
	}

}

{{className}}::initialize();
