<?php

{{#namespace}}
namespace {{namespace}};
{{/namespace}}

/**
 * Class {{PluralName}}
{{#namespace}}
 *
 * @package {{namespace}}
{{/namespace}}
 */
class {{PluralName}} {

	const POST_TYPE = '{{postTypePrefix}}{{_singular_name_}}';

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
				'name'               => esc_html_x( '{{Plural_Name}}', 'post type general name', '{{textDomain}}' ),
				'singular_name'      => esc_html_x( '{{Singular_Name}}', 'post type singular name', '{{textDomain}}' ),
				'menu_name'          => esc_html_x( '{{Plural_Name}}', 'admin menu', '{{textDomain}}' ),
				'name_admin_bar'     => esc_html_x( '{{Singular_Name}}', 'add new on admin bar', '{{textDomain}}' ),
				'add_new_item'       => esc_html__( 'Add New {{Singular_Name}}', '{{textDomain}}' ),
				'new_item'           => esc_html__( 'New {{Singular_Name}}', '{{textDomain}}' ),
				'edit_item'          => esc_html__( 'Edit {{Singular_Name}}', '{{textDomain}}' ),
				'view_item'          => esc_html__( 'View {{Singular_Name}}', '{{textDomain}}' ),
				'all_items'          => esc_html__( 'All {{Plural_Name}}', '{{textDomain}}' ),
				'search_items'       => esc_html__( 'Search {{Plural_Name}}', '{{textDomain}}' ),
				'archives'           => esc_html__( '{{Singular_Name}} Archives', '{{textDomain}}' ),
				'not_found'          => esc_html__( 'No {{plural_name}} found.', '{{textDomain}}' ),
				'not_found_in_trash' => esc_html__( 'No {{plural_name}} found in trash.', '{{textDomain}}' ),
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
            'rest_base'    => '{{_plural_name_}}',
		];

		$args = apply_filters( 'post_type_args-' . self::POST_TYPE, $args );

		register_post_type( self::POST_TYPE, $args );
	}

}

{{PluralName}}::initialize();
