import React from "react";

import "./post-status-filter.css"

const PostStatusFilter =()=>{
    return (
<div className="btn-group">
        <button type="button" className="btn btm-info">All</button>
        <button type="button" className="btn btn-outline-secondary">Favorites</button>
</div>

    )
}
export default PostStatusFilter;
