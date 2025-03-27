import "./Common.css"

const Shimmer = ({ type = "default" }) => {

  if (type == "hero-section") {
    return (
      <div className="shimmer-container">
        <div className="shimmer-image"></div>
        <div className="shimmer-text">
          <div className="shimmer-line shimmer-line--title"></div>
          <div className="shimmer-line shimmer-line--description"></div>
          <div className="shimmer-line shimmer-line--button"></div>
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

  if(type == "random-categories"){
    
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