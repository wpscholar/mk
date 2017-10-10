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

	const POST_TYPE = '{{postTypeName}}';

	/**
	 * Setup hooks
	 */
	public static function initialize() {
		add_action( 'init', [ __CLASS__, 'register_post_type' ] );
	}

	/**
	 * Register post type
	 */
	public static function register_post_type() {

		$args = [
			'labels'       => [
				'name'               => esc_html_x( '{{PluralName}}', 'post type general name', '{{textDomain}}' ),
				'singular_name'      => esc_html_x( '{{SingularName}}', 'post type singular name', '{{textDomain}}' ),
				'menu_name'          => esc_html_x( '{{PluralName}}', 'admin menu', '{{textDomain}}' ),
				'name_admin_bar'     => esc_html_x( '{{SingularName}}', 'add new on admin bar', '{{textDomain}}' ),
				'add_new_item'       => esc_html__( 'Add New {{SingularName}}', '{{textDomain}}' ),
				'new_item'           => esc_html__( 'New {{SingularName}}', '{{textDomain}}' ),
				'edit_item'          => esc_html__( 'Edit {{SingularName}}', '{{textDomain}}' ),
				'view_item'          => esc_html__( 'View {{SingularName}}', '{{textDomain}}' ),
				'all_items'          => esc_html__( 'All {{PluralName}}', '{{textDomain}}' ),
				'search_items'       => esc_html__( 'Search {{PluralName}}', '{{textDomain}}' ),
				'archives'           => esc_html__( '{{SingularName}} Archives', '{{textDomain}}' ),
				'not_found'          => esc_html__( 'No {{pluralName}} found.', '{{textDomain}}' ),
				'not_found_in_trash' => esc_html__( 'No {{pluralName}} found in trash.', '{{textDomain}}' ),
			],
			'public'       => true,
			'menu_icon'    => 'dashicons-admin-post',
			'supports'     => [
				'title',
				'excerpt',
				'editor',
				'thumbnail',
				'author',
				'revisions',
			],
			'show_in_rest' => true,
			'rest_base'    => '{{restBase}}',
		];

		$args = apply_filters( 'post_type_args-' . self::POST_TYPE, $args );

		register_post_type( self::POST_TYPE, $args );
	}

}

{{className}}::initialize();
