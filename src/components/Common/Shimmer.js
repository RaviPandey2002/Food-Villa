import "./Common.css"

const Shimmer = ({ type = "default" }) => {

  if (type == "hero-section") {
    return (
      <div className="shimmer-container">
        <div className="shimmer-image"></div>
        <div className="shimmer-text">
          <div className="shimmer-line shimmer-line--title"></div>
          <div className="shimmer-line shimmer-line--description"></div>
        </div>
      </div>
    )
  }

  if (type === "card") {
    return (
      <div className="shimmer-card-section">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-image"></div>
            <div className="shimmer-text">
              <div className="shimmer-line shimmer-line--title"></div>
              <div className="shimmer-line shimmer-line--description"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  console.log("type", type)

  if (type === 'meal-details') {
    return (
      <div className="shimmer-meal-section">
        <div className="shimmer-meal-container">
          <div className="shimmer-header">
            <div className="shimmer-title"></div>
            <div className="shimmer-image"></div>
          </div>
        </div>

        <div className="shimmer-content-body">
          <div className="shimmer-ingredient-section shimmer-animate">
            <div className="shimmer-line shimmer-line--title"></div>
            <ul className="shimmer-ingredients">
              {Array.from({ length: 6 }).map((_, index) => (
                <li key={index} className="shimmer-line shimmer-animate"></li>
              ))}
            </ul>
          </div>

          <div className="shimmer-video-section">
            <div className="shimmer-image shimmer-meal-container"></div>
            <div className="shimmer-text">
              <div className="shimmer-line shimmer-line--title"></div>
              <div className="shimmer-line shimmer-line--description"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "food-categories") {
    return (
      <div className="container">
        <h5 className="section-title">Our Food Categories</h5>
        <div className="shimmer-category-section d-flex">
          {[0, 1].map(row => (
            <div key={row} className="shimmer-category-row ">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="shimmer-category-item">
                  <div className="shimmer-circle"></div>
                  <div className="shimmer-line shimmer-line--text"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shimmer-container">
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
    </div>
  )
}

export default Shimmer