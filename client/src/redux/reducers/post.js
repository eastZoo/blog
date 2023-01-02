const initialState = {
    isAuthenticated: null,
    posts: [],
    postDetail: "",
    postCount: "",
    loading: false,
    error: "",
    creatorId: "",
    categoryFindResult: "",
    title: "",
    searchBy: "",
    searchResult: "",
};

// POST WRITE
export const POSTS_WRITE_REQUEST = "POST_WRITE_REQUEST";
export const POSTS_WRITE_FAILURE = "POST_WRITE_FAILURE";
export const POSTS_WRITE_SUCCESS = "POST_WRITE_SUCCESS";

// POST WRITE
export const POSTS_LOADING_REQUEST = "POST_LOADING_REQUEST";
export const POSTS_LOADING_FAILURE = "POST_LOADING_FAILURE";
export const POSTS_LOADING_SUCCESS = "POST_LOADING_SUCCESS";

// POST UPLOAD
export const POST_UPLOADING_REQUEST = "POST_UPLOADING_REQUEST";
export const POST_UPLOADING_FAILURE = "POST_UPLOADING_FAILURE";
export const POST_UPLOADING_SUCCESS = "POST_UPLOADING_SUCCESS";

// POST Detail loading
export const POST_DETAIL_LOADING_REQUEST = "POST_DETAIL_LOADING_REQUEST";
export const POST_DETAIL_LOADING_FAILURE = "POST_DETAIL_LOADING_FAILURE";
export const POST_DETAIL_LOADING_SUCCESS = "POST_DETAIL_LOADING_SUCCESS";
// POST DELETE
export const POST_DELETE_REQUEST = "POST_DELETE_REQUEST";
export const POST_DELETE_FAILURE = "POST_DELETE_FAILURE";
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";

// Comment loading
export const COMMENT_LOADING_REQUEST = "COMMENT_LOADING_REQUEST";
export const COMMENT_LOADING_FAILURE = "COMMENT_LOADING_FAILURE";
export const COMMENT_LOADING_SUCCESS = "COMMENT_LOADING_SUCCESS";

// Comment uploading
export const COMMENT_UPLOADING_REQUEST = "COMMENT_UPLOADING_REQUEST";
export const COMMENT_UPLOADING_FAILURE = "COMMENT_UPLOADING_FAILURE";
export const COMMENT_UPLOADING_SUCCESS = "COMMENT_UPLOADING_SUCCESS";

// Post Loading Edit
export const POST_EDIT_LOADING_REQUEST = "POST_EDIT_LOADING_REQUEST";
export const POST_EDIT_LOADING_FAILURE = "POST_EDIT_LOADING_FAILURE";
export const POST_EDIT_LOADING_SUCCESS = "POST_EDIT_LOADING_SUCCESS";

// Post Uploading Edit
export const POST_EDIT_UPLOADING_REQUEST = "POST_EDIT_UPLOADING_REQUEST";
export const POST_EDIT_UPLOADING_FAILURE = "POST_EDIT_UPLOADING_FAILURE";
export const POST_EDIT_UPLOADING_SUCCESS = "POST_EDIT_UPLOADING_SUCCESS";

// Post Uploading Edit
export const CATEGORY_FIND_REQUEST = "CATEGORY_FIND_REQUEST";
export const CATEGORY_FIND_FAILURE = "CATEGORY_FIND_FAILURE";
export const CATEGORY_FIND_SUCCESS = "CATEGORY_FIND_SUCCESS";

// Post Uploading Edit
export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_FAILURE = "SEARCH_FAILURE";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case POSTS_LOADING_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                categoryFindResult: action.payload.categoryFindResult,
                postCount: action.payload.postCount,
                loading: false,
            };
        case POSTS_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case POSTS_WRITE_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case POSTS_WRITE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case POSTS_WRITE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case POST_DETAIL_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case POST_DETAIL_LOADING_SUCCESS:
            return {
                ...state,
                postDetail: action.payload,
                creatorId: action.payload.creator._id,
                title: action.payload.title,
                loading: false,
            };
        case POST_DETAIL_LOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case POST_EDIT_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case POST_EDIT_LOADING_SUCCESS:
            return {
                ...state,
                postDetail: action.payload,

                loading: false,
            };
        case POST_EDIT_LOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case POST_EDIT_UPLOADING_REQUEST:
            return {
                ...state,

                loading: true,
            };
        case POST_EDIT_UPLOADING_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case POST_EDIT_UPLOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CATEGORY_FIND_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case CATEGORY_FIND_SUCCESS:
            return {
                ...state,
                categoryFindResult: action.payload,
                loading: false,
            };
        case CATEGORY_FIND_FAILURE:
            return {
                ...state,
                categoryFindResult: action.payload,
                loading: false,
            };
        case SEARCH_REQUEST:
            return {
                ...state,
                posts: [],
                searchBy: action.payload,
                loading: true,
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchBy: action.payload,
                searchResult: action.payload,
                loading: false,
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                searchResult: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default postReducer;

