import React from 'react'

export default function SearchFilter() {
  return (
    <div className="serch-filter-wrapper">
      <div className="searh-filter-multi">
        <div className="seach-filter">
          <div className="name">フィギュア名</div>
          <div className="search-wrap">
            <input type="text" />
          </div>
        </div>
        <div className="seach-filter">
          <div className="name">ブランド名</div>
          <div className="search-wrap">
            <input type="text" />
          </div>
        </div>
        <div className="seach-filter">
          <div className="name">フィギュア名</div>
          <div className="search-wrap">
            <input type="text" />
          </div>
        </div>
        <div className="seach-filter">
          <div className="name">フィギュア名</div>
          <div className="search-wrap">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  )
}
