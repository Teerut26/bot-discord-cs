export interface ViuAPIResponse {
    grid_id: string
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
    show_all_background_color2: string
    tag_genre: string
    product: Product[]
    data: Data
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
  
  export interface Data {
    series: Series[]
    category_series_total: CategorySeriesTotal[]
  }
  
  export interface Series {
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
    is_follow: number
    product_id: string
    name: string
    category_name: string
    description: string
  }
  
  export interface CategorySeriesTotal {
    series_total: number
    is_movie: number
  }
  