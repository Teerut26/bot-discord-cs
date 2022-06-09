export interface ViuAPIResponse {
    status: Status
    server: Server
    data: Data
  }
  
  export interface Status {
    code: number
    message: string
  }
  
  export interface Server {
    time: number
    area: Area
  }
  
  export interface Area {
    area_id: number
    language: Language[]
    vuclip: boolean
  }
  
  export interface Language {
    language_flag_id: string
    label: string
    mark: string
    is_default: string
  }
  
  export interface Data {
    banner: Banner[]
    grid: Grid[]
    grid_plugins: GridPlugin[]
  }
  
  export interface Banner {
    sequence_number: string
    banner_id: string
    product_id: string
    release_time: string
    image_url: string
    image_navigation_url: any
    image_click_url: any
    title: string
    title_background_color: string
    background_color: string
    is_ad: string
    series_id: string
    series_name: string
    series_update_cycle: string[]
    series_category_name: string
    series_category_id: string
    product_synopsis: string
    product_number: string
    allow_download: string
    product_schedule_start_time: string
    product_schedule_end_time: string
    product_free_time: number
    premium_time: number
    is_free_premium_time: number
    is_parental_lock_limited: number
    product_cover_image_url: string
    product_image_url: string
    series_image_url: string
    is_movie: string
    user_level: number
    series_update_cycle_description: string
    offline_time: string
    free_time: number
    poster_logo_url: string
    source_flag: string
    allow_tv: string
    released_product_total: number
  }
  
  export interface Grid {
    grid_id: string
    sequence_number: string
    type: string
    style: string
    data_type: string
    name: string
    description: string
    background_color: string
    cover_image_url: any
    home_logo_switch: string
    home_logo_image_uri: any
    home_logo_category: string
    home_logo_category_name: string
    show_all_image_uri: any
    show_all_image2_uri: any
    show_all_background_color: string
    show_all_background_color2?: string
    tag_genre?: string
    product: Product[]
  }
  
  export interface Product {
    title: string
    sequence_number: string
    title_background_color: string
    use_series_title: string
    id: string
    series_id: string
    synopsis: string
    number: string
    allow_download: string
    product_free_time: number
    premium_time: number
    is_free_premium_time: number
    series_name: string
    series_category_name: string
    series_category_id: string
    cover_image_url: string
    focus_id: any
    focus_name: any
    focus_start_section: any
    focus_time_duration: any
    series_image_url: string
    is_movie: number
    product_image_url: string
    is_parental_lock_limited: number
    user_level: number
    offline_time: string
    free_time: number
    poster_logo_url: string
    source_flag: string
    allow_tv: string
    released_product_total: number
  }
  
  export interface GridPlugin {
    grid_id: string
    sequence_number: string
    type: string
    style: string
    data_type: string
    name: string
    description: string
    background_color: string
    cover_image_url: any
    home_logo_switch: string
    home_logo_image_uri: any
    home_logo_category: string
    home_logo_category_name: string
    show_all_image_uri: any
    show_all_image2_uri: any
    show_all_background_color: string
    show_all_background_color2: any
    tag_genre: any
    product: any[]
  }
  