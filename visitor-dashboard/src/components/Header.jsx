
const Header = () =>{
    return(
        <div className='main-header'> 
        <div>
        <h2 className="main-title">Good Morning, John</h2>
        <h4 className="main-sub-title">Here's your visitors summary</h4>
        </div>
        <div className="main-search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search Visitors..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
            Profile
        </div>

        </div>
    )
}

export default Header